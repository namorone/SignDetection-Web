from rest_framework import serializers
from django.contrib.auth.models import User
from .models import UserProfile, TrainingProgress, TrainingSession, RecognitionHistory


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
        read_only_fields = ('id',)


class UserRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'first_name', 'last_name')

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        UserProfile.objects.create(user=user)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = UserProfile
        fields = ('id', 'user', 'created_at', 'updated_at')
        read_only_fields = ('id', 'created_at', 'updated_at')


class TrainingProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingProgress
        fields = ('id', 'user', 'letter', 'accuracy', 'mastered', 'created_at', 'updated_at')
        read_only_fields = ('id', 'user', 'created_at', 'updated_at')


class TrainingSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingSession
        fields = ('id', 'user', 'duration', 'letters_practiced', 'average_accuracy', 'created_at')
        read_only_fields = ('id', 'user', 'created_at')


class RecognitionHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = RecognitionHistory
        fields = ('id', 'user', 'recognition_type', 'input_data', 'result_text', 'created_at')
        read_only_fields = ('id', 'user', 'created_at')


class SignLanguageRecognitionSerializer(serializers.Serializer):
    image = serializers.ImageField()
    save_history = serializers.BooleanField(default=True)


class SpeechRecognitionSerializer(serializers.Serializer):
    audio = serializers.FileField()
    save_history = serializers.BooleanField(default=True)