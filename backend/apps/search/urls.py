from django.urls import path

from . import views

urlpatterns = [
    path("_search", views.search, name="search"),
    path("_doc/<str:uuid>", views.find, name="find"),
    path("_count", views.count, name="count"),
    path("find_resource_id", views.find_resource_id, name="find_resource_id"),
]
