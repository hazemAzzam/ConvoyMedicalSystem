from rest_framework import serializers
from .models import Patient, Adult
from others.serializers import SymptomAutocompleteSerializer

class PatientSerializer(serializers.ModelSerializer):
    """Full serializer for Patient model"""
    
    class Meta:
        model = Patient
        fields = "__all__"
        read_only_fields = ['id', 'created_at', 'updated_at']


    def validate_age(self, value):
        """Validate age"""
        if value < 0:
            raise serializers.ValidationError("Age cannot be negative.")
        if value > 150:
            raise serializers.ValidationError("Age seems unrealistic.")
        return value
    
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
        extra_kwargs = {
            'complaints': {'write_only': False}
        }

    
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
    
    def validate_contraception(self, value):
        """Validate contraception choice"""
        valid_choices = ['yes', 'no']
        if value not in valid_choices:
            raise serializers.ValidationError(f"Contraception must be one of: {', '.join(valid_choices)}")
        return value
    
    def validate_jaundice(self, value):
        """Validate jaundice choice"""
        valid_choices = ['yes', 'no']
        if value not in valid_choices:
            raise serializers.ValidationError(f"Jaundice must be one of: {', '.join(valid_choices)}")
        return value
    
    def validate_pallor(self, value):
        """Validate pallor choice"""
        valid_choices = ['yes', 'no']
        if value not in valid_choices:
            raise serializers.ValidationError(f"Pallor must be one of: {', '.join(valid_choices)}")
        return value
    
    def validate_allergy(self, value):
        """Validate allergy choice"""
        valid_choices = ['yes', 'no']
        if value not in valid_choices:
            raise serializers.ValidationError(f"Allergy must be one of: {', '.join(valid_choices)}")
        return value

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        
        # convert the complaints to a list of {value, label} objects
        ret['complaints'] = [
            {
                'value': str(complaint.id),
                'label': complaint.name
            }
            for complaint in instance.complaints.all()
        ]
        
        return ret

    def to_internal_value(self, data):
        from others.models import SymptomModel, CyanosisModel, MedicalModel, DrugModel, FamilyHistoryModel

        # data = super().to_internal_value(data)
        
        # Define ManyToMany field mappings
        many_to_many_mappings = {
            'complaints': SymptomModel,
            'cyanosis': CyanosisModel,
            'medical': MedicalModel,
            'drugs': DrugModel,
            'family_history': FamilyHistoryModel,
        }
        
        # Handle all ManyToMany fields
        for field_name, model_class in many_to_many_mappings.items():
            field_data = data.get(field_name)
            
            if field_data and field_data != "no complaints" and field_data != []:
                try:
                    # Convert from frontend format to model instances
                    instances = []
                    for item in field_data:
                        if isinstance(item, dict) and "value" in item:
                            item_id = item["value"]
                            instance = model_class.objects.get(id=item_id)
                            instances.append(instance)
                        elif isinstance(item, str):
                            # Handle case where ID is passed directly as string
                            instance = model_class.objects.get(id=item)
                            instances.append(instance)
                    data[field_name] = instances
                except model_class.DoesNotExist as e:
                    data[field_name] = []
                except Exception as e:
                    data[field_name] = []
            else:
                data[field_name] = []
            
        return data



    # # def create(self, validated_data):
    # #     # Extract ManyToMany fields data before creating the instance
    # #     many_to_many_fields = ['complaints', 'cyanosis', 'medical', 'drugs', 'family_history']
    # #     many_to_many_data = {}
        
    # #     for field in many_to_many_fields:
    # #         if field in validated_data:
    # #             many_to_many_data[field] = validated_data.pop(field, [])
        
    # #     # Create the Adult instance
    # #     adult = Adult.objects.create(**validated_data)
        
    # #     # Set all ManyToMany fields
    # #     for field, data in many_to_many_data.items():
    # #         if data:
    # #             getattr(adult, field).set(data)
        
    # #     return adult

    # def update(self, instance, validated_data):
    #     # Extract ManyToMany fields data before updating the instance
    #     many_to_many_fields = ['complaints', 'cyanosis', 'medical', 'drugs', 'family_history']
    #     many_to_many_data = {}
        
    #     for field in many_to_many_fields:
    #         if field in validated_data:
    #             many_to_many_data[field] = validated_data.pop(field, [])
        
    #     # Update the Adult instance with non-ManyToMany fields
    #     for attr, value in validated_data.items():
    #         setattr(instance, attr, value)
    #     instance.save()
        
    #     # Update all ManyToMany fields
    #     for field, data in many_to_many_data.items():
    #         if data is not None:
    #             getattr(instance, field).set(data)
        
    #     return instance


class AdultAutocompleteSerializer(serializers.ModelSerializer):
    """Serializer for autocomplete fields - minimal data"""
    complaints = serializers.SerializerMethodField()
    
    class Meta:
        model = Adult
        fields = ['id', 'name', 'mobile_number', 'age', 'occupation', 'complaints']
    
    def get_complaints(self, obj):
        """Return complaints as list of {value, label} objects"""
        return [
            {
                'value': str(symptom.id),
                'label': symptom.name
            }
            for symptom in obj.complaints.all()
        ]
