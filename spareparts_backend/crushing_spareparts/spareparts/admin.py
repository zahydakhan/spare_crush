from django.contrib import admin
from import_export.admin import ImportExportModelAdmin

# Register your models here.
from .models import SparePart, Local_Comparison_SparePart, Roller

@admin.register(SparePart)
class SparePartsAdmin(ImportExportModelAdmin):
    list_display = ('id', 'part_number', 'description', 'vendor_name', 'vendor_status', 'sp_type', 'weight_kg','machine','model_number','aud','usd','price',)

@admin.register(Local_Comparison_SparePart)
class Local_SparePartsAdmin(ImportExportModelAdmin):
    list_display = ('id', 'part_number', 'description', 'vendor_name', 'vendor_status', 'sp_type', 'weight_kg','machine','model_number','aud','usd','price',)

@admin.register(Roller)
class RollerAdmin(ImportExportModelAdmin):
    list_display = ('description','roller_diameter', 'wall_thickness', 'roller_length', 'shaft_diameter', 'bearing','aud','usd','vendor_name','price',)
