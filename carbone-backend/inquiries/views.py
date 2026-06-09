from rest_framework import generics, status
from rest_framework.response import Response
from .models import Inquiry, TestDriveBooking
from .serializers import InquirySerializer, TestDriveBookingSerializer

class InquiryCreateView(generics.CreateAPIView):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'message': 'Inquiry submitted successfully.', 'id': serializer.data['id']},
            status=status.HTTP_201_CREATED
        )


class TestDriveBookingCreateView(generics.CreateAPIView):
    queryset = TestDriveBooking.objects.all()
    serializer_class = TestDriveBookingSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(
            {'message': 'Test drive booked successfully.', 'id': serializer.data['id']},
            status=status.HTTP_201_CREATED
        )


class AvailableTimeSlotsView(generics.GenericAPIView):
    def get(self, request, car_id, date):
        ALL_SLOTS = [
            '10:00', '11:00', '12:00',
            '14:00', '15:00', '16:00', '17:00'
        ]
        booked = TestDriveBooking.objects.filter(
            car_id=car_id,
            date=date,
            status__in=['pending', 'confirmed']
        ).values_list('time_slot', flat=True)

        booked_str = [t.strftime('%H:%M') for t in booked]
        available = [s for s in ALL_SLOTS if s not in booked_str]

        return Response({'date': date, 'available_slots': available})