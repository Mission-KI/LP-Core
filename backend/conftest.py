import pytest
from django.conf import settings
from django.core.management.utils import get_random_secret_key


@pytest.fixture(scope="session", autouse=True)
def settings_py():
    settings.SECRET_KEY = get_random_secret_key()
