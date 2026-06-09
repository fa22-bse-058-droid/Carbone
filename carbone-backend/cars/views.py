from rest_framework import viewsets, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from .models import Car
from .serializers import CarListSerializer, CarDetailSerializer

class CarViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Car.objects.prefetch_related('images').all()
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['category', 'fuel_type', 'transmission', 'condition', 'in_stock', 'is_featured']
    ordering_fields = ['price', 'year', 'created_at']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return CarDetailSerializer
        return CarListSerializer

    def get_serializer_context(self):
        return {'request': self.request}

    @action(detail=False, methods=['get'])
    def featured(self, request):
        featured = Car.objects.filter(is_featured=True, in_stock=True)[:6]
        serializer = CarListSerializer(featured, many=True, context={'request': request})
        return Response(serializer.data)