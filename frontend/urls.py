from django.urls import path
from .views import index
from .views import index_no_login

urlpatterns = [
    path('', index_no_login),
    path('home/', index),
]