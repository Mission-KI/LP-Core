from django.urls import path

from . import views

urlpatterns = [
    path("log-edp-download/", views.log_edp_download, name="log_edp_download"),
]
