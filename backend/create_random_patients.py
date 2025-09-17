#!/usr/bin/env python3
"""
Script to create random patients using the Django API
"""

import requests
import random
import json
from datetime import datetime, timedelta
from typing import List, Dict

# Configuration
API_BASE_URL = "http://localhost:8000/api"
PATIENTS_ENDPOINT = f"{API_BASE_URL}/patients/patients/"

# Sample data for random generation
FIRST_NAMES = [
    "Ahmed", "Mohamed", "Ali", "Omar", "Hassan", "Mahmoud", "Ibrahim", "Youssef",
    "Fatima", "Aisha", "Khadija", "Zainab", "Mariam", "Amina", "Safiya", "Ruqayya",
    "John", "Sarah", "Michael", "Emily", "David", "Jessica", "Robert", "Ashley",
    "William", "Jennifer", "James", "Lisa", "Christopher", "Nancy"
]

LAST_NAMES = [
    "Al-Rashid", "Al-Mahmoud", "Al-Hassan", "Al-Omar", "Al-Ahmad", "Al-Ibrahim",
    "Al-Youssef", "Al-Mahmoud", "Al-Farouk", "Al-Nasser", "Al-Saad", "Al-Khalil",
    "Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis",
    "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson"
]

OCCUPATIONS = [
    "Doctor", "Engineer", "Teacher", "Lawyer", "Accountant", "Nurse", "Manager",
    "Sales Representative", "Software Developer", "Architect", "Chef", "Artist",
    "Musician", "Writer", "Photographer", "Designer", "Consultant", "Analyst",
    "Administrator", "Technician", "Student", "Retired", "Unemployed", "Business Owner"
]

EDUCATION_LEVELS = [
    "illiterate", "read_write", "primary", "preparatory", "secondary", "university", "postgraduate"
]

MARITAL_STATUSES = ["married", "single", "divorced", "widowed"]

GENDERS = ["male", "female"]

PATIENT_TYPES = ["adult", "pediatric"]

CONTRACEPTION_METHODS = ["implant", "iud", "coc", "other"]

MENSTRUATION_CHOICES = ["regular", "irregular", "menopause"]

BLOOD_TRANSFUSION_CHOICES = ["no", "occasional", "regular"]

SURGICAL_CHOICES = ["icu", "operation"]

def generate_phone_number() -> str:
    """Generate a random Egyptian phone number"""
    prefixes = ["010", "011", "012", "015"]
    prefix = random.choice(prefixes)
    number = ''.join([str(random.randint(0, 9)) for _ in range(8)])
    return f"{prefix}{number}"

def generate_patient_code() -> str:
    """Generate a unique patient code"""
    return f"PAT{random.randint(10000, 99999)}"

def generate_house_number() -> str:
    """Generate a random house number"""
    return f"{random.randint(1, 999)}"

def generate_random_date(start_date: datetime, end_date: datetime) -> str:
    """Generate a random date between start and end dates"""
    time_between = end_date - start_date
    days_between = time_between.days
    random_days = random.randint(0, days_between)
    random_date = start_date + timedelta(days=random_days)
    return random_date.isoformat()

def create_random_patient() -> Dict:
    """Create a random patient data"""
    gender = random.choice(GENDERS)
    patient_type = random.choice(PATIENT_TYPES)
    
    # Base patient data
    patient_data = {
        "patient_type": patient_type,
        "code": generate_patient_code(),
        "house_number": generate_house_number(),
        "name": f"{random.choice(FIRST_NAMES)} {random.choice(LAST_NAMES)}",
        "gender": gender,
        "mobile_number": generate_phone_number(),
    }
    
    # Add adult-specific fields if patient type is adult
    if patient_type == "adult":
        children_number = random.randint(0, 8)
        patient_data.update({
            "occupation": random.choice(OCCUPATIONS),
            "marital_status": random.choice(MARITAL_STATUSES),
            "children_number": children_number,
            "age_of_the_youngest": random.randint(0, 18) if children_number > 0 else 0,
            "education_level": random.choice(EDUCATION_LEVELS),
            "age": random.randint(18, 80),
            
            # Habits of medical importance
            "smoking": random.choice([True, False]),
            "smoking_rate": random.choice(["1 pack/day", "2 packs/day", "occasional"]) if random.choice([True, False]) else None,
            "smoking_type": random.choice(["cigarettes", "cigar", "pipe"]) if random.choice([True, False]) else None,
            "other_smoking": random.choice(["shisha", "vape", "chewing tobacco"]) if random.choice([True, False]) else None,
            
            "cessation": random.choice([True, False]),
            "cessation_duration": f"{random.randint(1, 24)} months" if random.choice([True, False]) else None,
            
            # Women health (only for female patients)
            "menstruation": random.choice(MENSTRUATION_CHOICES) if gender == "female" else None,
            "gravidal_number": str(random.randint(0, 10)) if gender == "female" and random.choice([True, False]) else None,
            "abortion_number": str(random.randint(0, 3)) if gender == "female" and random.choice([True, False]) else None,
            
            "contraception": random.choice([True, False]) if gender == "female" else False,
            "contraception_method": random.choice(CONTRACEPTION_METHODS) if gender == "female" and random.choice([True, False]) else None,
            "contraception_other_method": random.choice(["condom", "diaphragm", "spermicide"]) if random.choice([True, False]) else None,
            
            # General Examination
            "bp": f"{random.randint(90, 180)}/{random.randint(60, 120)}" if random.choice([True, False]) else None,
            "hr": round(random.uniform(60, 100), 1) if random.choice([True, False]) else None,
            "temp": round(random.uniform(36.0, 38.5), 1) if random.choice([True, False]) else None,
            "rbs": round(random.uniform(70, 200), 1) if random.choice([True, False]) else None,
            "spo2": round(random.uniform(95, 100), 1) if random.choice([True, False]) else None,
            
            "jaundice": random.choice([True, False]),
            "pallor": random.choice([True, False]),
            
            # Past history
            "allergy": random.choice([True, False]),
            "allergy_specification": random.choice(["penicillin", "sulfa", "aspirin", "food allergy"]) if random.choice([True, False]) else None,
            "blood_transfusion": random.choice(BLOOD_TRANSFUSION_CHOICES),
            "blood_transfusion_duration": f"{random.randint(1, 12)} months ago" if random.choice([True, False]) else None,
            "surgical": random.choice(SURGICAL_CHOICES) if random.choice([True, False]) else None,
            "surgical_operation": random.choice(["appendectomy", "cholecystectomy", "hernia repair"]) if random.choice([True, False]) else None,
            "icu": f"{random.randint(1, 30)} days" if random.choice([True, False]) else None,
        })
    
    return patient_data

def create_patients(count: int = 10) -> List[Dict]:
    """Create multiple random patients"""
    patients = []
    for _ in range(count):
        patients.append(create_random_patient())
    return patients

def post_patient_to_api(patient_data: Dict) -> bool:
    """Post a single patient to the API"""
    try:
        response = requests.post(
            PATIENTS_ENDPOINT,
            json=patient_data,
            headers={"Content-Type": "application/json"}
        )
        
        if response.status_code == 201:
            print(f"✅ Created patient: {patient_data['name']} ({patient_data['code']})")
            return True
        else:
            print(f"❌ Failed to create patient {patient_data['name']}: {response.status_code}")
            print(f"   Response: {response.text}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Error creating patient {patient_data['name']}: {e}")
        return False

def main():
    """Main function to create random patients"""
    print("🏥 Random Patient Generator")
    print("=" * 50)
    
    # Get number of patients to create
    try:
        count = int(input("How many patients do you want to create? (default: 10): ") or "10")
    except ValueError:
        count = 10
    
    print(f"\n📝 Creating {count} random patients...")
    print(f"🌐 API Endpoint: {PATIENTS_ENDPOINT}")
    print("-" * 50)
    
    # Create patients
    patients = create_patients(count)
    
    # Post patients to API
    success_count = 0
    for i, patient in enumerate(patients, 1):
        print(f"[{i}/{count}] ", end="")
        if post_patient_to_api(patient):
            success_count += 1
    
    print("-" * 50)
    print(f"📊 Summary:")
    print(f"   Total patients: {count}")
    print(f"   Successfully created: {success_count}")
    print(f"   Failed: {count - success_count}")
    
    if success_count > 0:
        print(f"\n🎉 Successfully created {success_count} patients!")
        print(f"   Check your Django admin or API to see the new patients.")

if __name__ == "__main__":
    main()
