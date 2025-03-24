from django.contrib import admin
from django.forms import PasswordInput

from .models import Dataspace, User


class CustomUserAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {"fields": ("username", "password")}),
        (
            "Personal info",
            {"fields": ("first_name", "last_name", "email", "dataspace")},
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                    "is_monitoring_user",
                    "is_connector_user",
                    "groups",
                    "user_permissions",
                ),
            },
        ),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )
    formfield_overrides = {
        "password": {"widget": PasswordInput(render_value=True)},
    }

    def save_model(self, request, obj, form, change):
        password = form.cleaned_data.get("password")
        if password:
            obj.set_password(password)
        super().save_model(request, obj, form, change)


admin.site.register(User, CustomUserAdmin)
admin.site.register(Dataspace)
