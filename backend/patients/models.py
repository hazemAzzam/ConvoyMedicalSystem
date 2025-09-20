import uuid
from django.db import models

EDUCATION_LEVELS = [
    ('illiterate', 'Illiterate'),
    ('read_write', 'Read and Write'),
    ('primary', 'Primary'),
    ('preparatory', 'Preparatory'),
    ('secondary', 'Secondary'),
    ('university', 'University'),
    ('postgraduate', 'Postgraduate'),
]

MENSTRUATIONS = [
    ('regular', 'Regular'),
    ('irregular', 'Irregular'),
    ('menopause', 'Menopause'),
]

CONTRACEPTION_METHODS = [
    ('implant', 'Implant'),
    ('iud', 'IUD'),
    ('coc', 'COC'),
    ('other', 'Other'),
]

BLOOD_TRANSFUSIONS = [
    ('no', 'No'),
    ('occasional', 'Occasional'),
    ('regular', 'Regular'),
]

SURGICALS = [
    ('icu', 'ICU'),
    ('operation', 'Operation'),
]



class Patient(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient_type = models.CharField(max_length=20, choices=[('adult', 'Adult'), ('pediatric', 'Pediatric')], default='adult')
    
    code = models.CharField("Code", max_length=255, unique=True, default='')
    house_number = models.CharField("House Number", max_length=255, default='')

    name = models.CharField(max_length=200, default='')
    gender = models.CharField(max_length=10, choices=[('male', 'Male'), ('female', 'Female')], default='male')
    mobile_number = models.CharField(max_length=15, default='')
    age = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.name} ({self.mobile_number})"

class Adult(Patient):
    occupation = models.CharField(max_length=255, default='')
    marital_status = models.CharField(max_length=255, choices=[('married', 'Married'), ('single', 'Single'), ('divorced', 'Divorced'), ('widowed', 'Widowed')], default='single')
    children_number = models.IntegerField(default=0)
    age_of_the_youngest = models.IntegerField(default=0)
    education_level = models.CharField(max_length=255, choices=EDUCATION_LEVELS, default='primary')

    # Hapits of medical importance
    smoking = models.CharField("Smoking", max_length=3, choices=[('yes', 'Yes'), ('no', 'No')], default='no')
    smoking_rate = models.CharField("Rate", max_length=255, null=True, blank=True)
    smoking_type = models.CharField("Type", max_length=255, null=True, blank=True)
    other_smoking = models.CharField("Other", max_length=255, null=True, blank=True)

    cessation = models.CharField("Smoking Cessations", max_length=3, choices=[('yes', 'Yes'), ('no', 'No')], default='no')
    cessation_duration = models.CharField("Duration", max_length=255, null=True, blank=True)

    menstruation = models.CharField("Menstruation", max_length=50, choices=MENSTRUATIONS, null=True, blank=True)
    gravidal_number = models.CharField("Gravidal Number", max_length=255, null=True, blank=True)
    abortion_number = models.CharField("Abortion Number", max_length=255, null=True, blank=True)

    contraception = models.CharField("Contraception", max_length=3, choices=[('yes', 'Yes'), ('no', 'No')], default='no')
    contraception_method = models.CharField("Method", max_length=255, choices=CONTRACEPTION_METHODS, null=True, blank=True)
    contraception_other_method = models.CharField("Other", max_length=255, null=True, blank=True)

    # Complaints
    complaints = models.ManyToManyField("others.SymptomModel", related_name='adult_complaints', blank=True, verbose_name="Complaint")

    # General Examination
    bp = models.CharField("BP", max_length=50, null=True, blank=True)
    hr = models.FloatField("HR", null=True, blank=True)
    temp = models.FloatField("Temp", null=True, blank=True)
    rbs = models.FloatField("RBS", null=True, blank=True)
    spo2 = models.FloatField("Spo2", null=True, blank=True)
    
    cyanosis = models.ManyToManyField("others.CyanosisModel", related_name='adult_cyanosis', blank=True, verbose_name="Cyanosis")
    jaundice = models.CharField("Jaundice", max_length=3, choices=[('yes', 'Yes'), ('no', 'No')], default='no')
    pallor = models.CharField("Pallor", max_length=3, choices=[('yes', 'Yes'), ('no', 'No')], default='no')


    # past history
    medical = models.ManyToManyField("others.MedicalModel", related_name='adult_medical', blank=True, verbose_name="Medical")
    allergy = models.CharField("Allergy", max_length=3, choices=[('yes', 'Yes'), ('no', 'No')], default='no')
    allergy_specification = models.CharField("Specify", max_length=255, null=True, blank=True)
    blood_transfusion = models.CharField("Blood Transfusion", max_length=50, choices=BLOOD_TRANSFUSIONS, default='no')

    blood_transfusion_duration = models.CharField("Duration", max_length=255, null=True, blank=True)
    surgical = models.CharField("Surgical", max_length=50, choices=SURGICALS, null=True, blank=True)
    surgical_operation = models.CharField("Operation", max_length=255, null=True, blank=True)

    icu = models.CharField("ICU", max_length=255, null=True, blank=True)

    drugs = models.ManyToManyField("others.DrugModel", related_name='adult_drugs', blank=True, verbose_name="Drugs")

    # Family History
    family_history = models.ManyToManyField("others.FamilyHistoryModel", related_name='adult_family_history', blank=True, verbose_name="Family History")

class Pediatric(Patient):
    pass