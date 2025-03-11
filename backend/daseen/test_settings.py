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

ELASTICSEARCH_URL = "https://fake-server.beebucket.de/edp-data"
ELASTICSEARCH_API_KEY = "dummy"
S3_ACCESS_KEY_ID = "dummy-key-id"
S3_SECRET_ACCESS_KEY = "dummy-key"  # noqa: S105
S3_BUCKET_NAME = "dummy-bucket"
