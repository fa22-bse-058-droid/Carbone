from django.contrib import admin
from .models import Car, CarImage

@admin.register(Car)
class CarAdmin(admin.ModelAdmin):
    list_display = ['name', 'brand', 'year', 'price', 'category', 'in_stock', 'is_featured']
    list_filter = ['category', 'fuel_type', 'in_stock', 'is_featured']
    search_fields = ['name', 'brand']

@admin.register(CarImage)
class CarImageAdmin(admin.ModelAdmin):
    list_display = ['car', 'is_primary']