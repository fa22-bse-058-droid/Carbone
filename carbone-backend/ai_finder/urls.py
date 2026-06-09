from django.urls import path
from .views import AIFinderView

urlpatterns = [
    path('ai-finder/', AIFinderView.as_view(), name='ai-finder'),
]