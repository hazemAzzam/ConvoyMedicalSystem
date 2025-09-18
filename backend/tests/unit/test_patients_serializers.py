"""
Unit tests for Patient and Adult serializers
"""
from django.test import TestCase
from rest_framework.exceptions import ValidationError
from patients.models import Patient, Adult
from patients.serializers import PatientSerializer, AdultSerializer


class PatientSerializerTest(TestCase):
    """Test cases for PatientSerializer"""
    
    def setUp(self):
        """Set up test data"""
        self.valid_data = {
            'patient_type': 'adult',
            'code': 'SERIAL001',
            'house_number': '123',
            'name': 'Serial Patient',
            'gender': 'male',
            'mobile_number': '01234567890'
        }
    
    def test_valid_patient_serialization(self):
        """Test serializing a valid patient"""
        serializer = PatientSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        
        patient = serializer.save()
        self.assertEqual(patient.name, 'Serial Patient')
        self.assertEqual(patient.code, 'SERIAL001')
    
    def test_patient_validation_errors(self):
        """Test patient validation errors"""
        # Test empty name
        invalid_data = {**self.valid_data, 'name': ''}
        serializer = PatientSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)
        
        # Test short name
        invalid_data = {**self.valid_data, 'name': 'A'}
        serializer = PatientSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('name', serializer.errors)
        
        # Test short mobile number
        invalid_data = {**self.valid_data, 'mobile_number': '123'}
        serializer = PatientSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('mobile_number', serializer.errors)
        
        # Test empty mobile number
        invalid_data = {**self.valid_data, 'mobile_number': ''}
        serializer = PatientSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('mobile_number', serializer.errors)
    
    def test_patient_name_trimming(self):
        """Test that patient name is trimmed"""
        data_with_spaces = {**self.valid_data, 'name': '  John Doe  '}
        serializer = PatientSerializer(data=data_with_spaces)
        self.assertTrue(serializer.is_valid())
        
        patient = serializer.save()
        self.assertEqual(patient.name, 'John Doe')


class AdultSerializerTest(TestCase):
    """Test cases for AdultSerializer"""
    
    def setUp(self):
        """Set up test data"""
        self.valid_data = {
            'patient_type': 'adult',
            'code': 'ADULT001',
            'house_number': '456',
            'name': 'Adult Serial',
            'gender': 'female',
            'mobile_number': '09876543210',
            'occupation': 'Doctor',
            'marital_status': 'married',
            'children_number': 1,
            'age_of_the_youngest': 3,
            'education_level': 'university',
            'age': 35,
            'smoking': 'yes',
            'cessation': 'no'
        }
    
    def test_valid_adult_serialization(self):
        """Test serializing a valid adult"""
        serializer = AdultSerializer(data=self.valid_data)
        self.assertTrue(serializer.is_valid())
        
        adult = serializer.save()
        self.assertEqual(adult.name, 'Adult Serial')
        self.assertEqual(adult.occupation, 'Doctor')
        self.assertEqual(adult.smoking, 'yes')
        self.assertEqual(adult.cessation, 'no')
    
    def test_adult_validation_errors(self):
        """Test adult validation errors"""
        # Test negative age
        invalid_data = {**self.valid_data, 'age': -5}
        serializer = AdultSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('age', serializer.errors)
        
        # Test unrealistic age
        invalid_data = {**self.valid_data, 'age': 200}
        serializer = AdultSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('age', serializer.errors)
        
        # Test negative children number
        invalid_data = {**self.valid_data, 'children_number': -1}
        serializer = AdultSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('children_number', serializer.errors)
        
        # Test negative age of youngest
        invalid_data = {**self.valid_data, 'age_of_the_youngest': -2}
        serializer = AdultSerializer(data=invalid_data)
        self.assertFalse(serializer.is_valid())
        self.assertIn('age_of_the_youngest', serializer.errors)
    
    def test_adult_smoking_cessation_validation(self):
        """Test smoking and cessation field validation"""
        # Test valid smoking values
        for smoking_value in ['yes', 'no']:
            data = {**self.valid_data, 'smoking': smoking_value}
            serializer = AdultSerializer(data=data)
            self.assertTrue(serializer.is_valid(), f"Failed for smoking={smoking_value}")
        
        # Test valid cessation values
        for cessation_value in ['yes', 'no']:
            data = {**self.valid_data, 'cessation': cessation_value}
            serializer = AdultSerializer(data=data)
            self.assertTrue(serializer.is_valid(), f"Failed for cessation={cessation_value}")
    
    def test_adult_update_serialization(self):
        """Test updating an adult patient"""
        adult = Adult.objects.create(**self.valid_data)
        
        update_data = {
            'name': 'Updated Adult',
            'age': 40,
            'smoking': 'no',
            'cessation': 'yes'
        }
        
        serializer = AdultSerializer(adult, data=update_data, partial=True)
        self.assertTrue(serializer.is_valid())
        
        updated_adult = serializer.save()
        self.assertEqual(updated_adult.name, 'Updated Adult')
        self.assertEqual(updated_adult.age, 40)
        self.assertEqual(updated_adult.smoking, 'no')
        self.assertEqual(updated_adult.cessation, 'yes')
