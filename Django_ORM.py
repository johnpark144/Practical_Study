############## ORM의 기본 ###################################################################################
>>> a = Article(title="hello2", author="me", email="vyckd354@gmail.com")
>>> a.save()
>>> Article.objects.all()
<QuerySet [<Article: Updated Article Title2>, <Article: updated>, <Article: postman updated>,
<Article: hhdfsh>, <Article: generic API View>, <Article: this is the newest updated>, <Article: hello2>]>

############### ORM -> SQL ##################################################################################
>>> queryset = Event.objects.all()
>>> str(queryset.query)
SELECT "events_event"."id", "events_event"."epic_id","events_event"."details", "events_event"."years_ago" FROM "events_event"

############### OR ###########################################################################################
>>> User.objects.filter(first_name__startswith='R') | User.objects.filter(last_name__startswith='D')
<QuerySet [<User: Ricky>, <User: Ritesh>, <User: Radha>, <User: Raghu>, <User: rishab>]>

############### AND(두쿼리 동일결과)##############################################################################
>>> queryset_1 = User.objects.filter(first_name__startswith='R',last_name__startswith='D')
>>> queryset_2 = User.objects.filter(first_name__startswith='R') & User.objects.filter(last_name__startswith='D')
<QuerySet [<User: Ricky>, <User: Ritesh>, <User: rishab>]>

############### NOT(exclude) ###################################################################################
>>> User.objects.exclude(id__lt=5)
<QuerySet [<User: Ritesh>, <User: Billy>, <User: Radha>, <User: sohan>, <User: Raghu>, <User: rishab>]>

############### union (결합) ###################################################################################
>>> q1 = User.objects.filter(id__gte=5)
>>> q2 = User.objects.filter(id__lte=9)
>>> q1.union(q2)
<QuerySet [<User: yash>, <User: John>, <User: Ricky>, <User: sharukh>, <User: Ritesh>,
<User: Billy>, <User: Radha>, <User: sohan>, <User: Raghu>, <User: rishab>]>

############### 특정 열만 조회 (두쿼리 동일결과) ###################################################################
>>> queryset1 =User.objects.filter(first_name__startswith='R').values('first_name', 'last_name')
>>> queryset2 = User.objects.filter(first_name__startswith='R').only("first_name", "last_name")
<QuerySet [{'first_name': 'Ricky', 'last_name': 'Dayal'}, {'first_name': 'Ritesh', 'last_name': 'Deshmukh'},
{'first_name': 'Radha', 'last_name': 'George'}, {'first_name': 'Raghu', 'last_name': 'Khan'}, {'first_name': 'Rishabh', 'last_name': 'Deol'}]

############### 서브쿼리 (쿼리안에 쿼리) ###########################################################################
>>> from django.db.models import Subquery
>>> users = User.objects.all()
>>> UserParent.objects.filter(user_id__in=Subquery(users.values('id')))
<QuerySet [<UserParent: UserParent object (2)>, <UserParent: UserParent object (5)>, <UserParent: UserParent object (8)>]>

############### 필드값끼리 비교 #####################################################################################
>>>User.objects.create_user(email="guido@example.com", username="Guido", first_name="Guido", last_name="Guido")
>>>User.objects.filter(last_name=F("first_name"))  # 'F'는 Field로써 저것은 Field에 first_name, 즉 last_name과 first_name이 같은것을 불러옴
<QuerySet [<User: Guido>]>

>>>User.objects.create_user(email="guido@example.com", username="Tim", first_name="Tim", last_name="Teters")
>>>User.objects.annotate(first=Substr("first_name", 1, 1), last=Substr("last_name", 1, 1)).filter(first=F("last")) # 이름의 첫 글자와 성의 첫 글자가 동일한 사용자
<QuerySet [<User: Guido>, <User: Tim>]>

############### 파일이나 이미지가 파일변수안에 들어있지 않은행 #########################################################
>>> MyModel.objects.filter(Q(file='')|Q(file=None))

############### N번째 항목 #########################################################################################
>>> user = User.objects.order_by('-last_login')[1]  # -는 역순(가장큰순서대로), [0]은 첫번째 [1]는 두번쨰...
>>> user.first_name
'Raghu'

############### 중복된 값 찾기 ######################################################################################
>>> duplicates = User.objects.values('first_name').annotate(name_count=Count('first_name')).filter(name_count__gt=1)    # 1개초과(중복)
>>> duplicates
<QuerySet [{'first_name': 'John', 'name_count': 3}]>    # 중복 값

>>> records = User.objects.filter(first_name__in=[item['first_name'] for item in duplicates])
>>> print([item.id for item in records])
[2, 11, 13] # 중복 값을가진 id

############### 고유한 값 찾기 #########################################################################################
>>> distinct = User.objects.values('first_name').annotate(name_count=Count('first_name')).filter(name_count=1)  # 1개(고유)
>>> distinct
<QuerySet [{'first_name': 'Yash', 'name_count': 1},...]> 
>>> records = User.objects.filter(first_name__in=[item['first_name'] for item in distinct])
[1, 3,4,5,6,7, ...]

############### 집계 구하기 ################################################################################################
>>> from django.db.models import Avg, Max, Min, Sum, Count
>>> User.objects.all().aggregate(Avg('id'))
{'id__avg': 7.571428571428571}

>>> User.objects.all().aggregate(Max('id'))
{'id__max': 15}

>>> User.objects.all().aggregate(Min('id'))
{'id__min': 1}

>>> User.objects.all().aggregate(Sum('id'))
{'id__sum': 106}

############### 랜덤으로 정렬 ###############################################################################################
>>> Category.objects.order_by("?").first()

############### 여러행 한번에 생성 #########################################################################################
>>> Category.objects.bulk_create([Category(name="God"),Category(name="Demi God"),Category(name="Mortal")])
[<Category: God>, <Category: Demi God>, <Category: Mortal>]

############### 카운트 ####################################################################################################
>>> Category.objects.all().count()
5

############### 대소문자 구분없이 정렬 #######################################################################################
>>> from django.db.models.functions import Lower
>>> User.objects.all().order_by(Lower('username')).values_list('username', flat=True)
<QuerySet ['Billy', 'John', 'johny', 'johny1', 'paul', 'Radha', 'Raghu', 'Ricky', 'rishab', 'Ritesh', 'sharukh', 'sohan', 'yash']>

############### 외래 키로 연결된 표의 열을 기준으로 정렬 ######################################################################
class Category(models.Model):
    name = models.CharField(max_length=100)

class Hero(models.Model):
    # ...
    name = models.CharField(max_length=100)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

>>> Hero.objects.all().order_by('category__name', 'name')   # category의name 대로 하되 같은게 있으면 그중에서 Hero의 name대로

############### 일대일 OneToOneField (unique=True 관계, 유저와 프로필관계) ####################################################
from django.contrib.auth.models import User
class UserParent(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    father_name = models.CharField(max_length=100)
    mother_name = models.CharField(max_length=100)

>>> u1 = User.objects.get(first_name='Ritesh', last_name='Deshmukh')
>>> p1 = UserParent(user=u1, father_name='Vilasrao Deshmukh', mother_name='Vaishali Deshmukh')
>>> p1.save()
>>> p1.user.first_name
'Ritesh'
>>> u1.delete()  # User 모델의 항목(u1) 뿐 아니라 UserParent 의 항목(p1)도 함께 삭제

############### 일대다 ForeignKey (글과 답변관계) ###########################################################################
class Article(models.Model):
    headline = models.CharField(max_length=100)
    pub_date = models.DateField()
    reporter = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reporter')
    def __str__(self):
        return self.headline
    class Meta:
        ordering = ('headline',)

>>> from datetime import date
>>> u1 = User(username='johny1', first_name='Johny', last_name='Smith', email='johny@example.com')
>>> u1.save()
>>> a1 = Article(headline="This is a test", pub_date=date(2018, 3, 6), reporter=u1)
>>> a1.save()
>>> a1.reporter.id
13
>>> a1.reporter
<User: johny1>

############### 다대다 ManyToManyField (팔로우, 좋아요, 친구추가) ########################################################
class User(AbstractUser):
    tweet = models.ManyToManyField(Tweet, blank=True)
    follower = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True)
    pass
class Tweet(models.Model):
    tweet = models.TextField()
    favorite = models.ManyToManyField(settings.AUTH_USER_MODEL, blank=True, related_name='user_favorite')

>>> t1 = Tweet(tweet="I am happy today") # t는 게시글
>>> t1.save()
>>> ...
>>> u1 = User(username='johny1', first_name='Johny', last_name='Smith', email='johny@example.com')  # u는 유저
>>> u1.save()
>>> ...

>>> u2.tweet.add(t1)    # 트윗
>>> u2.save()
>>> u2.tweet.add(t2)    
>>> u2.save()

>>> u2.follow.add(u1)   # 팔로우, 친구추가
>>> u2.save()

>>> t1.favorite.add(u1) # 좋아요
>>> t1.save()
>>> t1.favorite.add(u3)
>>> t1.save()

>>> t1.favorite.remove(u1) # 좋아요취소
>>> t1.save()

############### 빈칸 허용 ###################################################################################################
>>> epic = models.ForeignKey(null=True, blank=True) # BooleanField는 null=True 대신 NullBooleanField를 사용

############### PK를 ID 대신 UUID로 #########################################################################################
import uuid
from django.db import models
class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    details = models.TextField()
    years_ago = models.PositiveIntegerField()

>>> eventobject = Event.objects.all()
>>> eventobject.first().id
'3cd2b4b0c36f43488a93b3bb72029f46'
