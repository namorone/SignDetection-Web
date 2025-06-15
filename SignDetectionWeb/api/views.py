print("Loading api/views.py")
from django.shortcuts import render
from rest_framework import viewsets, status, generics, permissions
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User
from .models import UserProfile, TrainingProgress, TrainingSession, RecognitionHistory
from .serializers import (
    UserSerializer, UserRegistrationSerializer, UserProfileSerializer,
    TrainingProgressSerializer, TrainingSessionSerializer, RecognitionHistorySerializer,
    SignLanguageRecognitionSerializer, SpeechRecognitionSerializer
)
from .services.sign_language_service import SignLanguageRecognitionService
from .services.speech_recognition_service import SpeechRecognitionService
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from social_django.utils import psa
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect
from django.conf import settings
import requests


class UserRegistrationView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]



class UserProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = UserProfileSerializer

    def get_object(self):
        return UserProfile.objects.get(user=self.request.user)



class TrainingProgressViewSet(viewsets.ModelViewSet):
    serializer_class = TrainingProgressSerializer

    def get_queryset(self):
        return TrainingProgress.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



class TrainingSessionViewSet(viewsets.ModelViewSet):
    serializer_class = TrainingSessionSerializer

    def get_queryset(self):
        return TrainingSession.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



class RecognitionHistoryViewSet(viewsets.ModelViewSet):
    serializer_class = RecognitionHistorySerializer

    def get_queryset(self):
        return RecognitionHistory.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


@api_view(['GET'])
@permission_classes([AllowAny])
@csrf_exempt
def google_login(request):
    # Redirect user-agent to social-django login URL
    return redirect('/login/google-oauth2/')

GOOGLE_TOKEN_URL   = 'https://oauth2.googleapis.com/token'
GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v3/userinfo'

@api_view(['GET'])
@permission_classes([AllowAny])
def google_auth_complete(request):
    """
    Callback від Google: обмінюємо ?code=... на токени,
    дістаємо email, створюємо/логінимо User, віддаємо JWT.
    """
    print("ttttttttt")
    code = request.GET.get('code')
    if not code:
        return Response({'error': 'No code provided'}, status=400)

    # 1) code → access / refresh
    token_resp = requests.post(
        GOOGLE_TOKEN_URL,
        data={
            'code':          code,
            'client_id':     settings.SOCIAL_AUTH_GOOGLE_OAUTH2_KEY,
            'client_secret': settings.SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET,
            'redirect_uri':  settings.SOCIAL_AUTH_GOOGLE_OAUTH2_REDIRECT_URI,
            'grant_type':    'authorization_code',
        },
    )
    if token_resp.status_code != 200:
        return Response({'error': 'token exchange failed',
                         'details': token_resp.json()}, status=400)
    tokens = token_resp.json()

    # 2) access_token → userinfo
    userinfo = requests.get(
        GOOGLE_USERINFO_URL,
        headers={'Authorization': f"Bearer {tokens['access_token']}"},
    )
    if userinfo.status_code != 200:
        return Response({'error': 'userinfo fetch failed',
                         'details': userinfo.json()}, status=400)
    profile = userinfo.json()
    email = profile.get('email')
    if not email:
        return Response({'error': 'email not returned'}, status=400)

    # 3) User / UserProfile
    user, _ = User.objects.get_or_create(
        username=email,
        defaults={'email': email,
                  'first_name': profile.get('given_name', ''),
                  'last_name':  profile.get('family_name', '')},
    )

    # 4) JWT
    refresh = RefreshToken.for_user(user)
    return Response({
        'refresh': str(refresh),
        'access':  str(refresh.access_token),
    })

# @api_view(['GET'])
# @permission_classes([AllowAny])
# @csrf_exempt
# @psa('social:complete')
# def google_(request, backend):
#     user = request.backend.do_auth(request.GET.get('code'))
#     if user and user.is_authenticated:
#         refresh = RefreshToken.for_user(user)
#         return Response({
#             'refresh': str(refresh),
#             'access': str(refresh.access_token),
#         })
#
#     return Response({'error': 'Authentication failed'}, status=400)

@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def sign_language_recognition(request):
    serializer = SignLanguageRecognitionSerializer(data=request.data)

    if serializer.is_valid():
        image = serializer.validated_data['image']
        save_history = serializer.validated_data['save_history']

        # Process the image
        service = SignLanguageRecognitionService()
        result = service.process_image(image.temporary_file_path())

        if 'error' in result:
            return Response({'error': result['error']}, status=status.HTTP_400_BAD_REQUEST)

        # Save to history if requested
        if save_history:
            RecognitionHistory.objects.create(
                user=request.user,
                recognition_type='sign_to_text',
                input_data=image,
                result_text=result['letter']
            )

        return Response(result, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Speech Recognition
@api_view(['POST'])
@permission_classes([permissions.IsAuthenticated])
@parser_classes([MultiPartParser, FormParser])
def speech_recognition(request):
    serializer = SpeechRecognitionSerializer(data=request.data)

    if serializer.is_valid():
        audio = serializer.validated_data['audio']
        save_history = serializer.validated_data['save_history']

        # Process the audio
        service = SpeechRecognitionService()
        result = service.process_audio(audio.temporary_file_path())

        if 'error' in result:
            return Response({'error': result['error']}, status=status.HTTP_400_BAD_REQUEST)

        # Save to history if requested
        if save_history:
            RecognitionHistory.objects.create(
                user=request.user,
                recognition_type='speech_to_text',
                input_data=audio,
                result_text=result['text']
            )

        return Response(result, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# WebSocket endpoint for real-time sign language recognition
# This will be implemented in a separate file for ASGI support
