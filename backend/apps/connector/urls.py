from django.urls import path

from .views import EDPViewSet, get_schema

urlpatterns = [
    path(
        "edp/",
        EDPViewSet.as_view({"post": "create"}),
        name="edp-base",
    ),
    path("edp/schema/", get_schema, name="edp-schema"),
    path(
        "edp/<str:id>/",
        EDPViewSet.as_view({"put": "upload", "delete": "delete"}),
        name="edp-detail",
    ),
]
