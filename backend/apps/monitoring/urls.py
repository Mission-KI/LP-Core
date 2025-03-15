from django.urls import path

from . import views
from .views import MonitoringAnalyticsView

urlpatterns = [
    path('monitoring-analytics/', MonitoringAnalyticsView.as_view(), name='monitoring-analytics'),
    path("log-edp-download/", views.log_edp_download, name="log_edp_download"),
]
