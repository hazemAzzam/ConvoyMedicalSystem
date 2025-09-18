"""
Integration tests for Patient and Adult API endpoints
"""
from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from patients.models import Patient, Adult
import json


class PatientAPITest(APITestCase):
    """Integration tests for Patient API endpoints"""
    
    def setUp(self):
        """Set up test data"""
        self.patient_data = {
            'patient_type': 'adult',
            'code': 'API001',
            'house_number': '123',
            'name': 'API Patient',
            'gender': 'male',
            'mobile_number': '01234567890'
        }
    
    def test_create_patient(self):
        """Test creating a patient via API"""
        url = reverse('patient-list')
        response = self.client.post(url, self.patient_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Patient.objects.count(), 1)
        self.assertEqual(Patient.objects.get().name, 'API Patient')
    
    def test_list_patients(self):
        """Test listing patients via API"""
        # Create test patients
        Patient.objects.create(**self.patient_data)
        Patient.objects.create(**{
            **self.patient_data,
            'code': 'API002',
            'name': 'Second Patient'
        })
        
        url = reverse('patient-list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['results']), 2)
    
    def test_retrieve_patient(self):
        """Test retrieving a specific patient via API"""
        patient = Patient.objects.create(**self.patient_data)
        url = reverse('patient-detail', kwargs={'pk': patient.pk})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'API Patient')
    
    def test_update_patient(self):
        """Test updating a patient via API"""
        patient = Patient.objects.create(**self.patient_data)
        url = reverse('patient-detail', kwargs={'pk': patient.pk})
        
        update_data = {'name': 'Updated Patient'}
        response = self.client.patch(url, update_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        patient.refresh_from_db()
        self.assertEqual(patient.name, 'Updated Patient')
    
    def test_delete_patient(self):
        """Test deleting a patient via API"""
        patient = Patient.objects.create(**self.patient_data)
        url = reverse('patient-detail', kwargs={'pk': patient.pk})
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Patient.objects.count(), 0)


class AdultAPITest(APITestCase):
    """Integration tests for Adult API endpoints"""
    
    def setUp(self):
        """Set up test data"""
        self.adult_data = {
            'patient_type': 'adult',
            'code': 'ADULT001',
            'house_number': '456',
            'name': 'Adult API',
            'gender': 'female',
            'mobile_number': '09876543210',
            'occupation': 'Engineer',
            'marital_status': 'married',
            'children_number': 2,
            'age_of_the_youngest': 5,
            'education_level': 'university',
            'age': 30,
            'smoking': 'yes',
            'cessation': 'no'
        }
    
    def test_create_adult(self):
        """Test creating an adult via API"""
        url = reverse('adult-list')
        response = self.client.post(url, self.adult_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Adult.objects.count(), 1)
        
        adult = Adult.objects.get()
        self.assertEqual(adult.name, 'Adult API')
        self.assertEqual(adult.smoking, 'yes')
        self.assertEqual(adult.cessation, 'no')
    
    def test_list_adults(self):
        """Test listing adults via API"""
        # Create test adults
        Adult.objects.create(**self.adult_data)
        Adult.objects.create(**{
            **self.adult_data,
            'code': 'ADULT002',
            'name': 'Second Adult',
            'smoking': 'no',
            'cessation': 'yes'
        })
        
        url = reverse('adult-list')
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 2)
    
    def test_retrieve_adult(self):
        """Test retrieving a specific adult via API"""
        adult = Adult.objects.create(**self.adult_data)
        url = reverse('adult-detail', kwargs={'pk': adult.pk})
        response = self.client.get(url)
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['name'], 'Adult API')
        self.assertEqual(response.data['smoking'], 'yes')
        self.assertEqual(response.data['cessation'], 'no')
    
    def test_update_adult(self):
        """Test updating an adult via API"""
        adult = Adult.objects.create(**self.adult_data)
        url = reverse('adult-detail', kwargs={'pk': adult.pk})
        
        update_data = {
            'name': 'Updated Adult',
            'smoking': 'no',
            'cessation': 'yes'
        }
        response = self.client.patch(url, update_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        adult.refresh_from_db()
        self.assertEqual(adult.name, 'Updated Adult')
        self.assertEqual(adult.smoking, 'no')
        self.assertEqual(adult.cessation, 'yes')
    
    def test_delete_adult(self):
        """Test deleting an adult via API"""
        adult = Adult.objects.create(**self.adult_data)
        url = reverse('adult-detail', kwargs={'pk': adult.pk})
        response = self.client.delete(url)
        
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Adult.objects.count(), 0)
    
    def test_adult_validation_errors(self):
        """Test adult validation errors via API"""
        invalid_data = {
            **self.adult_data,
            'age': -5,  # Invalid negative age
            'smoking': 'invalid'  # Invalid smoking value
        }
        
        url = reverse('adult-list')
        response = self.client.post(url, invalid_data, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('age', response.data)
    
    def test_adult_search_functionality(self):
        """Test adult search functionality"""
        # Create adults with different names
        Adult.objects.create(**self.adult_data)
        Adult.objects.create(**{
            **self.adult_data,
            'code': 'ADULT002',
            'name': 'John Smith',
            'occupation': 'Doctor'
        })
        
        url = reverse('adult-list')
        
        # Test search by name
        response = self.client.get(url, {'search': 'John'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['name'], 'John Smith')
        
        # Test search by occupation
        response = self.client.get(url, {'search': 'Doctor'})
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
        self.assertEqual(response.data[0]['occupation'], 'Doctor')
