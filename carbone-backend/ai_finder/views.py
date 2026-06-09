from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.conf import settings
from cars.models import Car
from cars.serializers import CarListSerializer
from .serializers import AIFinderRequestSerializer
import anthropic
import json

class AIFinderView(APIView):
    def post(self, request):
        serializer = AIFinderRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        budget = serializer.validated_data['budget']
        use_case = serializer.validated_data['use_case']
        vibe = serializer.validated_data['vibe']

        # Get available inventory
        cars = Car.objects.filter(in_stock=True).values(
            'id', 'name', 'brand', 'year', 'price',
            'price_formatted', 'category', 'fuel_type',
            'transmission', 'specs'
        )

        # Map budget to price range
        price_map = {
            'under-50l':  (0, 5000000),
            '50l-1cr':    (5000000, 10000000),
            'above-1cr':  (10000000, 999999999),
        }
        min_price, max_price = price_map[budget]
        cars = cars.filter(price__gte=min_price, price__lte=max_price)

        if not cars.exists():
            return Response(
                {'error': 'No cars available in this budget range.'},
                status=status.HTTP_404_NOT_FOUND
            )

        car_list = list(cars[:15])  # Send max 15 to Claude

        prompt = f"""You are a luxury automobile advisor for Carbone, Pakistan's premier luxury car showroom.

A client has answered 3 questions:
- Budget: {budget}
- Primary use: {use_case}
- Vibe/style preference: {vibe}

Available inventory (in budget):
{json.dumps(car_list, indent=2, default=str)}

Recommend the TOP 3 best matching cars from this exact inventory.
Respond ONLY with a JSON array, no other text:
[
  {{
    "car_id": <id from inventory>,
    "car_name": "<name>",
    "reason": "<2 sentence luxury-tone explanation why this car matches>",
    "match_score": <85-99>
  }}
]"""

        try:
            client = anthropic.Anthropic(api_key=settings.ANTHROPIC_API_KEY)
            message = client.messages.create(
                model='claude-sonnet-4-20250514',
                max_tokens=1000,
                messages=[{'role': 'user', 'content': prompt}]
            )

            raw = message.content[0].text.strip()
            # Strip markdown fences if present
            if raw.startswith('```'):
                raw = raw.split('```')[1]
                if raw.startswith('json'):
                    raw = raw[4:]
            recommendations = json.loads(raw)

            # Enrich with full car data
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