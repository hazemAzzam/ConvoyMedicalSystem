from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import (
    FamilyHistoryModel, 
    MedicalModel, 
    CyanosisModel, 
    DrugModel, 
    ClinicModel, 
    SymptomModel
)
from .serializers import (
    FamilyHistorySerializer, FamilyHistoryAutocompleteSerializer,
    MedicalSerializer, MedicalAutocompleteSerializer,
    CyanosisSerializer, CyanosisAutocompleteSerializer,
    DrugSerializer, DrugAutocompleteSerializer,
    ClinicSerializer, ClinicAutocompleteSerializer,
    SymptomSerializer, SymptomAutocompleteSerializer
)


class FamilyHistoryViewSet(viewsets.ModelViewSet):
    """
    ViewSet for FamilyHistoryModel with autocomplete functionality
    """
    queryset = FamilyHistoryModel.objects.all()
    serializer_class = FamilyHistorySerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name', 'created_on', 'updated_on']
    ordering = ['-created_on']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'autocomplete':
            return FamilyHistoryAutocompleteSerializer
        return FamilyHistorySerializer
    
    @action(detail=False, methods=['get'])
    def autocomplete(self, request):
        """
        Autocomplete endpoint for family history search
        Usage: /api/family-history/autocomplete/?search=diabetes
        """
        search_query = request.query_params.get('search', '')
        limit = int(request.query_params.get('limit', 10))
        
        if not search_query:
            return Response([])
        
        family_history = FamilyHistoryModel.objects.filter(
            name__icontains=search_query
        )[:limit]
        
        serializer = self.get_serializer(family_history, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['delete'])
    def bulk_delete(self, request):
        """
        Bulk delete family history records
        Usage: /api/family-history/bulk_delete/
        Body: {
            "family_history_ids": ["1", "2", "3"]
        }
        """
        family_history_ids = request.data.get('family_history_ids', [])
        FamilyHistoryModel.objects.filter(id__in=family_history_ids).delete()
        return Response(status=status.HTTP_204_NO_CONTENT, data={'message': 'Family history records deleted successfully'})


class MedicalViewSet(viewsets.ModelViewSet):
    """
    ViewSet for MedicalModel with autocomplete functionality
    """
    queryset = MedicalModel.objects.all()
    serializer_class = MedicalSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name', 'created_on', 'updated_on']
    ordering = ['-created_on']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'autocomplete':
            return MedicalAutocompleteSerializer
        return MedicalSerializer
    
    @action(detail=False, methods=['get'])
    def autocomplete(self, request):
        """
        Autocomplete endpoint for medical search
        Usage: /api/medical/autocomplete/?search=hypertension
        """
        search_query = request.query_params.get('search', '')
        limit = int(request.query_params.get('limit', 10))
        
        if not search_query:
            return Response([])
        
        medical = MedicalModel.objects.filter(
            name__icontains=search_query
        )[:limit]
        
        serializer = self.get_serializer(medical, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['delete'])
    def bulk_delete(self, request):
        """
        Bulk delete medical records
        Usage: /api/medical/bulk_delete/
        Body: {
            "medical_ids": ["1", "2", "3"]
        }
        """
        medical_ids = request.data.get('medical_ids', [])
        MedicalModel.objects.filter(id__in=medical_ids).delete()
        return Response(status=status.HTTP_204_NO_CONTENT, data={'message': 'Medical records deleted successfully'})


class CyanosisViewSet(viewsets.ModelViewSet):
    """
    ViewSet for CyanosisModel with autocomplete functionality
    """
    queryset = CyanosisModel.objects.all()
    serializer_class = CyanosisSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name', 'created_on', 'updated_on']
    ordering = ['-created_on']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'autocomplete':
            return CyanosisAutocompleteSerializer
        return CyanosisSerializer
    
    @action(detail=False, methods=['get'])
    def autocomplete(self, request):
        """
        Autocomplete endpoint for cyanosis search
        Usage: /api/cyanosis/autocomplete/?search=mild
        """
        search_query = request.query_params.get('search', '')
        limit = int(request.query_params.get('limit', 10))
        
        if not search_query:
            return Response([])
        
        cyanosis = CyanosisModel.objects.filter(
            name__icontains=search_query
        )[:limit]
        
        serializer = self.get_serializer(cyanosis, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['delete'])
    def bulk_delete(self, request):
        """
        Bulk delete cyanosis records
        Usage: /api/cyanosis/bulk_delete/
        Body: {
            "cyanosis_ids": ["1", "2", "3"]
        }
        """
        cyanosis_ids = request.data.get('cyanosis_ids', [])
        CyanosisModel.objects.filter(id__in=cyanosis_ids).delete()
        return Response(status=status.HTTP_204_NO_CONTENT, data={'message': 'Cyanosis records deleted successfully'})


class DrugViewSet(viewsets.ModelViewSet):
    """
    ViewSet for DrugModel with autocomplete functionality
    """
    queryset = DrugModel.objects.all()
    serializer_class = DrugSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name']
    ordering_fields = ['name', 'created_on', 'updated_on']
    ordering = ['-created_on']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'autocomplete':
            return DrugAutocompleteSerializer
        return DrugSerializer
    
    @action(detail=False, methods=['get'])
    def autocomplete(self, request):
        """
        Autocomplete endpoint for drug search
        Usage: /api/drugs/autocomplete/?search=aspirin
        """
        search_query = request.query_params.get('search', '')
        limit = int(request.query_params.get('limit', 10))
        
        if not search_query:
            return Response([])
        
        drugs = DrugModel.objects.filter(
            name__icontains=search_query
        )[:limit]
        
        serializer = self.get_serializer(drugs, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['delete'])
    def bulk_delete(self, request):
        """
        Bulk delete drug records
        Usage: /api/drugs/bulk_delete/
        Body: {
            "drug_ids": ["1", "2", "3"]
        }
        """
        drug_ids = request.data.get('drug_ids', [])
        DrugModel.objects.filter(id__in=drug_ids).delete()
        return Response(status=status.HTTP_204_NO_CONTENT, data={'message': 'Drug records deleted successfully'})


class ClinicViewSet(viewsets.ModelViewSet):
    """
    ViewSet for ClinicModel with autocomplete functionality
    """
    queryset = ClinicModel.objects.all()
    serializer_class = ClinicSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name', 'description']
    ordering_fields = ['name']
    ordering = ['name']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'autocomplete':
            return ClinicAutocompleteSerializer
        return ClinicSerializer
    
    @action(detail=False, methods=['get'])
    def autocomplete(self, request):
        """
        Autocomplete endpoint for clinic search
        Usage: /api/clinics/autocomplete/?search=cardiology
        """
        search_query = request.query_params.get('search', '')
        limit = int(request.query_params.get('limit', 10))
        
        if not search_query:
            return Response([])
        
        clinics = ClinicModel.objects.filter(
            name__icontains=search_query
        )[:limit]
        
        serializer = self.get_serializer(clinics, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['delete'])
    def bulk_delete(self, request):
        """
        Bulk delete clinic records
        Usage: /api/clinics/bulk_delete/
        Body: {
            "clinic_ids": ["1", "2", "3"]
        }
        """
        clinic_ids = request.data.get('clinic_ids', [])
        ClinicModel.objects.filter(id__in=clinic_ids).delete()
        return Response(status=status.HTTP_204_NO_CONTENT, data={'message': 'Clinic records deleted successfully'})


class SymptomViewSet(viewsets.ModelViewSet):
    """
    ViewSet for SymptomModel with autocomplete functionality
    """
    queryset = SymptomModel.objects.select_related('clinic').all()
    serializer_class = SymptomSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name', 'description', 'clinic__name']
    ordering_fields = ['name', 'clinic__name', 'created_on', 'updated_on']
    ordering = ['-created_on']
    filterset_fields = ['clinic']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'autocomplete':
            return SymptomAutocompleteSerializer
        return SymptomSerializer
    
    @action(detail=False, methods=['get'])
    def autocomplete(self, request):
        """
        Autocomplete endpoint for symptom search
        Usage: /api/symptoms/autocomplete/?search=fever
        """
        search_query = request.query_params.get('search', '')
        limit = int(request.query_params.get('limit', 10))
        clinic_id = request.query_params.get('clinic_id', '')
                
        if search_query:
            symptoms = SymptomModel.objects.select_related('clinic').filter(
                name__icontains=search_query
            )
        else:
            symptoms = SymptomModel.objects.select_related('clinic').all()
        
        if clinic_id:
            symptoms = symptoms.filter(clinic_id=clinic_id)
        
        symptoms = symptoms[:limit]
        
        serializer = self.get_serializer(symptoms, many=True)

        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_clinic(self, request):
        """
        Get symptoms by clinic
        Usage: /api/symptoms/by_clinic/?clinic_id=1
        """
        clinic_id = request.query_params.get('clinic_id', '')
        
        if not clinic_id:
            return Response({'error': 'clinic_id parameter is required'}, status=status.HTTP_400_BAD_REQUEST)
        
        symptoms = SymptomModel.objects.select_related('clinic').filter(clinic_id=clinic_id)
        serializer = self.get_serializer(symptoms, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['delete'])
    def bulk_delete(self, request):
        """
        Bulk delete symptom records
        Usage: /api/symptoms/bulk_delete/
        Body: {
            "symptom_ids": ["1", "2", "3"]
        }
        """
        symptom_ids = request.data.get('symptom_ids', [])
        SymptomModel.objects.filter(id__in=symptom_ids).delete()
        return Response(status=status.HTTP_204_NO_CONTENT, data={'message': 'Symptom records deleted successfully'})