from django.urls import path
from .views import InquiryCreateView, TestDriveBookingCreateView, AvailableTimeSlotsView

urlpatterns = [
    path('inquiries/', InquiryCreateView.as_view(), name='inquiry-create'),
    path('bookings/', TestDriveBookingCreateView.as_view(), name='booking-create'),
    path('bookings/slots/<int:car_id>/<str:date>/', AvailableTimeSlotsView.as_view(), name='available-slots'),
]