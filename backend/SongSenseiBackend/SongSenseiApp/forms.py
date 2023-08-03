# forms.py
from django import forms
from .models import MP3File

class MP3FileForm(forms.ModelForm):
    class Meta:
        model = MP3File
        fields = ('name', 'mp3_file',)
