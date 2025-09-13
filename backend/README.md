# Bedaya Medical System - Backend

A Django REST API backend for the Bedaya Medical System.

## Features

- **Authentication**: JWT-based authentication with refresh tokens
- **User Management**: User accounts and authentication system
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

## Technology Stack

- **Django 5.0.8**: Web framework
- **Django REST Framework**: API framework
- **JWT Authentication**: Secure token-based auth
- **PostgreSQL**: Database (configurable)
- **Redis**: Caching and task queue
- **Celery**: Background task processing

## Development

The project is structured with a single Django app:

- `accounts`: User authentication and management

## Database Models

### Authentication

- **User**: Django's built-in user model for authentication
- **JWT Tokens**: Secure token-based authentication system

## Environment Variables

See `env.example` for all available configuration options.
