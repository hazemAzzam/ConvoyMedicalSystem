from django.contrib import admin
from .models import (
    FamilyHistoryModel, 
    MedicalModel, 
    CyanosisModel, 
    DrugModel, 
    ClinicModel, 
    SymptomModel
)


@admin.register(FamilyHistoryModel)
class FamilyHistoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_on', 'updated_on']
    list_filter = ['created_on', 'updated_on']
    search_fields = ['name']
    readonly_fields = ['id', 'created_on', 'updated_on']


@admin.register(MedicalModel)
class MedicalAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_on', 'updated_on']
    list_filter = ['created_on', 'updated_on']
    search_fields = ['name']
    readonly_fields = ['id', 'created_on', 'updated_on']


@admin.register(CyanosisModel)
class CyanosisAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_on', 'updated_on']
    list_filter = ['created_on', 'updated_on']
    search_fields = ['name']
    readonly_fields = ['id', 'created_on', 'updated_on']


@admin.register(DrugModel)
class DrugAdmin(admin.ModelAdmin):
    list_display = ['name', 'created_on', 'updated_on']
    list_filter = ['created_on', 'updated_on']
    search_fields = ['name']
    readonly_fields = ['id', 'created_on', 'updated_on']


@admin.register(ClinicModel)
class ClinicAdmin(admin.ModelAdmin):
    list_display = ['name', 'description']
    search_fields = ['name', 'description']


@admin.register(SymptomModel)
class SymptomAdmin(admin.ModelAdmin):
    list_display = ['name', 'clinic', 'created_on', 'updated_on']
    list_filter = ['clinic', 'created_on', 'updated_on']
    search_fields = ['name', 'description', 'clinic__name']
    readonly_fields = ['id', 'created_on', 'updated_on']
    list_select_related = ['clinic']
