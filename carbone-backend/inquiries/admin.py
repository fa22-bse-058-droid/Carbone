from django.contrib import admin
from .models import Inquiry, TestDriveBooking

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'email', 'car', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'email', 'phone']

@admin.register(TestDriveBooking)
class TestDriveBookingAdmin(admin.ModelAdmin):
    list_display = ['name', 'phone', 'car', 'date', 'time_slot', 'created_at']
    list_filter = ['date']
    search_fields = ['name', 'email', 'phone']