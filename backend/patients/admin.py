from django.contrib import admin
from .models import Patient


@admin.register(Patient)
class PatientAdmin(admin.ModelAdmin):
    list_display = ['id', 'name', 'phone_number', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'phone_number']
    readonly_fields = ['id', 'created_at', 'updated_at']
    fieldsets = (
        ('Patient Information', {
            'fields': ('id', 'name', 'phone_number')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
