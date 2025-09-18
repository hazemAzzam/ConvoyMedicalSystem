from rest_framework import serializers
from .models import Patient, Adult


class PatientSerializer(serializers.ModelSerializer):
    """Full serializer for Patient model"""
    
    class Meta:
        model = Patient
        fields = "__all__"
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate_mobile_number(self, value):
        """Validate phone number format"""
        if not value:
            raise serializers.ValidationError("Mobile number is required.")
        
        if len(value) < 10:
            raise serializers.ValidationError("Mobile number must be at least 10 digits.")
        
        return value
    
    def validate_name(self, value):
        """Validate name"""
        if not value or not value.strip():
            raise serializers.ValidationError("Name is required.")
        
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        
        return value.strip()


class PatientAutocompleteSerializer(serializers.ModelSerializer):
    """Serializer for autocomplete fields - minimal data"""
    class Meta:
        model = Patient
        fields = ['id', 'name', 'mobile_number']


class AdultSerializer(serializers.ModelSerializer):
    """Full serializer for Adult model"""
    
    class Meta:
        model = Adult
        fields = "__all__"
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate_mobile_number(self, value):
        """Validate phone number format"""
        if not value:
            raise serializers.ValidationError("Mobile number is required.")
        
        if len(value) < 10:
            raise serializers.ValidationError("Mobile number must be at least 10 digits.")
        
        return value
    
    def validate_name(self, value):
        """Validate name"""
        if not value or not value.strip():
            raise serializers.ValidationError("Name is required.")
        
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        
        return value.strip()
    
    def validate_age(self, value):
        """Validate age"""
        if value < 0:
            raise serializers.ValidationError("Age cannot be negative.")
        if value > 150:
            raise serializers.ValidationError("Age seems unrealistic.")
        return value
    
    def validate_children_number(self, value):
        """Validate children number"""
        if value < 0:
            raise serializers.ValidationError("Children number cannot be negative.")
        return value
    
    def validate_age_of_the_youngest(self, value):
        """Validate age of youngest child"""
        if value < 0:
            raise serializers.ValidationError("Age of youngest child cannot be negative.")
        return value


class AdultAutocompleteSerializer(serializers.ModelSerializer):
    """Serializer for autocomplete fields - minimal data"""
    class Meta:
        model = Adult
        fields = ['id', 'name', 'mobile_number', 'age', 'occupation']
