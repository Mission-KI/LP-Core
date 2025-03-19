from django.contrib import admin

from .models import Dataspace, User

admin.site.register(User)
admin.site.register(Dataspace)
