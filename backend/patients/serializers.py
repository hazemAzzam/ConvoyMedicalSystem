from rest_framework import serializers
from .models import Patient, Adult


class PatientAutocompleteSerializer(serializers.ModelSerializer):
    """Serializer for autocomplete fields - minimal data"""
    class Meta:
        model = Patient
        fields = ['id', 'name', 'mobile_number']


class PatientSerializer(serializers.ModelSerializer):
    """Full serializer for Patient model"""
    class Meta:
        model = Patient
        fields = ['id', 'patient_type', 'code', 'house_number', 'name', 'gender', 'mobile_number', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate_mobile_number(self, value):
        """Validate phone number format"""
        if not value:
            raise serializers.ValidationError("Mobile number is required.")
        
        # Basic phone number validation (you can customize this)
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


class AdultSerializer(serializers.ModelSerializer):
    """Full serializer for Adult model"""
    
    class Meta:
        model = Adult
        fields = [
            # Patient fields
            'id', 'patient_type', 'code', 'house_number', 'name', 'gender', 'mobile_number',
            'created_at', 'updated_at',
            # Adult specific fields
            'occupation', 'marital_status', 'children_number', 'age_of_the_youngest', 
            'education_level', 'age',
            # Habits of medical importance
            'smoking', 'smoking_rate', 'smoking_type', 'other_smoking',
            'cessation', 'cessation_duration',
            'menstruation', 'gravidal_number', 'abortion_number',
            'contraception', 'contraception_method', 'contraception_other_method',
            # Complaints
            'complaints',
            # General Examination
            'bp', 'hr', 'temp', 'rbs', 'spo2',
            'cyanosis', 'jaundice', 'pallor',
            # Past history
            'medical', 'allergy', 'allergy_specification', 'blood_transfusion',
            'blood_transfusion_duration', 'surgical', 'surgical_operation', 'icu',
            'drugs',
            # Family History
            'family_history'
        ]
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
