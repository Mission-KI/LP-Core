from django.urls import path
from . import views

urlpatterns = [
    path("create-edp/", views.create_edp, name="create_edp"),
]
