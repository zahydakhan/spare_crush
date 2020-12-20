from django.contrib import admin
from import_export.admin import ImportExportModelAdmin
from .models import Site

@admin.register(Site)
class SiteAdmin(ImportExportModelAdmin):
    list_display = ('id','state', 'manager_name','manager_email', 'manager_phone','supervisor_name','supervisor_email', 'supervisor_phone',)
