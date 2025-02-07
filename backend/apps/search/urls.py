from django.urls import path

from . import views

urlpatterns = [
    path("_search", views.search, name="search"),
    path("_doc/<str:uuid>", views.find, name="find"),
    path("_count", views.count, name="count"),
]
