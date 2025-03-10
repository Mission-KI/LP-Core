from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularJSONAPIView,
    SpectacularRedocView,
    SpectacularSwaggerView,
    SpectacularYAMLAPIView,
)

urlpatterns = [
    path("admin/", admin.site.urls),
    path("connector/", include("apps.connector.urls")),
    path("monitoring/", include("apps.monitoring.urls")),
    path("auth/", include("apps.authentication.urls")),
    path("search/", include("apps.search.urls")),
    path("schema.yaml", SpectacularYAMLAPIView.as_view(), name="schema-yaml"),
    path("schema.json", SpectacularJSONAPIView.as_view(), name="schema-json"),
    path("schema/", SpectacularAPIView.as_view(), name="schema"),
    path("docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("redoc/", SpectacularRedocView.as_view(url_name="schema"), name="redoc"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
