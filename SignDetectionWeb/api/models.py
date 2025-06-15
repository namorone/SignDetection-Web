from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s profile"


class TrainingProgress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='training_progress')
    letter = models.CharField(max_length=1)
    accuracy = models.FloatField(default=0.0)  # 0.0 to 1.0
    mastered = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('user', 'letter')

    def __str__(self):
        return f"{self.user.username} - {self.letter} - {self.accuracy}"


class TrainingSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='training_sessions')
    duration = models.IntegerField(default=0)  # in seconds
    letters_practiced = models.CharField(max_length=100)  # Comma-separated list of letters
    average_accuracy = models.FloatField(default=0.0)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"


class RecognitionHistory(models.Model):
    TYPE_CHOICES = (
        ('sign_to_text', 'Sign Language to Text'),
        ('speech_to_text', 'Speech to Text'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='recognition_history')
    recognition_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    input_data = models.FileField(upload_to='uploads/%Y/%m/%d/', null=True, blank=True)
    result_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.recognition_type} - {self.created_at.strftime('%Y-%m-%d %H:%M')}"