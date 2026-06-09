from rest_framework import serializers
from .models import Inquiry, TestDriveBooking
from datetime import date

class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = ['id', 'car', 'name', 'phone', 'email', 'message', 'created_at']
        read_only_fields = ['created_at']


class TestDriveBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestDriveBooking
        fields = [
            'id', 'car', 'name', 'phone', 'email',
            'date', 'time_slot', 'status', 'notes', 'created_at'
        ]
        read_only_fields = ['created_at', 'status']

    def validate_date(self, value):
        if value < date.today():
            raise serializers.ValidationError('Booking date cannot be in the past.')
        return value

    def validate(self, data):
        # Check for duplicate slot
        existing = TestDriveBooking.objects.filter(
            car=data['car'],
            date=data['date'],
            time_slot=data['time_slot'],
            status__in=['pending', 'confirmed']
        ).exists()
        if existing:
            raise serializers.ValidationError(
                'This time slot is already booked for this car.'
            )
        return data