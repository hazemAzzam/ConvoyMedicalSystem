# Bedaya Medical System - Backend

A Django REST API backend for the Bedaya Medical System.

## Features

- **Authentication**: JWT-based authentication with refresh tokens
- **User Management**: User accounts and authentication system
- **Patient Management**: Simple patient records with UUID4, name, and phone number
- **Autocomplete API**: Patient search with autocomplete functionality
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
- `GET /api/patients/search/?name=john&phone=123` - Advanced search for patients

## Technology Stack

- **Django 5.0.8**: Web framework
- **Django REST Framework**: API framework
- **JWT Authentication**: Secure token-based auth
- **PostgreSQL**: Database (configurable)
- **Redis**: Caching and task queue
- **Celery**: Background task processing

## Development

The project is structured with two Django apps:

- `accounts`: User authentication and management
- `patients`: Patient management with autocomplete functionality

## Database Models

### Authentication

- **User**: Django's built-in user model for authentication
- **JWT Tokens**: Secure token-based authentication system

### Patients

- **Patient**: Simple patient model with UUID4 primary key, name, and phone number

## Environment Variables

See `env.example` for all available configuration options.
