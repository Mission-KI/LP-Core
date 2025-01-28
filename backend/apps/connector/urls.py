from django.urls import path

from .views import EDPView

urlpatterns = [
    path("create-edp/", EDPView.as_view(), name="create_edp"),
]
