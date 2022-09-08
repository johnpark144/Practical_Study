####### URL과 뷰 ######################################################################
# python -m venv mysite // 가상환경 (Scripts -> activate)
# django-admin startproject mysite
# django-admin startapp pybo 
# py manage.py runserver

# from django.http import HttpResponse
# def index(request):
#    return HttpResponse("하이") 

######## 모델 ##################### Models에 테이블 생성하기위해 작성 ######################
# class Question(models.Model):
#     subject = models.CharField(max_length=200) # 최대 200자
#     content = models.TextField() # 글자수 제한 X 
#     create_date = models.DateTimeField() # 날짜와 시간

#     def __str__(self): # shell에서 id 값 대신 제목을 표시
#         return self.subject

# class Answer(models.Model):
#     question = models.ForeignKey(Question, on_delete=models.CASCADE)  # ForeignKey는 다른 모델과 연결
#     content = models.TextField()
#     create_date = models.DateTimeField()

#-------------- 참고 -----------------

# CharField	    제한된 문자열 필드 타입. 최대 길이를 max_length 옵션에 지정해야 한다. 문자열의 특별한 용도에 따라 CharField의 파생클래스로서, 이메일 주소를 체크를 하는 EmailField, IP 주소를 체크를 하는 GenericIPAddressField, 콤마로 정수를 분리한 CommaSeparatedIntegerField, 특정 폴더의 파일 패스를 표현하는 FilePathField, URL을 표현하는 URLField 등이 있다.
# TextField 	대용량 문자열을 갖는 필드
# IntegerField	32 비트 정수형 필드. 정수 사이즈에 따라 BigIntegerField, SmallIntegerField 을 사용할 수도 있다.
# BooleanField	true/false 필드. Null 을 허용하기 위해서는 NullBooleanField를 사용한다.
# DateTimeField	날짜와 시간을 갖는 필드. 날짜만 가질 경우는 DateField, 시간만 가질 경우는 TimeField를 사용한다.
# DecimalField	소숫점을 갖는 decimal 필드
# BinaryField	바이너리 데이타를 저장하는 필드
# FileField	파일 업로드 필드
# ImageField	 FileField의 파생클래스로서 이미지 파일인지 체크한다.
# UUIDField	GUID (UUID)를 저장하는 필드
# ManyToManyFieald로 다대다 기능
# URLField       URL 불러올때

# CharField(choices=) 옵션을 선택하게 가능

# class TimeStampedModel(models.Model):                    // 생성날짜, 수정날짜 (model안에있는 상속용 클래스)
#    created_at = models.DateTimeField(auto_now_add=True)  // auto_now_add는 처음실행할때 현재시간이 저장 되도록
#    updated_at = models.DateTimeField(auto_now=True)      // auto_now는 그뒤로 저장할때마다 현재시간이 저장 되도록
#    class meta :
#       abstract = True                          // 테이블만들때 상속용 클래스는 포함되지않도록

############################################### 앱연결 및 Migrate ##########################

# INSTALLED_APPS = [ 'pybo.apps.PyboConfig',]  // Settings

# python manage.py makemigrations
# python manage.py migrate

############################################# Shell에서 Model사용 하기 #########################
# python manage.py shell

# from django.utils import timezone
# q = Question(subject='pybo가 무엇인가요?', content='pybo에 대해서 알고 싶습니다.', create_date=timezone.now())
# q.save()
# q.id
# Question.objects.all()

# a = Answer(question=q, content='네 자동으로 생성됩니다.', create_date=timezone.now()) // q를 question에 넣어주고 컨텐츠작성
# a.save()

# def __str__(self): // models.py
#      return self.subject  
####### 장고 관리자 ###############################################################################

# python manage.py createsuperuser

# from .models import Question  // admin.py
# class QuestionAdmin(admin.ModelAdmin):
#     search_fields = ['subject']   // 관리자 페이지에서 'sbject' 검색기능

# admin.site.register(Question, QuestionAdmin) // Question , subject으로 질문검색기능 을 관리자페이지에 띄워줌

##### 조회와 템플릿, URL 별칭 #################### 저장된 정보(질문)가 Views에 입력, 템플릿에 Render ###############
# 'DIRS': [BASE_DIR / 'templates'], // Settings (템플릿 폴더 위치)

# from django.shortcuts import render   // views.py
# from .models import Question
# def index(request):    
#     question_list = Question.objects.order_by('-create_date')     // 작성일시 역순(최신순)으로 정렬 (-기호가 역방향)
#     context = {'question_list': question_list}  
#     return render(request, 'pybo/question_list.html', context)

######################################################################### 템플릿 양식과 Render된 정보 ##############

# {% if question_list %}
#     <ul>
#     {% for question in question_list %} 
#         <p>순서: {{ forloop.counter }} </p>   // for문 돈 순서
#         <li><a href="/pybo/{{ question.id }}/">{{ question.subject }}</a></li>
#         <li><a href="{% url 'pybo:detail' question.id %}">{{ question.subject }}</a></li> // 위에것과 같지만 app이름과 URL별칭을 이용
#     {% endfor %}
#     </ul>
# {% else %}
#     <p>질문이 없습니다.</p>
# {% endif %}

######################################################## id값에 따라 url이 바뀌는 그 정보의 url을 views와 연결 #####(제네릭뷰알아둘것)#####
# app_name = 'pybo' // url.py/ 앱 이름 지정
# urlpatterns = [
#     path('', views.index, name='index'),  // URL별칭 지정
#     path('<int:question_id>/', views.detail, name='detail'),  //  id값에 따라 url이 바뀌고 views에도 question_id가 전달됨
# ]

# from django.shortcuts import get_object_or_404  // views.py
# def detail(request, question_id):      // URL 매핑시 저장된 question_id가 전달
#     question = get_object_or_404(Question, pk=question_id)  // Primary Key에 question_id를 입력 없으면 에러
#     context = {'question': question}
#     return render(request, 'pybo/question_detail.html', context)

######## 데이터 저장 ############################################# POST방식으로 데이터를 전달 #############################

# <h1>{{ question.subject }}</h1>   // question_detail.htm
# <div>
#     {{ question.content }}
# </div>
# <form action="{% url 'pybo:answer_create' question.id %}" method="post">
# {% csrf_token %}
# <textarea name="content" id="content" rows="15"></textarea>   # post는 name값을가진 컨텐츠를 전달하여 
# <input type="submit" value="답변등록">
# </form>

#-------------- 참고 ----------------
# <form id="form-id" method="post"...>
# <a href="#" onclick="document.forms['form-id'].submit();">send</a>    // href 로 post 하기

############################################################## 그 정보의 url을 views와 연결시키고, answer 정보를 저장 ################
# path('answer/create/<int:question_id>/', views.answer_create, name='answer_create'),  // urls.py

# from django.shortcuts import redirect // views.py
# from django.utils import timezone
# def answer_create(request, question_id):
#     question = get_object_or_404(Question, pk=question_id)    // 입력 받은 question_id를 models의 Question에 대입하여 question을 찾아냄
#     question.answer_set.create(content=request.POST.get('content'), create_date=timezone.now()) // 템플릿의 content를 question.asnswer_set.create 를 사용하여 답변등록, Question과 Answer 모델은  ForeignKey로 연결되어 있어서 이처럼 사용
#     return redirect('pybo:detail', question_id=question.id)

#--------------참고--------------------
# from .models import Question, Answer // views.py,  위에것과 동일한 결과
# def answer_create(request, question_id):
#     question = get_object_or_404(Question, pk=question_id)
#     answer = Answer(question=question, content=request.POST.get('content'), create_date=timezone.now())
#     answer.save()
#     return redirect('pybo:detail', question_id=question.id)   // 별칭을 이용한 URL은 question_id가 필요하므로 question.id를 인수로 전달

##################################################################### 탬플릿에 답변부분 생성 #########################
# <h5>{{ question.answer_set.count }}개의 답변이 있습니다.</h5>
# <div>
#     <ul>
#     {% for answer in question.answer_set.all %}
#         <li>{{ answer.content }}</li>
#     {% endfor %}
#     </ul>
# </div>

###### 스태틱, 부트스트랩 ######################################################################################

# STATICFILES_DIRS = [BASE_DIR / 'static',]   // Settings, STATICFILES_DIRS(기본폴더)

# {% load static %}
# <link rel="stylesheet" type="text/css" href="{% static 'style.css' %}">

# {% load static %}
# <link rel="stylesheet" type="text/css" href="{% static 'bootstrap.min.css' %}">

####### 템플릿 상속 ##########################################################################################

# <body>    // 기본 HTML 형식에 있는 바디 태그
# <!-- 기본 템플릿 안에 삽입될 내용 Start -->
# {% block content %}
# {% endblock %}
# <!-- 기본 템플릿 안에 삽입될 내용 End -->
# </body>


# {% extends 'base.html' %}
# {% block content %}
# (... 내용생략 ...)
# {% endblock %}

######## 폼 (수동폼은 점프투장고 사이트에서)################### forms 폴더를 만들어서 사용할 form의 models들을 불러옴 #####################

# <a href="{% url 'pybo:question_create' %}" class="btn btn-primary">질문 등록하기</a>

# path('question/create/', views.question_create, name='question_create'), // url.py

# from django import forms  // forms.py
# from pybo.models import Question
# class QuestionForm(forms.ModelForm):  // 모델에 있는폼으로 폼을사용하겠다 지정
#     class Meta:
#         model = Question  // 사용할 모델
#         fields = ['subject', 'content']  // QuestionForm에서 사용할 Question 모델의 속성

# widgets = {       // form형식에 속성 적용 하기위해
#             'subject': forms.TextInput(attrs={'class': 'form-control'}),
#             'content': forms.Textarea(attrs={'class': 'form-control', 'rows': 10}),
#         }
# labels = {    // 레이블 바꾸기
#             'subject': '제목',
#             'content': '내용',
#         } 

##################################################### views파일에 form을저장하여 render해줌 ##############
# from .forms import QuestionForm   // views.py
# def question_create(request):
#     if request.method == 'POST': 
#         form = QuestionForm(request.POST) // 탬플릿에서 post형식으로 전달되어 인수생성됨
#         if form.is_valid():
#             question = form.save(commit=False)    // 임시 저장
#             question.create_date = timezone.now()
#             question.save() 
#             return redirect('pybo:index')
#     else: 
#         form = QuestionForm()
#     context = {'form': form}
#     return render(request, 'pybo/question_form.html', context)
########################################################## 템플릿 파일에 폼형식 사용 #########################

# {% extends 'base.html' %}
# {% block content %}
# <div class="container">
#     <h5 class="my-3 border-bottom pb-2">질문등록</h5>
#     <form method="post">  // action값이 없으면 default값인 views의 question_create함수로감
#         {% csrf_token %}
#         {{ form.as_p }}   // model에 사용할모델(Question)의 폼을 p태그에 씌어 자동으로 만듬 (form에 models의 Question클래스와 'subject', 'content'의 속성이 있음)
#         <button type="submit" class="btn btn-primary">저장하기</button>
#     </form>
# </div>
# {% endblock %}

# ------------ 참고 -----------
#         {{ form }} // 이것만 사용하면 폼들 사이에 p태그없이 생성

#   {% for field in form %}     // 하나하나 소환하며 폼 생성
#       <div class="fieldwrapper">
#           {{ field.errors }}
#           {{ field.label_tag }}{{ field }}
#       </div>
#    {% endfor %}

##### 페이징 ################################################################################################

# from django.core.paginator import Paginator   // views.py
# def index(request):
#     page = request.GET.get('page', '1')  // 페이지 처음들어올때 디폴트값 1
#     question_list = Question.objects.order_by('-create_date')
#     paginator = Paginator(question_list, 10)  // 10개씩 보여주기
#     page_obj = paginator.get_page(page) // 해당 페이지의 정보 
#     context = {'question_list': page_obj}
#     return render(request, 'pybo/question_list.html', context)

######################################################################## 페이징처리 템플릿 #################
# <!-- 페이징처리 시작 -->
#     <ul class="pagination justify-content-center">
#         <!-- 이전페이지 -->
#         {% if question_list.has_previous %}   // 이전 페이지가 있으면
#         <li class="page-item">
#             <a class="page-link" href="?page={{ question_list.previous_page_number }}">이전</a> // 이전 링크 활성화
#         </li>
#         {% else %}    // 이전 페이지가 없으면
#         <li class="page-item disabled">
#             <a class="page-link" tabindex="-1" aria-disabled="true" href="#">이전</a> // 이전 링크 비활성화
#         </li>
#         {% endif %}
#         <!-- 페이지리스트 -->
#         {% for page_number in question_list.paginator.page_range %}
#         {% if page_number >= question_list.number|add:-5 and page_number <= question_list.number|add:5 %} // 현재페이지 기준으로 이전 5페이지, 다음 5페이지만 보여줌
#         {% if page_number == question_list.number %}      // 페이지의 한 부분이 현재 페이지와 일치하면
#         <li class="page-item active" aria-current="page"> // active 시켜 강조되게 보임
#             <a class="page-link" href="?page={{ page_number }}">{{ page_number }}</a>
#         </li>
#         {% else %}    // 나머지 일치하지 않은 부분은
#         <li class="page-item"> // 일반적으로 표시
#             <a class="page-link" href="?page={{ page_number }}">{{ page_number }}</a>
#         </li>
#         {% endif %}
#         {% endif %}
#         {% endfor %}
#         <!-- 다음페이지 -->
#         {% if question_list.has_next %}  // 다음 페이지가 있으면
#         <li class="page-item">
#             <a class="page-link" href="?page={{ question_list.next_page_number }}">다음</a>   // 다음 링크 활성화
#         </li>
#         {% else %}    // 다음 페이지가 없으면
#         <li class="page-item disabled">
#             <a class="page-link" tabindex="-1" aria-disabled="true" href="#">다음</a> // 다음 링크 비활성화
#         </li>
#         {% endif %}
#     </ul>
#     <!-- 페이징처리 끝 -->
###### 템플릿필터 #########################################################################################
# (mysite) c:\projects\mysite\pybo>mkdir templatetags // 템플릿필더를 위한 폴더위치

# from django import template   // templatetags폴더에 pybo_filter.py
# register = template.Library()
# @register.filter
# def sub(value, arg):  // 내장되있지 않은 필터를 만듬
#     return value - arg

################################################################### 템플릿필터 사용 #########################
# {% extends 'base.html' %}     // question_list.html
# {% load pybo_filter %}    // 템플릿필터와 연결
# {% block content %}

# <td>  // 번호테이블
#     <!-- 번호 = 전체건수 - 시작인덱스 - 현재인덱스 + 1 -->
#     {{ question_list.paginator.count|sub:question_list.start_index|sub:forloop.counter0|add:1 }}
# </td>
#### 답변 개수 표시 ##########################################################################################
# <td>
#     <a href="{% url 'pybo:detail' question.id %}">{{ question.subject }}</a>
#     {% if question.answer_set.count > 0 %}    // 답변이 한개라도 있다면
#     <span class="text-danger small mx-2">{{ question.answer_set.count }}</span>   // 카운트해서 제목옆에 붙임
#     {% endif %}
# </td>
###### 로그인과 로그아웃 ######################### 네비바에 로그인, 로그아웃을 auth앱 view와연결 ################
# // (구현하기전에 common 앱을 미리 만들기)

# <li class="nav-item">     // navbar.html
    # {% if user.is_authenticated %}  // 현재 로그인 되어있다면
    # <a class="nav-link" href="{% url 'common:logout' %}">{{ user.username }} (로그아웃)</a>
    # {% else %}
    # <a class="nav-link" href="{% url 'common:login' %}">로그인</a>
    # {% endif %}
# </li>

# from django.urls import path  // common/urls.py
# from django.contrib.auth import views as auth_views
# app_name = 'common'
# urlpatterns = [
#     path('login/', auth_views.LoginView.as_view(template_name='common/login.html'), name='login'),
#     path('logout/', auth_views.LogoutView.as_view(), name='logout'),
# ]     // 로그인과 로그아웃 뷰는 따로 만들 필요없이 장고에 내장되있는 django.contrib.auth 앱의 클래스 view를 사용

############################################################# 로그인 템플릿 ################
# {% extends "base.html" %}
# {% block content %}
# <div class="container my-3">
#     <form method="post" action="{% url 'common:login' %}">
#         {% csrf_token %}
#         {% include "form_errors.html" %}  // 오류출력 하기위한 템플릿과 연결
#         <div class="mb-3">
#             <label for="username">사용자ID</label>
#             <input type="text" class="form-control" name="username" id="username"
#                    value="{{ form.username.value|default_if_none:'' }}">  // 값이 없을때 none이라고 표시된것을 방지하고 대신 빈칸을 줌
#         </div>
#         <div class="mb-3">
#             <label for="password">비밀번호</label>
#             <input type="password" class="form-control" name="password" id="password"
#                    value="{{ form.password.value|default_if_none:'' }}">
#         </div>
#         <button type="submit" class="btn btn-primary">로그인</button>
#     </form>
# </div>
# {% endblock %}
####################################### {% include "form_errors.html" %}을 위한 오류출력 템플릿 ########
# <!-- 필드 오류와 넌필드 오류를 출력한다. -->
# {% if form.errors %}
# <div class="alert alert-danger">
#     {% for field in form %}
#     <!-- 필드 오류 -->
#     {% if field.errors %} // 에러가 필드 에러라면
#     <div>
#         <strong>{{ field.label }}</strong>    // 에러있는 라벨
#         {{ field.errors }}    // 에러 종류
#     </div>
#     {% endif %}
#     {% endfor %}
#     <!-- 넌필드 오류 -->
#     {% for error in form.non_field_errors %}  // 에러가 넌필드 에러라면
#     <div>
#         <strong>{{ error }}</strong>  // 에러 종류
#     </div>
#     {% endfor %}
# </div>
# {% endif %}
############################################################### 로그인후 home으로 ######################
# 로그인 성공후 이동하는 URL    // settings.py
# LOGIN_REDIRECT_URL = '/'
# 로그아웃시 이동하는 URL
# LOGOUT_REDIRECT_URL = '/'

# from pybo import views    // config/urls.py
# path('', views.index, name='index'),  # '/' 에 해당되는 path  //  home 표시

###### 회원가입 ##############################################################################################
# <li>  // navbar.html (로그인 li 바로 및)
#     {% if not user.is_authenticated %}
#     <a class="nav-link" href="{% url 'common:signup' %}">회원가입</a>
#     {% endif %}
# </li>

# from . import views   // common/urls.py
# path('signup/', views.signup, name='signup'),

################################################################### 회원가입시 사용할 forms ###################
# from django import forms  // common/forms.py
# from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth.models import User
# class UserForm(UserCreationForm):     // 내장되있는 UserCreationForm 클래스를 상속(이메일을 위해)
#     email = forms.EmailField(label="이메일")
#     class Meta:
#         model = User
#         fields = ("username", "password1", "password2", "email")

#---------------참고------------------
# from django import forms

# class NameForm(forms.Form):   // 이렇게 따로 만들수도있음
#     your_name = forms.CharField(label='your name', max_length=7)
# class ContactForm(forms.Form):
#     subject = forms.CharField(max_length=100)
#     message = forms.CharField(widget=forms.Textarea)
#     sender = forms.EmailField()
#     cc_myself = forms.BooleanField(required=False)

############################################################ 회원가입 템플릿과 연결하기 위한 views #############
# from django.contrib.auth import authenticate, login   // common/views.py
# from django.shortcuts import render, redirect
# from common.forms import UserForm
# def signup(request):
#     if request.method == "POST":
#         form = UserForm(request.POST)
#         if form.is_valid():
#             form.save()
#             username = form.cleaned_data.get('username')
#             raw_password = form.cleaned_data.get('password1')
#             user = authenticate(username=username, password=raw_password)  # 사용자 인증 (사용자명과 비밀번호가 정확한지 검증)
#             login(request, user)  # 로그인시킴
#             return redirect('index')
#     else:
#         form = UserForm()
#     return render(request, 'common/signup.html', {'form': form})

############################################################################## 회원가입 템플릿 ##################
# {% extends "base.html" %}
# {% block content %}
# <div class="container my-3">
#     <form method="post" action="{% url 'common:signup' %}">
#         {% csrf_token %}
#         {% include "form_errors.html" %}  // 기존에 생성한 오류출력 템플릿과 연결
#         <div class="mb-3">
#             <label for="username">사용자 이름</label>
#             <input type="text" class="form-control" name="username" id="username"
#                    value="{{ form.username.value|default_if_none:'' }}">
#         </div>
#         <div class="mb-3">
#             <label for="password1">비밀번호</label>
#             <input type="password" class="form-control" name="password1" id="password1"
#                    value="{{ form.password1.value|default_if_none:'' }}">
#         </div>
#         <div class="mb-3">
#             <label for="password2">비밀번호 확인</label>
#             <input type="password" class="form-control" name="password2" id="password2"
#                    value="{{ form.password2.value|default_if_none:'' }}">
#         </div>
#         <div class="mb-3">
#             <label for="email">이메일</label>
#             <input type="text" class="form-control" name="email" id="email"
#                    value="{{ form.email.value|default_if_none:'' }}">
#         </div>
#         <button type="submit" class="btn btn-primary">생성하기</button>
#     </form>
# </div>
# {% endblock %}
#------------ 참고 --------------
#   {% for field in form %}     // 이 방식을 써도됨
#       <div class="fieldwrapper">
#           {{ field.errors }}
#           {{ field.lavel_tag }}{{ field }}
#       </div>
#    {% endfor %}

# 이 경우 forms에 패스워드를 안보이게 하기위해 이 부분을 추가
# widgets ={
#     'password' : django_forms.PasswordInput(),
# }

###### 모델변경 ########################################################## 사용자 정보를 위한 models변경 ################

# from django.contrib.auth.models import User   // pybo/models.py
# class Question(models.Model):
#     author = models.ForeignKey(User, on_delete=models.CASCADE)    // User와 연결시켜 user가 삭제되면 같이 삭제되게
# class Answer(models.Model):
#     author = models.ForeignKey(User, on_delete=models.CASCADE)

# python manage.py makemigrations   (어떤 메시지뜨면 option 1선택)
# python manage.py migrate

##################################################################### views에 글쓴이 속성 (로그인필수)#############
# from django.contrib.auth.decorators import login_required // pybo/views.py
# @login_required(login_url='common:login') // 로그인 되어있을 때만 함수호출, 그렇지 않으면 로그인 화면으로
# def answer_create(request, question_id):
#     if form.is_valid():
#         answer = form.save(commit=False)
#         answer.author = request.user  # author 속성에 로그인 계정 저장
# @login_required(login_url='common:login')
# def question_create(request):
#     if form.is_valid():
#         question = form.save(commit=False)
#         question.author = request.user  # author 속성에 로그인 계정 저장

######################################################################## Next (로그인후 다음화면)###########
# <form method="post" action="{% url 'common:login' %}">    // common/login.html
#     {% csrf_token %}
#     <input type="hidden" name="next" value="{{ next }}">  // 로그인 성공후 이동되는 URL
#     {% include "form_errors.html" %}

################################################################### disabled (로그인없이 사용불가능하게) ###########
# <div class="mb-3">    // pybo/question_detail.html
#     <label for="content" class="form-label">답변내용</label>
#     <textarea {% if not user.is_authenticated %}disabled{% endif %}
#               name="content" id="content" class="form-control" rows="10"></textarea>    // 로그인 안되있으면 disabled
# </div>

######### 글쓴이 표시 ###############################################################################################
# <td>{{ question.author.username }}</td>  <!-- 글쓴이 추가 --> // 질문, 질문상세, 답변에 추가


######### 수정과 삭제 ############################################ 수정한 시간을 표시하기 위한 models변경 #############
# class Question(models.Model): // models.py
#     modify_date = models.DateTimeField(null=True, blank=True) // null=True : 데이터베이스에 null을허용, blank=True : 데이터 검증시 값이없어도 됨
# class Answer(models.Model):
#     modify_date = models.DateTimeField(null=True, blank=True)

# python manage.py makemigrations
# python manage.py migrate

############################################################################ 템플릿에 질문 수정, 삭제버튼 추가 ##################
# <div class="my-3">    // question_detail.html (만든날짜부분 밑에)
#     {% if request.user == question.author %}
#     <a href="{% url 'pybo:question_modify' question.id  %}"
#        class="btn btn-sm btn-outline-secondary">수정</a>
#     <a href="javascript:void(0)" class="delete btn btn-sm btn-outline-secondary"
#        data-uri="{% url 'pybo:question_delete' question.id  %}">삭제</a> 
# // 삭제버튼 확인창을 위한 구성, javascript:void(0)는 아무동작 하지않게, 삭제버튼 이벤트를 확인하도록 class 속성에 "delete" 항목을 추가,
#     {% endif %}
# </div>

#################################################################### 수정기능 생성하기 위한 urls과 views #########
# path('question/modify/<int:question_id>/', views.question_modify, name='question_modify'),    // pybo/urls.py

# from django.contrib import messages   // pybo/views.py
# @login_required(login_url='common:login')
# def question_modify(request, question_id):
#     question = get_object_or_404(Question, pk=question_id)
#     if request.user != question.author:
#         messages.error(request, '수정권한이 없습니다')
#         return redirect('pybo:detail', question_id=question.id)
#     if request.method == "POST":
#         form = QuestionForm(request.POST, instance=question)  // instance를 기준으로 QuestionForm을 생성하지만 request.POST의 값으로 덮어쓰라는 의미
#         if form.is_valid():
#             question = form.save(commit=False)
#             question.modify_date = timezone.now()  // 수정일시 저장
#             question.save()
#             return redirect('pybo:detail', question_id=question.id)
#     else:
#         form = QuestionForm(instance=question)    // 수정할 때 form에 instance의 값이 채워져서 화면에 제목과 내용이 채워진 채로 보일 것
#     context = {'form': form}
#     return render(request, 'pybo/question_form.html', context)

####################################################################### '수정권한이 없습니다' 오류 표시 ##################
# <!-- message 표시 -->     // question_detail.html
#     {% if messages %}
#     <div class="alert alert-danger my-3" role="alert">
#     {% for message in messages %}
#         <strong>{{ message.tags }}</strong>
#         <ul><li>{{ message.message }}</li></ul>
#     {% endfor %}
#     </div>
#     {% endif %}

################################################################################## 수정일시 표시 ######################
# {% if question.modify_date %}     // question_detail.html
#             <div class="badge bg-light text-dark p-2 text-start mx-3">
#                 <div class="mb-2">modified at</div>
#                 <div>{{ question.modify_date }}</div>
#             </div>
#             {% endif %}

####################################################### '삭제하시겠습니까' 확인창 호출을 위한 자바스크립트 코드 ########
# <!-- 자바스크립트 Start -->   // base.html
# {% block script %}
# {% endblock %}
# <!-- 자바스크립트 End -->

# {% block script %}    // question_detail.html
# <script type='text/javascript'>
# const delete_elements = document.getElementsByClassName("delete");
# Array.from(delete_elements).forEach(function(element) {
#     element.addEventListener('click', function() {
#         if(confirm("정말로 삭제하시겠습니까?")) {
#             location.href = this.dataset.uri;
#         };
#     });
# });
# </script>
# {% endblock %}

#################################################################### 삭제기능 생성하기 위한 urls과 views #########
# path('question/delete/<int:question_id>/', views.question_delete, name='question_delete'),    // pybo/urls.py

# @login_required(login_url='common:login') // pybo/views.py
# def question_delete(request, question_id):
#     question = get_object_or_404(Question, pk=question_id)
#     if request.user != question.author:
#         messages.error(request, '삭제권한이 없습니다')
#         return redirect('pybo:detail', question_id=question.id)
#     question.delete()
#     return redirect('pybo:index')

# 답변수정 삭제기능도 이와 비슷함

##### views.py 파일분리 ################### 이 urls를 생성후 이와같이 views폴더, 파이썬모듈을 생성 #######################
# from .views import base_views, question_views, answer_views
# app_name = 'pybo'

# urlpatterns = [
#     # base_views.py
#     path('',
#          base_views.index, name='index'),
#     path('<int:question_id>/',
#          base_views.detail, name='detail'),

#     # question_views.py
#     path('question/create/',
#          question_views.question_create, name='question_create'),
#     path('question/modify/<int:question_id>/',
#          question_views.question_modify, name='question_modify'),
#     path('question/delete/<int:question_id>/',
#          question_views.question_delete, name='question_delete'),

#     # answer_views.py
#     path('answer/create/<int:question_id>/',
#          answer_views.answer_create, name='answer_create'),
#     path('answer/modify/<int:answer_id>/',
#          answer_views.answer_modify, name='answer_modify'),
#     path('answer/delete/<int:answer_id>/',
#          answer_views.answer_delete, name='answer_delete'),
# ]
###### 추천 (좋아요기능) ####################################### 추천기능을 위한 모델변경 ############
# class Question(models.Model):
#     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author_question') // 글쓴이 User와 추천인 User을 분리하기위해 related_name추가
#     voter = models.ManyToManyField(User, related_name='voter_question')  // 추천인 추가, 한명이 여러명, 여러명이 한명에게 추천가능하니 ManyToManyField사용
# class Answer(models.Model):
#     author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author_answer')
#     voter = models.ManyToManyField(User, related_name='voter_answer')

# python manage.py makemigrations
# python manage.py migrate

#################################################################### 템플릿에 질문추천 버튼 ############
# <a href="javascript:void(0)" data-uri="{% url 'pybo:question_vote' question.id  %}"   // question_detail.html
#     class="recommend btn btn-sm btn-outline-secondary"> 추천
#     <span class="badge rounded-pill bg-success">{{question.voter.count}}</span>
# </a>

####################################################### '추천하시겠습니까' 확인창 호출을 위한 자바스크립트 코드 ########
# const recommend_elements = document.getElementsByClassName("recommend");      // question_detail.html (삭제하시겠습니까 밑에)
# Array.from(recommend_elements).forEach(function(element) {
#     element.addEventListener('click', function() {
#         if(confirm("정말로 추천하시겠습니까?")) {
#             location.href = this.dataset.uri;
#         };
#     });
# });

#################################################################### 추천기능 생성하기 위한 urls과 views #########
# path('question/vote/<int:question_id>/', question_views.question_vote, name='question_vote'), // pybo/urls.py

# @login_required(login_url='common:login')  // pybo/views.py
# def question_vote(request, question_id):
#     question = get_object_or_404(Question, pk=question_id)
#     if request.user == question.author:
#         messages.error(request, '본인이 작성한 글은 추천할수 없습니다')
#     else:
#         question.voter.add(request.user)      //  add 함수를 사용하여 추천인을 추가
#     return redirect('pybo:detail', question_id=question.id)

# 답변 추천기능도 이와 비슷함

##### 앵커 (url 호출시 원하는위치로 이동)################################ 템플릿 답변에 앵커 추가 ################### 
# <h5 class="border-bottom my-3 py-2">{{question.answer_set.count}}개의 답변이 있습니다.</h5>   // question_detail.html
# {% for answer in question.answer_set.all %}
# <a id="answer_{{ answer.id }}"></a>   // id 마다 다른 앵커가 생성됨

##################################################################### 앵커가 있는 부분으로 redirect ##########
# from django.shortcuts import  resolve_url
# @login_required(login_url='common:login')
# def answer_create(request, question_id):
#             return redirect('{}#answer_{}'.format(resolve_url('pybo:detail', question_id=question.id), answer.id))
# // resolve_url에 #answer_{answer.id}로 이동시킴

# @login_required(login_url='common:login')
# def answer_modify(request, answer_id):
#     if request.method == "POST":
#         form = AnswerForm(request.POST, instance=answer)
#         if form.is_valid():
#             return redirect('{}#answer_{}'.format(resolve_url('pybo:detail', question_id=answer.question.id), answer.id))

# @login_required(login_url='common:login')
# def answer_vote(request, answer_id):
#     return redirect('{}#answer_{}'.format(resolve_url('pybo:detail', question_id=answer.question.id), answer.id))

###### 검색 ###########################################################  질문 목록 조회에 적용되도록 함수에 추가 ##########
# from django.db.models import Q        // base_views.py // Q함수는 OR조건으로 데이터를 조회하기 위해 사용하는 함수
# def index(request):
#     page = request.GET.get('page', '1')  # 페이지
#     kw = request.GET.get('kw', '')  # 검색어 (평소엔 빈칸으로)
#     question_list = Question.objects.order_by('-create_date')
#     if kw:
#         question_list = question_list.filter(
#             Q(subject__icontains=kw) |  # 제목 검색   // kw 문자열이 포함되었는지 확인(icontain에 'i'를 뺴면 대소문자 구분)
#             Q(content__icontains=kw) |  # 내용 검색
#             Q(answer__content__icontains=kw) |  # 답변 내용 검색
#             Q(author__username__icontains=kw) |  # 질문 글쓴이 검색
#             Q(answer__author__username__icontains=kw)  # 답변 글쓴이 검색
#         ).distinct()  // distinct함수는 조회 결과에 중복이 있을 때 중복을 제거하여 리턴하는 함수
#     context = {'question_list': page_obj, 'page': page, 'kw': kw}


############################################################## 검색어를 입력하게하는 텍스트창을 템플릿에 추가 ####################
# <div class="row my-3">    // question_list.html
#         <div class="col-6">
#             <a href="{% url 'pybo:question_create' %}" class="btn btn-primary">질문 등록</a>  // 질문등록 버튼 이동
#         </div>
#         <div class="col-6">
#             <div class="input-group">
#                 <input type="text" id="search_kw" class="form-control" value="{{ kw|default_if_none:'' }}"> // 자바 스크립트로 값을 읽기위해 id추가, value="{{ kw|default_if_none:'' }}에 키워드가 입력됨
#                 <div class="input-group-append">
#                     <button class="btn btn-outline-secondary" type="button" id="btn_search">찾기</button>
#                 </div>
#             </div>
#         </div>
#     </div>

# (... 생략 ...)

# <!-- 페이징처리 끝 -->
# </div>
# <form id="searchForm" method="get" action="{% url 'index' %}">    // 검색기능은 get방식으로 요청
#     <input type="hidden" id="kw" name="kw" value="{{ kw|default_if_none:'' }}">   // 위에 키워드를 가져옴
#     <input type="hidden" id="page" name="page" value="{{ page }}">
# </form>
# {% endblock %}

######################################################## 검색할때 값을 읽어 폼에 설정할 수 있도록 페이징 수정 #######
# <a class="page-link" data-page="{{ question_list.previous_page_number }}"  // question_list.html에 이전부분을 이같이 수정
#     href="javascript:void(0)">이전</a>

# <a class="page-link" data-page="{{ page_number }}"    // question_list.html에 페이지리스트 부분을 이같이 수정
#     href="javascript:void(0)">{{ page_number }}</a>

# <a class="page-link" data-page="{{ question_list.next_page_number }}"   // question_list.html에 다음부분을 이같이 수정
#     href="javascript:void(0)">다음</a>

######################################################## page, kw 파라미터를 동시에 요청할 자바스크립트 코드 #########
# {% block script %}        // question_list.html
# <script type='text/javascript'>
# const page_elements = document.getElementsByClassName("page-link");
# Array.from(page_elements).forEach(function(element) {
#     element.addEventListener('click', function() {
#         document.getElementById('page').value = this.dataset.page;
#         document.getElementById('searchForm').submit();
#     });
# });
# const btn_search = document.getElementById("btn_search");
# btn_search.addEventListener('click', function() {
#     document.getElementById('kw').value = document.getElementById('search_kw').value;
#     document.getElementById('page').value = 1;  // 검색버튼을 클릭할 경우 1페이지부터 조회한다.
#     document.getElementById('searchForm').submit();
# });
# </script>
# {% endblock %}


