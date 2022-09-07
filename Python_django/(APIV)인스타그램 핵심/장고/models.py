################## content모델 ##################

from django.db import models

class Feed(models.Model):
    content = models.TextField(null=True, blank=True)    # 글내용
    image = models.TextField(null=True, blank=True)      # 피드 이미지(ImageField를 사용해도 되지만 데이터가 쌓이면서 용량이 너무커짐 그래서 링크로 보여주는 방식이 나음)
    email = models.EmailField(default='')     # 글쓴이

class Like(models.Model):
    feed_id = models.IntegerField(default=0) # (정수형 숫자)
    email = models.EmailField(default='')
    is_like = models.BooleanField(default=True)

class Reply(models.Model):
    feed_id = models.IntegerField(default=0)
    email = models.EmailField(default='')
    reply_content = models.TextField() 

class BookMark(models.Model):
    feed_id = models.IntegerField(default=0)
    email = models.EmailField(default='')
    is_marked = models.BooleanField(default=True)

#################### user모델 ####################

from django.db import models
from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import UserManager

class User(AbstractBaseUser):
    """
        유저 프로파일 사진
        유저 닉네임 (화면표시되는 이름)
        유저 이름   (실제 사용자 이름)
        유저 이메일주소 (아이디)
        유저 비밀번호
    """
    profile_image = models.TextField() # 프로필 이미지 
    nickname = models.CharField(max_length=24, unique=True)  # unique는 모든 유저중에 유일해야함 (아이디이기떄문)
    name = models.CharField(max_length=24)
    email = models.EmailField(unique=True)

    USERNAME_FIELD= 'nickname'

    objects = UserManager()

    class Meta:
        db_table = "User"