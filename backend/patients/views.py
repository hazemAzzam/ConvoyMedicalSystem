from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from .models import Patient
from .serializers import PatientSerializer, PatientAutocompleteSerializer


class PatientViewSet(viewsets.ModelViewSet):
    """
    ViewSet for Patient model with autocomplete functionality
    """
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    search_fields = ['name', 'phone_number']
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
            Patient.objects.filter(phone_number__icontains=search_query)
        )[:limit]
        
        serializer = self.get_serializer(patients, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def search(self, request):
        """
        Advanced search endpoint
        Usage: /api/patients/search/?name=john&phone=123
        """
        name = request.query_params.get('name', '')
        phone = request.query_params.get('phone', '')
        
        queryset = Patient.objects.all()
        
        if name:
            queryset = queryset.filter(name__icontains=name)
        
        if phone:
            queryset = queryset.filter(phone_number__icontains=phone)
        
        # Apply pagination
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
