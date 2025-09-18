from django.contrib import admin
from .models import Patient, Adult, Pediatric

@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'code', 'patient_type', 'gender', 'created_at']
    list_filter = ['created_at', 'gender', 'patient_type']
    search_fields = ['name', 'mobile_number', 'code']
    readonly_fields = ['id', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Patient Information', {
            'fields': ('patient_type', 'code', 'house_number', 'name', 'gender', 'mobile_number')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Adult)
class AdultAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'code', 'age', 'occupation', 'marital_status', 'gender', 'created_at']
    list_filter = ['created_at', 'gender', 'marital_status', 'education_level', 'smoking']
    search_fields = ['name', 'mobile_number', 'code', 'occupation']
    readonly_fields = ['id', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Patient Information', {
            'fields': ('patient_type', 'code', 'house_number', 'name', 'gender', 'mobile_number')
        }),
        ('Adult Information', {
            'fields': ('age', 'occupation', 'marital_status', 'children_number', 'age_of_the_youngest', 'education_level')
        }),
        ('Habits of Medical Importance', {
            'fields': ('smoking', 'smoking_rate', 'smoking_type', 'other_smoking', 'cessation', 'cessation_duration'),
            'classes': ('collapse',)
        }),
        ('Women Health', {
            'fields': ('menstruation', 'gravidal_number', 'abortion_number', 'contraception', 'contraception_method', 'contraception_other_method'),
            'classes': ('collapse',)
        }),
        ('Medical Information', {
            'fields': ('complaints', 'bp', 'hr', 'temp', 'rbs', 'spo2', 'cyanosis', 'jaundice', 'pallor'),
            'classes': ('collapse',)
        }),
        ('Past History', {
            'fields': ('medical', 'allergy', 'allergy_specification', 'blood_transfusion', 'blood_transfusion_duration', 'surgical', 'surgical_operation', 'icu', 'drugs'),
            'classes': ('collapse',)
        }),
        ('Family History', {
            'fields': ('family_history',),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )

@admin.register(Pediatric)
class PediatricAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'code', 'gender', 'created_at']
    list_filter = ['created_at', 'gender']
    search_fields = ['name', 'mobile_number', 'code']
    readonly_fields = ['id', 'created_at', 'updated_at']
    
    fieldsets = (
        ('Patient Information', {
            'fields': ('patient_type', 'code', 'house_number', 'name', 'gender', 'mobile_number')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )