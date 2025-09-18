# Backend Tests

This directory contains all the test files for the Django backend.

## Structure

```
tests/
├── unit/                    # Unit tests
│   ├── test_patients_models.py
│   └── test_patients_serializers.py
├── integration/             # Integration tests
│   └── test_patients_api.py
├── conftest.py             # Pytest configuration
└── README.md               # This file
```

## Running Tests

### Using Django's test runner:
```bash
# Run all tests
python manage.py test

# Run specific test file
python manage.py test tests.unit.test_patients_models

# Run with coverage
pip install coverage
coverage run --source='.' manage.py test
coverage report
coverage html
```

### Using pytest:
```bash
# Install pytest
pip install pytest pytest-django

# Run all tests
pytest

# Run specific test file
pytest tests/unit/test_patients_models.py

# Run with coverage
pytest --cov=. --cov-report=html
```

## Test Categories

### Unit Tests
- **Models**: Test model creation, validation, and business logic
- **Serializers**: Test data serialization, validation, and transformation

### Integration Tests
- **API Endpoints**: Test full request/response cycles
- **Database Operations**: Test complex queries and relationships

## Writing Tests

1. **Follow naming conventions**: Test files should start with `test_`
2. **Use descriptive test names**: Test names should clearly describe what is being tested
3. **Set up test data**: Use `setUp()` method for common test data
4. **Test edge cases**: Include tests for validation errors and edge cases
5. **Mock external dependencies**: Use mocks for external services

## Example Test Structure

```python
class ModelTest(TestCase):
    def setUp(self):
        """Set up test data"""
        self.test_data = {...}
    
    def test_valid_creation(self):
        """Test creating a valid instance"""
        instance = Model.objects.create(**self.test_data)
        self.assertEqual(instance.field, expected_value)
    
    def test_validation_error(self):
        """Test validation errors"""
        with self.assertRaises(ValidationError):
            instance = Model(**invalid_data)
            instance.full_clean()
```
