from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, DatabaseSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Database


class DatabaseListCreate(generics.ListCreateAPIView):
    serializer_class = DatabaseSerializer
    permission_classes  = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Database.objects.filter(owner=user)
    
    def perform_create(self, serializer):
        pass


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


