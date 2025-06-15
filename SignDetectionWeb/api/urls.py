# api/urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import (
    UserRegistrationView, UserProfileView,
    TrainingProgressViewSet, TrainingSessionViewSet, RecognitionHistoryViewSet,
    sign_language_recognition, speech_recognition, google_login, google_auth_complete
)

router = DefaultRouter()
router.register(r'training-progress', TrainingProgressViewSet, basename='training-progress')
router.register(r'training-sessions', TrainingSessionViewSet, basename='training-sessions')
router.register(r'recognition-history', RecognitionHistoryViewSet, basename='recognition-history')

urlpatterns = [
    path('', include(router.urls)),
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('sign-recognition/', sign_language_recognition, name='sign-recognition'),
    path('speech-recognition/', speech_recognition, name='speech-recognition'),
    path('auth/google/', google_login, name='google-login'),
    path('auth/google/complete/google-oauth2/', google_auth_complete, name='google-auth-complete'),
]