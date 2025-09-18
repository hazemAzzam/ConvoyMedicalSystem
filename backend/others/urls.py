from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FamilyHistoryViewSet,
    MedicalViewSet,
    CyanosisViewSet,
    DrugViewSet,
    ClinicViewSet,
    SymptomViewSet
)

# Create router and register viewsets
router = DefaultRouter()
router.register(r'family-history', FamilyHistoryViewSet, basename='family-history')
router.register(r'medical', MedicalViewSet, basename='medical')
router.register(r'cyanosis', CyanosisViewSet, basename='cyanosis')
router.register(r'drugs', DrugViewSet, basename='drugs')
router.register(r'clinics', ClinicViewSet, basename='clinics')
router.register(r'symptoms', SymptomViewSet, basename='symptoms')

urlpatterns = [
    path('', include(router.urls)),
]
