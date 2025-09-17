from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Patient, Adult
from .serializers import PatientSerializer, PatientAutocompleteSerializer, AdultSerializer, AdultAutocompleteSerializer
from .pagination import CustomPageNumberPagination


class PatientViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Patient model with autocomplete functionality
    """
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name', 'mobile_number']
    ordering_fields = ['name', 'created_at', 'updated_at']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'autocomplete':
            return PatientAutocompleteSerializer
        return PatientSerializer
    
    @action(detail=False, methods=['get'])
    def autocomplete(self, request):
        """
        Autocomplete endpoint for patient search
        Usage: /api/patients/autocomplete/?search=john
        """
        search_query = request.query_params.get('search', '')
        limit = int(request.query_params.get('limit', 10))
        
        if not search_query:
            return Response([])
        
        # Search by name or phone number
        patients = Patient.objects.filter(
            name__icontains=search_query
        ).union(
            Patient.objects.filter(mobile_number__icontains=search_query)
        )[:limit]
        
        serializer = self.get_serializer(patients, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """
        Advanced search endpoint
        Usage: /api/patients/search/?name=john&mobile=123
        """
        name = request.query_params.get('name', '')
        mobile = request.query_params.get('mobile', '')
        
        queryset = Patient.objects.all()
        
        if name:
            queryset = queryset.filter(name__icontains=name)
        
        if mobile:
            queryset = queryset.filter(mobile_number__icontains=mobile)
        
        # Apply pagination
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['delete'])
    def bulk_delete(self, request):
        """
        Bulk delete patients
        Usage: /api/patients/bulk_delete/
        Body: {
            "patient_ids": ["1", "2", "3"]
        }
        """
        patient_ids = request.data.get('patient_ids', [])
        Patient.objects.filter(id__in=patient_ids).delete()
        return Response(status=status.HTTP_204_NO_CONTENT, data={'message': 'Patients deleted successfully'})


class AdultViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Adult model with autocomplete functionality
    """
    queryset = Adult.objects.all()
    serializer_class = AdultSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name', 'mobile_number', 'occupation']
    ordering_fields = ['name', 'age', 'created_at', 'updated_at']
    ordering = ['-created_at']
    
    def get_serializer_class(self):
        """Return appropriate serializer based on action"""
        if self.action == 'autocomplete':
            return AdultAutocompleteSerializer
        return AdultSerializer
    
    @action(detail=False, methods=['get'])
    def autocomplete(self, request):
        """
        Autocomplete endpoint for adult patient search
        Usage: /api/adults/autocomplete/?search=john
        """
        search_query = request.query_params.get('search', '')
        limit = int(request.query_params.get('limit', 10))
        
        if not search_query:
            return Response([])
        
        # Search by name, phone number, or occupation
        adults = Adult.objects.filter(
            name__icontains=search_query
        ).union(
            Adult.objects.filter(mobile_number__icontains=search_query)
        ).union(
            Adult.objects.filter(occupation__icontains=search_query)
        )[:limit]
        
        serializer = self.get_serializer(adults, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """
        Advanced search endpoint for adults
        Usage: /api/adults/search/?name=john&age=30&occupation=doctor
        """
        name = request.query_params.get('name', '')
        age = request.query_params.get('age', '')
        occupation = request.query_params.get('occupation', '')
        gender = request.query_params.get('gender', '')
        
        queryset = Adult.objects.all()
        
        if name:
            queryset = queryset.filter(name__icontains=name)
        
        if age:
            try:
                age_int = int(age)
                queryset = queryset.filter(age=age_int)
            except ValueError:
                pass
        
        if occupation:
            queryset = queryset.filter(occupation__icontains=occupation)
        
        if gender:
            queryset = queryset.filter(gender=gender)
        
        # Apply pagination
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_age_range(self, request):
        """
        Get adults by age range
        Usage: /api/adults/by_age_range/?min_age=18&max_age=65
        """
        min_age = request.query_params.get('min_age', '')
        max_age = request.query_params.get('max_age', '')
        
        queryset = Adult.objects.all()
        
        if min_age:
            try:
                min_age_int = int(min_age)
                queryset = queryset.filter(age__gte=min_age_int)
            except ValueError:
                pass
        
        if max_age:
            try:
                max_age_int = int(max_age)
                queryset = queryset.filter(age__lte=max_age_int)
            except ValueError:
                pass
        
        # Apply pagination
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
