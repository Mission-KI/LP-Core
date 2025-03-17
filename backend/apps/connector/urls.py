from django.urls import path

from .views import EDPViewSet, RawZipUploadView, get_schema

urlpatterns = [
    path("edp/", EDPViewSet.as_view({"post": "create"}), name="edp-base"),
    path("edp/schema/", get_schema, name="edp-schema"),
    path("edp/<str:id>/<str:file_name>/", RawZipUploadView.as_view(), name="edp-raw-zip-upload"),
    path("edp/<str:id>/", EDPViewSet.as_view({"put": "upload", "delete": "delete"}), name="edp-detail"),
]
