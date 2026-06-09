from rest_framework import serializers
from .models import Car, CarImage

class CarImageSerializer(serializers.ModelSerializer):
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = CarImage
        fields = ['id', 'image_url', 'is_primary', 'order']

    def get_image_url(self, obj):
        request = self.context.get('request')
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None


class CarListSerializer(serializers.ModelSerializer):
    images = CarImageSerializer(many=True, read_only=True)
    primary_image = serializers.SerializerMethodField()

    class Meta:
        model = Car
        fields = [
            'id', 'name', 'brand', 'model', 'year',
            'price', 'price_formatted', 'category',
            'condition', 'fuel_type', 'transmission',
            'in_stock', 'is_featured', 'primary_image', 'images',
        ]

    def get_primary_image(self, obj):
        request = self.context.get('request')
        primary = obj.images.filter(is_primary=True).first()
        if not primary:
            primary = obj.images.first()
        if primary and request:
            return request.build_absolute_uri(primary.image.url)
        return None


class CarDetailSerializer(serializers.ModelSerializer):
    images = CarImageSerializer(many=True, read_only=True)

    class Meta:
        model = Car
        fields = '__all__'