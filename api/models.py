from django.db import models
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.db.models.signals import post_save


class Profile(models.Model):    # Extends default User class
    user = models.OneToOneField(User, primary_key=True, verbose_name='user', related_name='profile', on_delete=models.CASCADE)
    name = models.CharField(max_length=30, blank=True, null=True, unique=True)
    
    def __str__(self):
        return self.name
    
@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        UserProfile.objects.create(user=instance, name=instance.username)

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()
    
    
# Datasets

class Dataset(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="datasets")
    
    def __str__(self):
        return self.name
    
    
    
# Datasets contain elements, which can be e.g. files

class Element(models.Model):
    pass
    
    
    
# Elements in datasets, such as files, are given labels
    
class AbstractLabel(models.Model):
    element = models.OneToOneField(Element, on_delete=models.CASCADE, related_name="label")
      
    class Meta:
        abstract = True
    
    
class ClassificationLabel(AbstractLabel):
    name = models.CharField(max_length=200)