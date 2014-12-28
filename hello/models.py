from django.db import models

# Create your models here.
class Greeting(models.Model):
    when = models.DateTimeField('date created', auto_now_add=True)

class Page(models.Model):
	creation_time = models.DateTimeField('date time created', auto_now_add=True)
	title = models.TextField()