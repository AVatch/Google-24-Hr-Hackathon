from django.db import models
from django.contrib.auth.models import AbstractUser

class Player(AbstractUser):

	score 	= models.IntegerField(
		verbose_name = 'Score',
		default 	 = 0,
		blank 		 = False,
	)

	date_created = models.DateField(
		verbose_name = 'Date Created',
		auto_now_add = True,
	)
