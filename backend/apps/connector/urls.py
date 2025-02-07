from django.urls import path

from .views import EDPViewSet

urlpatterns = [
    path(
        "edp/",
        EDPViewSet.as_view(
            {
                # "get": "list",
                "post": "create"
            }
        ),
        name="edp-base",
    ),
    path(
        "edp/<int:id>/",
        EDPViewSet.as_view(
            {
                # "get": "retrieve",
                "put": "update",
                "delete": "delete",
            }
        ),
        name="edp-detail",
    ),
]
