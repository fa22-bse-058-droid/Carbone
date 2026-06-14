from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from cars.models import Car
from cars.serializers import CarListSerializer
from .serializers import AIFinderRequestSerializer
from groq import Groq
import json

class AIFinderView(APIView):
    def post(self, request):
        serializer = AIFinderRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        budget = serializer.validated_data['budget']
        use_case = serializer.validated_data['use_case']
        vibe = serializer.validated_data['vibe']

        price_map = {
            '50l-1cr':   (5000000, 10000000),
            '1cr-2cr':   (10000000, 20000000),
            'above-2cr': (20000000, 999999999),
}
        min_price, max_price = price_map.get(budget, (0, 999999999))

        cars = Car.objects.filter(
            in_stock=True,
            price__gte=min_price,
            price__lte=max_price
        ).values('id', 'name', 'brand', 'year', 'price', 'category', 'fuel_type', 'transmission', 'specs')

        if not cars.exists():
            return Response(
                {'error': 'No cars available in this budget range.'},
                status=status.HTTP_404_NOT_FOUND
            )

        car_list = list(cars[:15])

        prompt = f"""You are a luxury automobile advisor for Carbone, Pakistan's premier luxury car showroom.
A client answered 3 questions:
- Budget: {budget}
- Primary use: {use_case}
- Vibe/style: {vibe}

Available inventory:
{json.dumps(car_list, indent=2, default=str)}

Recommend TOP 3 best matching cars from this exact inventory.
Respond ONLY with a JSON array, no markdown, no extra text:
[
  {{
    "car_id": <id>,
    "car_name": "<name>",
    "reason": "<2 sentence luxury-tone explanation>",
    "match_score": <85-99>
  }}
]"""

        try:
            client = Groq(api_key=settings.GROQ_API_KEY)
            response = client.chat.completions.create(
                model='llama-3.3-70b-versatile',
                messages=[{'role': 'user', 'content': prompt}],
                max_tokens=1000,
                temperature=0.7,
            )
            raw = response.choices[0].message.content.strip()

            # Strip markdown fences if present
            if raw.startswith('```'):
                raw = raw.split('```')[1]
                if raw.startswith('json'):
                    raw = raw[4:]
            raw = raw.strip()

            recommendations = json.loads(raw)

            result = []
            for rec in recommendations:
                try:
                    car = Car.objects.get(id=rec['car_id'])
                    car_data = CarListSerializer(car, context={'request': request}).data
                    result.append({
                        **car_data,
                        'reason': rec['reason'],
                        'match_score': rec['match_score'],
                    })
                except Car.DoesNotExist:
                    continue

            return Response({'recommendations': result})

        except json.JSONDecodeError:
            return Response(
                {'error': 'AI response parsing failed.'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )