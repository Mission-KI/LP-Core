from django.urls import path

from .views import EDPUploadDeleteView, RawZipUploadView, create_resource_id, get_schema

urlpatterns = [
    path("edp/", create_resource_id, name="edp-base"),
    path("edp/schema/", get_schema, name="edp-schema"),
    path("edp/<str:id>/<str:file_name>/", RawZipUploadView.as_view(), name="edp-raw-zip-upload"),
    path("edp/<str:id>/", EDPUploadDeleteView.as_view(), name="edp-detail"),
]
