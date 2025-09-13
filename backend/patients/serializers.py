from rest_framework import serializers
from .models import Patient


class PatientAutocompleteSerializer(serializers.ModelSerializer):
    """Serializer for autocomplete fields - minimal data"""
    class Meta:
        model = Patient
        fields = ['id', 'name', 'phone_number']


class PatientSerializer(serializers.ModelSerializer):
    """Full serializer for Patient model"""
    class Meta:
        model = Patient
        fields = ['id', 'name', 'phone_number', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate_phone_number(self, value):
        """Validate phone number format"""
        if not value:
            raise serializers.ValidationError("Phone number is required.")
        
        # Basic phone number validation (you can customize this)
        if len(value) < 10:
            raise serializers.ValidationError("Phone number must be at least 10 digits.")
        
        return value
    
    def validate_name(self, value):
        """Validate name"""
        if not value or not value.strip():
            raise serializers.ValidationError("Name is required.")
        
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        
        return value.strip()
