from .models import UserProfile

def create_user_profile(backend, user, response, *args, **kwargs):
    UserProfile.objects.get_or_create(user=user)