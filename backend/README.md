# Bedaya Medical System - Backend

A Django REST API backend for the Bedaya Medical System.

## Features

- **Authentication**: JWT-based authentication with refresh tokens
- **User Management**: User accounts and authentication system
- **Patient Management**: Comprehensive patient records with adult and pediatric support
- **Medical Data Management**: Complete backend API for family history, medical records, cyanosis, drugs, clinics, and symptoms
- **Autocomplete API**: Search functionality for all medical entities
- **Bulk Operations**: Bulk delete functionality for all models
- **RESTful API**: Clean, well-documented API endpoints
- **CORS Support**: Configured for frontend integration

## Setup

1. **Create and activate virtual environment:**

   ```bash
   python -m venv venv
   venv\Scripts\activate  # Windows
   source venv/bin/activate  # Linux/Mac
   ```

2. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Environment Configuration:**

   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

4. **Run migrations:**

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Create superuser:**

   ```bash
   python manage.py createsuperuser
   ```

6. **Run development server:**
   ```bash
   python manage.py runserver
   ```

## API Endpoints

### Authentication

- `POST /api/auth/token/` - Obtain JWT token
- `POST /api/auth/token/refresh/` - Refresh JWT token

### Patients

- `GET /api/patients/` - List all patients
- `POST /api/patients/` - Create new patient
- `GET /api/patients/{id}/` - Get patient details
- `PUT /api/patients/{id}/` - Update patient
- `DELETE /api/patients/{id}/` - Delete patient
- `GET /api/patients/autocomplete/?search=query` - Autocomplete search for patients
- `DELETE /api/patients/bulk_delete/` - Bulk delete patients

### Adults

- `GET /api/adults/` - List all adult patients
- `POST /api/adults/` - Create new adult patient
- `GET /api/adults/{id}/` - Get adult patient details
- `PUT /api/adults/{id}/` - Update adult patient
- `DELETE /api/adults/{id}/` - Delete adult patient
- `GET /api/adults/autocomplete/?search=query` - Autocomplete search for adults
- `GET /api/adults/search/?name=john&age=30&occupation=doctor` - Advanced search for adults
- `GET /api/adults/by_age_range/?min_age=18&max_age=65` - Get adults by age range

### Medical Data

#### Family History

- `GET /api/family-history/` - List all family history records
- `POST /api/family-history/` - Create new family history record
- `GET /api/family-history/{id}/` - Get family history details
- `PUT /api/family-history/{id}/` - Update family history record
- `DELETE /api/family-history/{id}/` - Delete family history record
- `GET /api/family-history/autocomplete/?search=query` - Autocomplete search
- `DELETE /api/family-history/bulk_delete/` - Bulk delete family history records

#### Medical Records

- `GET /api/medical/` - List all medical records
- `POST /api/medical/` - Create new medical record
- `GET /api/medical/{id}/` - Get medical record details
- `PUT /api/medical/{id}/` - Update medical record
- `DELETE /api/medical/{id}/` - Delete medical record
- `GET /api/medical/autocomplete/?search=query` - Autocomplete search
- `DELETE /api/medical/bulk_delete/` - Bulk delete medical records

#### Cyanosis

- `GET /api/cyanosis/` - List all cyanosis records
- `POST /api/cyanosis/` - Create new cyanosis record
- `GET /api/cyanosis/{id}/` - Get cyanosis details
- `PUT /api/cyanosis/{id}/` - Update cyanosis record
- `DELETE /api/cyanosis/{id}/` - Delete cyanosis record
- `GET /api/cyanosis/autocomplete/?search=query` - Autocomplete search
- `DELETE /api/cyanosis/bulk_delete/` - Bulk delete cyanosis records

#### Drugs

- `GET /api/drugs/` - List all drugs
- `POST /api/drugs/` - Create new drug
- `GET /api/drugs/{id}/` - Get drug details
- `PUT /api/drugs/{id}/` - Update drug
- `DELETE /api/drugs/{id}/` - Delete drug
- `GET /api/drugs/autocomplete/?search=query` - Autocomplete search
- `DELETE /api/drugs/bulk_delete/` - Bulk delete drugs

#### Clinics

- `GET /api/clinics/` - List all clinics
- `POST /api/clinics/` - Create new clinic
- `GET /api/clinics/{id}/` - Get clinic details
- `PUT /api/clinics/{id}/` - Update clinic
- `DELETE /api/clinics/{id}/` - Delete clinic
- `GET /api/clinics/autocomplete/?search=query` - Autocomplete search
- `DELETE /api/clinics/bulk_delete/` - Bulk delete clinics

#### Symptoms

- `GET /api/symptoms/` - List all symptoms
- `POST /api/symptoms/` - Create new symptom
- `GET /api/symptoms/{id}/` - Get symptom details
- `PUT /api/symptoms/{id}/` - Update symptom
- `DELETE /api/symptoms/{id}/` - Delete symptom
- `GET /api/symptoms/autocomplete/?search=query&clinic_id=1` - Autocomplete search
- `GET /api/symptoms/by_clinic/?clinic_id=1` - Get symptoms by clinic
- `DELETE /api/symptoms/bulk_delete/` - Bulk delete symptoms

## Technology Stack

- **Django 5.0.8**: Web framework
- **Django REST Framework**: API framework
- **JWT Authentication**: Secure token-based auth
- **PostgreSQL**: Database (configurable)
- **Redis**: Caching and task queue
- **Celery**: Background task processing

## Development

The project is structured with three Django apps:

- `accounts`: User authentication and management
- `patients`: Patient management with adult and pediatric support
- `others`: Medical data management (family history, medical records, cyanosis, drugs, clinics, symptoms)

## Database Models

### Authentication

- **User**: Django's built-in user model for authentication
- **JWT Tokens**: Secure token-based authentication system

### Patients

- **Patient**: Base patient model with UUID4 primary key, name, and phone number
- **Adult**: Extended patient model for adult patients with comprehensive medical and personal information

### Medical Data (Others App)

- **FamilyHistoryModel**: Family medical history records
- **MedicalModel**: General medical records and conditions
- **CyanosisModel**: Cyanosis condition records
- **DrugModel**: Drug and medication records
- **ClinicModel**: Clinic information and management
- **SymptomModel**: Medical symptoms with clinic associations

## Environment Variables

See `env.example` for all available configuration options.
