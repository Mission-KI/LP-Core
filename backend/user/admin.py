# accounts/admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.utils.translation import gettext_lazy as _

from .models import Dataspace, User


class DataspaceAdmin(admin.ModelAdmin):
    """
    Admin configuration for Dataspace model
    """

    list_display = ("name",)
    search_fields = ("name",)


class CustomUserAdmin(UserAdmin):
    """
    Custom Admin configuration for the User model
    """

    # Customize list display to include new fields
    list_display = (
        "username",
        "email",
        "first_name",
        "last_name",
        "is_staff",
        "is_monitoring_user",
        "is_connector_user",
        "dataspace",
    )

    # Customize list filter to include new fields
    list_filter = ("is_staff", "is_active", "is_superuser", "is_monitoring_user", "is_connector_user", "dataspace")

    # Customize fieldsets to include custom fields
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (
            _("Personal info"),
            {"fields": ("first_name", "last_name", "email", "dataspace", "is_monitoring_user", "is_connector_user")},
        ),
        (_("Permissions"), {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        (_("Important dates"), {"fields": ("last_login", "date_joined")}),
    )

    # Customize add_fieldsets for user creation
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "username",
                    "email",
                    "password1",
                    "password2",
                    "dataspace",
                    "is_monitoring_user",
                    "is_connector_user",
                ),
            },
        ),
    )


# Register the admin models
admin.site.register(User, CustomUserAdmin)
admin.site.register(Dataspace, DataspaceAdmin)
