"""
Pytest configuration for Django tests
"""
import pytest
import os
import django
from django.conf import settings
from django.test.utils import get_runner

# Set up Django settings for testing
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'bedaya_medical_system.settings')
django.setup()


@pytest.fixture(scope='session')
def django_db_setup(django_db_setup, django_db_blocker):
    """Set up database for testing"""
    with django_db_blocker.unblock():
        # Run migrations for test database
        from django.core.management import execute_from_command_line
        execute_from_command_line(['manage.py', 'migrate', '--run-syncdb'])


@pytest.fixture
def sample_patient_data():
    """Sample patient data for testing"""
    return {
        'patient_type': 'adult',
        'code': 'TEST001',
        'house_number': '123',
        'name': 'Test Patient',
        'gender': 'male',
        'mobile_number': '01234567890'
    }


@pytest.fixture
def sample_adult_data():
    """Sample adult data for testing"""
    return {
        'patient_type': 'adult',
        'code': 'ADULT001',
        'house_number': '456',
        'name': 'Test Adult',
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
