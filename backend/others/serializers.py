from rest_framework import serializers
from .models import (
    FamilyHistoryModel, 
    MedicalModel, 
    CyanosisModel, 
    DrugModel, 
    ClinicModel, 
    SymptomModel
)


class FamilyHistorySerializer(serializers.ModelSerializer):
    """Full serializer for FamilyHistoryModel"""
    
    class Meta:
        model = FamilyHistoryModel
        fields = "__all__"
        read_only_fields = ['id', 'created_on', 'updated_on']
    
    def validate_name(self, value):
        """Validate name"""
        if not value or not value.strip():
            raise serializers.ValidationError("Name is required.")
        
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        
        return value.strip()


class FamilyHistoryAutocompleteSerializer(serializers.ModelSerializer):
    """Serializer for autocomplete fields - minimal data"""
    class Meta:
        model = FamilyHistoryModel
        fields = ['id', 'name']


class MedicalSerializer(serializers.ModelSerializer):
    """Full serializer for MedicalModel"""
    
    class Meta:
        model = MedicalModel
        fields = "__all__"
        read_only_fields = ['id', 'created_on', 'updated_on']
    
    def validate_name(self, value):
        """Validate name"""
        if not value or not value.strip():
            raise serializers.ValidationError("Name is required.")
        
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        
        return value.strip()


class MedicalAutocompleteSerializer(serializers.ModelSerializer):
    """Serializer for autocomplete fields - minimal data"""
    class Meta:
        model = MedicalModel
        fields = ['id', 'name']


class CyanosisSerializer(serializers.ModelSerializer):
    """Full serializer for CyanosisModel"""
    
    class Meta:
        model = CyanosisModel
        fields = "__all__"
        read_only_fields = ['id', 'created_on', 'updated_on']
    
    def validate_name(self, value):
        """Validate name"""
        if not value or not value.strip():
            raise serializers.ValidationError("Name is required.")
        
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        
        return value.strip()


class CyanosisAutocompleteSerializer(serializers.ModelSerializer):
    """Serializer for autocomplete fields - minimal data"""
    class Meta:
        model = CyanosisModel
        fields = ['id', 'name']


class DrugSerializer(serializers.ModelSerializer):
    """Full serializer for DrugModel"""
    
    class Meta:
        model = DrugModel
        fields = "__all__"
        read_only_fields = ['id', 'created_on', 'updated_on']
    
    def validate_name(self, value):
        """Validate name"""
        if not value or not value.strip():
            raise serializers.ValidationError("Name is required.")
        
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        
        return value.strip()


class DrugAutocompleteSerializer(serializers.ModelSerializer):
    """Serializer for autocomplete fields - minimal data"""
    class Meta:
        model = DrugModel
        fields = ['id', 'name']


class ClinicSerializer(serializers.ModelSerializer):
    """Full serializer for ClinicModel"""
    
    class Meta:
        model = ClinicModel
        fields = "__all__"
    
    def validate_name(self, value):
        """Validate name"""
        if not value or not value.strip():
            raise serializers.ValidationError("Name is required.")
        
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        
        return value.strip()


class ClinicAutocompleteSerializer(serializers.ModelSerializer):
    """Serializer for autocomplete fields - minimal data"""
    class Meta:
        model = ClinicModel
        fields = ['id', 'name']


class SymptomSerializer(serializers.ModelSerializer):
    """Full serializer for SymptomModel"""
    clinic_name = serializers.CharField(source='clinic.name', read_only=True)
    
    class Meta:
        model = SymptomModel
        fields = "__all__"
        read_only_fields = ['id', 'created_on', 'updated_on']
    
    def validate_name(self, value):
        """Validate name"""
        if not value or not value.strip():
            raise serializers.ValidationError("Name is required.")
        
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        
        return value.strip()
    
    def validate(self, data):
        """Validate unique constraint for name and clinic"""
        name = data.get('name')
        clinic = data.get('clinic')
        
        if name and clinic:
            # Check if symptom with same name and clinic already exists
            existing = SymptomModel.objects.filter(name=name, clinic=clinic)
            if self.instance:
                existing = existing.exclude(id=self.instance.id)
            
            if existing.exists():
                raise serializers.ValidationError(
                    "A symptom with this name already exists for this clinic."
                )
        
        return data


class SymptomAutocompleteSerializer(serializers.ModelSerializer):
    """Serializer for autocomplete fields - minimal data"""
    value = serializers.CharField(source='id', read_only=True)
    label = serializers.CharField(source='name', read_only=True)
    
    class Meta:
        model = SymptomModel
        fields = ['value', 'label']
