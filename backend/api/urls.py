from django.urls import path
from . import views

urlpatterns = [
    path("datasets/", views.DatasetListCreate.as_view(), name="dataset-list"),
    path("datasets/delete/<int:pk>/", views.DatasetDelete.as_view(), name="delete-dataset")
]