from django.db import models
from django.contrib.auth.models import User

class Question(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author_question')
    subject = models.CharField(max_length=200) # 최대 200자 / 글자수 제한 O = CharField를 사용
    content = models.TextField() #  글자수 제한 X = TextField를 사용
    create_date = models.DateTimeField() # 날짜와 시간에 관계 = DateTimeField를 사용
    modify_date = models.DateTimeField(null=True, blank=True) # null=True, blank=True는 처음에 없어도 작성가능하게(수정날짜니까)
    voter = models.ManyToManyField(User, related_name='voter_question')  # 추천(좋아요), ManyToManyField 다대다(N:N)관계를 의미(한사람이 여러명, 여러명이 한사람 추천가능)

    def __str__(self): # shell에서 Question을 조회할때 id 값 대신 제목을 표시
        return self.subject

class Answer(models.Model):
    # ForeignKey는 다른 모델과 연결하기 위해 사용,
    # on_delete=models.CASCADE의 의미는 답변과 연결된 질문(Question)이 삭제되면, 답변(Answer)도 함께 삭제.
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author_answer')
    question = models.ForeignKey(Question, on_delete=models.CASCADE) 
    content = models.TextField()
    create_date = models.DateTimeField()
    modify_date = models.DateTimeField(null=True, blank=True)
    voter = models.ManyToManyField(User, related_name='voter_answer')

#-------------- 참고 -----------------
# models.URLField(blank=Ture) URL 불러올때
# modles.ImageField(blank=Ture) 이미지 불러올때
# CharField(choices=) 옵션을 선택하게 가능
# ManyToManyFieald로 다대다 기능

# class TimeStampedModel(models.Model):                    // 생성날짜, 수정날짜 (model안에있는 상속용 클래스)
#    created_at = models.DateTimeField(auto_now_add=True)  // auto_now_add는 처음실행할때 현재시간이 저장 되도록
#    updated_at = models.DateTimeField(auto_now=True)      // auto_now는 그뒤로 저장할때마다 현재시간이 저장 되도록
#    class meta :
#       abstract = True                          // 테이블만들때 상속용 클래스는 포함되지않도록