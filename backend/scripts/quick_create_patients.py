#!/usr/bin/env python3
"""
Quick script to create 5 random patients
"""

import requests
import random
import json

# Configuration
API_BASE_URL = "http://localhost:8000/api"
PATIENTS_ENDPOINT = f"{API_BASE_URL}/patients/patients/"

def create_quick_patients():
    """Create 5 random patients quickly"""
    
    # Sample data
    names = ["Ahmed Ali", "Fatima Hassan", "Mohamed Omar", "Aisha Youssef", "Omar Mahmoud"]
    genders = ["male", "female"]
    occupations = ["Doctor", "Engineer", "Teacher", "Nurse", "Manager"]
    
    patients_created = 0
    
    for i, name in enumerate(names):
        patient_data = {
            "patient_type": "adult",
            "code": f"PAT{10000 + i}",
            "house_number": f"{100 + i}",
            "name": name,
            "gender": random.choice(genders),
            "mobile_number": f"010{random.randint(10000000, 99999999)}",
            "occupation": random.choice(occupations),
            "marital_status": random.choice(["married", "single"]),
            "children_number": random.randint(0, 3),
            "age_of_the_youngest": random.randint(0, 10),
            "education_level": random.choice(["university", "secondary"]),
            "age": random.randint(25, 60),
            "smoking": False,
            "cessation": False,
            "contraception": False,
            "jaundice": False,
            "pallor": False,
            "allergy": False,
            "blood_transfusion": "no",
        }
        
        try:
            response = requests.post(
                PATIENTS_ENDPOINT,
                json=patient_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 201:
                patients_created += 1
            else:
                
        except Exception as e:
    

if __name__ == "__main__":
    create_quick_patients()
