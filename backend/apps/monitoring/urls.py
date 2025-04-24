from django.urls import path

from . import views
from .views import EventLogListView, MonitoringAnalyticsView

urlpatterns = [
    path("analytics/", MonitoringAnalyticsView.as_view(), name="analytics"),
    path("logs/", EventLogListView.as_view(), name="logs"),
    path("log-edp-download/", views.log_edp_download, name="log_edp_download"),
]
