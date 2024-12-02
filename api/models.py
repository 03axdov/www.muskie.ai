from django.db import models
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.db.models.signals import post_save, post_delete


class Profile(models.Model):    # Extends default User class
    user = models.OneToOneField(User, primary_key=True, verbose_name='user', related_name='profile', on_delete=models.CASCADE)
    name = models.CharField(max_length=30, blank=True, null=True, unique=True)
    
    def __str__(self):
        return self.name
    
@receiver(post_save, sender=User)
def create_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance, name=instance.username)

@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    instance.profile.save()
    
    
# DATASETS

class Dataset(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="datasets")
    image = models.ImageField(upload_to='images/', null=True)
    
    VISIBILITY_CHOICES = [
        ("private", "Private"),
        ("public", "Public")
    ]
    visibility = models.CharField(max_length=10, choices=VISIBILITY_CHOICES, default="private")
    
    DATATYPE_CHOICES = [
        ("image", "Image"),
        ("text", "Text")
    ]
    datatype = models.CharField(max_length=10, choices=DATATYPE_CHOICES, default="image")
    
    def __str__(self):
        return self.name


# ELEMENTS
# Datasets contain elements, which can be e.g. files

class Element(models.Model):
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE, related_name="elements", null=True)
    name = models.CharField(max_length=100)
    
    def __str__(self):
        return self.name
    

class ImageElement(Element):
    image = models.ImageField(upload_to="images/")
    
    
class TextElement(Element):
    text = models.FileField(upload_to="documents/")
    
    
@receiver(post_save, sender=Element)
@receiver(post_delete, sender=Element)
def update_element_count(sender, instance, **kwargs):
    dataset = instance.dataset
    dataset.element_count = dataset.elements.count()
    dataset.save()
    
# LABELS
# Elements in datasets, such as files, are given labels
    
class Label(models.Model):
    element = models.ForeignKey(Element, on_delete=models.SET_NULL, related_name="labels", blank=True, null=True)
    dataset = models.ForeignKey(Dataset, on_delete=models.CASCADE, related_name="labels", null=True)
    name = models.CharField(max_length=200)
        
    def __str__(self):
        return self.name
    
    
class ClassificationLabel(Label):
    pass