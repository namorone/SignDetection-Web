from django.contrib import admin

# Register your models here.
from .models import RecognitionHistory, TrainingSession, UserProfile, TrainingProgress

admin.site.register(RecognitionHistory)
admin.site.register(TrainingSession)
admin.site.register(UserProfile)
admin.site.register(TrainingProgress)