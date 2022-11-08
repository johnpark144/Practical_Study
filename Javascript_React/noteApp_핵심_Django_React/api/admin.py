from django.contrib import admin
from .models import Note

class NoteAdmin(admin.ModelAdmin):
    search_fields = ['subject'] 

admin.site.register(Note, NoteAdmin)