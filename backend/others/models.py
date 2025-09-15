import uuid

from django.db import models
from django.utils.translation import gettext_lazy as _


# Create your models here.
class FamilyHistoryModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_on = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_on = models.DateTimeField(auto_now=True, null=True, blank=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
class MedicalModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_on = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_on = models.DateTimeField(auto_now=True, null=True, blank=True)
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    

class CyanosisModel(models.Model):
    """Model definition for Cyanosis."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_on = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_on = models.DateTimeField(auto_now=True, null=True, blank=True)
    
    name = models.CharField(max_length=50)

    class Meta:
        """Meta definition for Cyanosis."""
        verbose_name = 'Cyanosis'
        verbose_name_plural = 'Cyanoses'

    def __str__(self):
        return self.name
    
class DrugModel(models.Model):
    """Model definition for Drug."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_on = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_on = models.DateTimeField(auto_now=True, null=True, blank=True)
    
    name = models.CharField(max_length=50)

    class Meta:
        """Meta definition for Drug."""
        verbose_name = _('Drug')
        verbose_name_plural = _('Drugs')

    def __str__(self):
        """Unicode representation of Drug."""
        return self.name

class ClinicModel(models.Model):
    """Model definition for Clinic."""
    name = models.CharField("Clinic Name", max_length=255)
    description = models.TextField("Clinic Descriptions", null=True, blank=True)

    class Meta:
        """Meta definition for Clinic."""

        verbose_name = 'Clinic'
        verbose_name_plural = 'Clinics'

    def __str__(self) -> str:
        return f"{self.name}"


class SymptomModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)

    name = models.CharField(_("Symptom Name"), max_length=255)
    description = models.TextField(_("Symptom Description"), null=True, blank=True)
    clinic = models.ForeignKey("ClinicModel", verbose_name=_("Clinic"), on_delete=models.PROTECT)

    created_on = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    updated_on = models.DateTimeField(auto_now=True, null=True, blank=True)

    class Meta:
        verbose_name = _("Symptom")
        verbose_name_plural = _("Symptoms")
        unique_together = ('name', 'clinic')

    def __str__(self):
        return self.name
