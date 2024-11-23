from django.urls import path
from . import views

urlpatterns = [
    path("dataset/", views.DatasetListCreate.as_view(), name="dataset-list"),
    path("dataset/delete/<int:pk>/", views.DatasetDelete.as_view(), name="delete-dataset")
]