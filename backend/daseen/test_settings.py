from django.core.management.utils import get_random_secret_key

from daseen.settings import *  # noqa: F403

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": ":memory:",  # Use in-memory SQLite database
    }
}

# Speed up tests by disabling migrations (if appropriate)
MIGRATION_MODULES = {}

SECRET_KEY = get_random_secret_key()
