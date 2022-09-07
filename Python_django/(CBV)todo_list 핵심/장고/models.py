from django.db import models
from django.contrib.auth.models import User

class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True) # User가 지워지면 같이 지워지게
    title = models.CharField(max_length=200)
    description = models.TextField(null=True, blank=True)
    complete = models.BooleanField(default=False)   # 체크박스 생성(체크가 안된상태로)
    create = models.DateTimeField(auto_now_add=True)    # 현재시간을 디폴트로 저장한 시간

    def __str__(self): # shell에서 Question을 조회할때 id 값 대신 제목을 표시
        return self.title

    class Meta:
        ordering = ['complete']