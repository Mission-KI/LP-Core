from django.urls import path
from .views import get_users, getMyUserInfo

urlpatterns = [

    path('', get_users, name='user.get_users'),
    path('get-my-info/', getMyUserInfo, name='user.getMyUserInfo'),

]