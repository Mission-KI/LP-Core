from apps.user.models import User
from django.core.exceptions import ValidationError

def register_user(data):
    email = data.get('email')
    password = data.get('password')
    name = data.get('name', '')

    if not email or not password or not email:
        raise ValidationError("email, password, and email are required.")

    user = User.objects.create_user(
        email=email,
        password=password,
        name=name,
    )
    return user