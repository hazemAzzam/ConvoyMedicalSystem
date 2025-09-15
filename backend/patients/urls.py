from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PatientViewSet, AdultViewSet

router = DefaultRouter()
router.register(r'patients', PatientViewSet, basename='patients')
router.register(r'adults', AdultViewSet, basename='adults')

urlpatterns = [
    path('', include(router.urls)),
]
