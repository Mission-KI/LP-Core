from django.urls import path

from .views import EDPViewSet

urlpatterns = [
    path(
        "edp/",
        EDPViewSet.as_view({"post": "create"}),
        name="edp-base",
    ),
    path(
        "edp/<str:id>/",
        EDPViewSet.as_view({"put": "upload", "delete": "delete"}),
        name="edp-detail",
    ),
]
