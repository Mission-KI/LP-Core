# admin.py
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import User

from .models import Dataspace, UserProfile


class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = "Profile"


class UserAdmin(BaseUserAdmin):
    inlines = (UserProfileInline,)
    list_display = (
        "username",
        "email",
        "first_name",
        "last_name",
        "get_dataspaces",
        "is_monitoring_user",
        "is_connector_user",
        "is_staff",
    )

    def get_dataspaces(self, obj):
        return obj.profile.dataspaces

    get_dataspaces.short_description = "Dataspaces"

    def is_monitoring_user(self, obj):
        return obj.profile.is_monitoring_user

    is_monitoring_user.boolean = True

    def is_connector_user(self, obj):
        return obj.profile.is_connector_user

    is_connector_user.boolean = True


admin.site.unregister(User)
admin.site.register(User, UserAdmin)
admin.site.register(Dataspace)
