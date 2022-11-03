####### 기본설정 #################################################################################
# python -m venv mysite // 가상환경 (Scripts -> activate)
# django-admin startproject ---
# django-admin startapp --- 
# py manage.py runserver

####### Todo_lsit를 위한 Models ######################################################################
# from django.db import models
# from django.contrib.auth.models import User

# class Task(models.Model):
#     user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True) # User가 지워지면 같이 지워지게 null=True, blank=True은 비우기가능
#     title = models.CharField(max_length=200)
#     description = models.TextField(null=True, blank=True)
#     complete = models.BooleanField(default=False)   # 체크박스 생성(체크가 안된상태로)
#     created = models.DateTimeField(auto_now_add=True)    # 현재시간을 디폴트로 저장한 시간

#     def __str__(self): # shell에서 Question을 조회할때 id 값 대신 제목을 표시
#         return self.title

#     class Meta:
#         ordering = ['complete']

######### 앱연결 및 Migrate################################################################

# INSTALLED_APPS = [ 'base.apps.BaseConfig',]  // Settings

# python manage.py makemigrations
# python manage.py migrate
####### 장고 관리자 ###############################################################################

# python manage.py createsuperuser

# from .models import Task
# admin.site.register(Task)   // models에서 migrate한 정보들을 admin에 출력

####### ListView 제네릭뷰 ####################################################################################
# from .views import TaskList  // urls.py
# urlpatterns = [
#     path('', TaskList.as_view(), name='tasks'), // TaskList는 ListView를 상속한 제네릭뷰
# ]

# from django.shortcuts import render   // views.py
# from django.views.generic.list import ListView
# from .models import Task
# class TaskList(ListView):  // ListView의 파일경로 default는 templates/base/task_list.html (base는 앱이름)
#     model = Task    // models에 Task를 model로함
#     context_object_name = 'tasks' // ListView에 내장되있는 context_object의 이름을 tasks로 바꿈 (default는 object_list)

# <table>   // templates/base/task_list.html (디폴트경로)
#     <tr>
#         <th>Item</th>
#     </tr>
#     {% for task in tasks %}   // (tasks의 디폴트는 context_object)
#     <tr>
#         <td>{{task.title}}</td>
#     </tr>
#     {% empty %}
#     <h3>No items in list</h3>
#     {% endfor %}
# </table>

####### DetailView 제네릭뷰 ####################################################################################
# from .views import TaskDetail  // urls.py
# urlpatterns = [
#     path('task/<int:pk>/', TaskDetail.as_view(), name='task'), // TaskDetail은 DetailView를 상속한 제네릭뷰
# ]

# from django.views.generic.detail import DetailView    // views.py
# class TaskDetail(DetailView): // DetailView의 파일경로 default는 templates/base/task_detail.html
#     model = Task
#     context_object_name = 'task' // (task의 디폴트는 object)
#     template_name = 'base/task.html' // template 경로와 이름 지정가능

# <h1>Task : {{task}}</h1>  // base/task.html

# <table>   // task_list.html (디폴트경로)
#     <tr>
#         <th>Item</th>
#     </tr>
#     {% for task in tasks %}   
#     <tr>
#         <td>{{task.title}}</td>
#         <td><a href="{% url 'task' task.id %}"> View</a></td>     // id에 따라 달라지는 task.html로 연결
#     </tr>
#     {% empty %}
#     <h3>No items in list</h3>
#     {% endfor %}
# </table>

####### CreateView 제네릭뷰 ####################################################################################
# from .views import TaskCreate  // urls.py
# urlpatterns = [
#     path('task-create/', TaskCreate.as_view(), name='task-create'), // TaskCreate은 CreateView를 상속한 제네릭뷰
# ]

# from django.views.generic.edit import CreateView    // views.py
# from django.urls import reverse_lazy  
# class TaskCreate(CreateView): // (파일 default는 task_form.html) -> 처음 만들때 사용
#     model = Task
#     # Task를 전체사용 않고 이 세가지 form만 화면에 보이도록 fields지정 (User을 빼야해서). fields = '__all__'이면, User도 포함됨
#     fields = ['title', 'description', 'complete']
#     success_url = reverse_lazy('tasks') // 성공했을때 보낼 url


# <a id="add-link" href="{% url 'task-create' %}"> Add Task </a> // task_list.html

# <div class="header-bar">    // task_form.html
#     <a href=" {% url 'tasks' %}"> <-- back </a>
# </div>
# <form method="post" action="">
#     {% csrf_token %}
#     {{form.as_p}}     // TaskCreate에서 보낸 form을 출력
#     <input class="button" type="submit", value="Submit">
# </form>

####### UpdateView 제네릭뷰 ####################################################################################
# from .views import TaskUpdate  // urls.py
# urlpatterns = [
#     path('task-update/<int:pk>/', TaskUpdate.as_view(), name='task-update'), // TaskUpdate는 UpdateView를 상속한 제네릭뷰
# ]

# from django.views.generic.edit import CreateView, UpdateView // views.py
# class TaskUpdate(UpdateView): // (파일 default는 task_form.html) -> 수정할때 사용
#     model = Task
#     fields = ['title', 'description', 'complete'] 
#     success_url = reverse_lazy('tasks')

# <table>   // task_list.html (디폴트경로)
#     <tr>
#         <th>Item</th>
#     </tr>
#     {% for task in tasks %}   
#     <tr>
#         <td>{{task.title}}</td>
#         <td><a href="{% url 'task' task.id %}"> View</a></td>
#         <td><a href="{% url 'task-update' task.id %}"> Edit</a></td>   // id값을 가진 task를 수정
#     </tr>
#     {% empty %}
#     <h3>No items in list</h3>
#     {% endfor %}
# </table>

####### DeleteView 제네릭뷰 ####################################################################################
# from .views import TaskDelete  // urls.py
# urlpatterns = [
#     path('task-delete/<int:pk>/', TaskDelete.as_view(), name='task-delete'), // TaskDelete는 DeleteView를 상속한 제네릭뷰
# ]

# from django.views.generic.edit import CreateView, UpdateView, DeleteView  // views.py
# class TaskDelete(DeleteView): // (파일 default는 task_confirm_delete.html) -> 삭제하시겠습니까
#     model = Task
#     context_object_name = 'task'
#     success_url = reverse_lazy('tasks')

# <table>   // task_list.html (디폴트경로)
#     <tr>
#         <th>Item</th>
#     </tr>
#     {% for task in tasks %}   
#     <tr>
#         <td>{{task.title}}</td>
#         <td><a href="{% url 'task' task.id %}"> View</a></td>
#         <td><a href="{% url 'task-update' task.id %}"> Edit</a></td>
#         <td><a href="{% url 'task-delete' task.id %}"> Delete</a></td>   // id값을 가진 task를 삭제
#     </tr>
#     {% empty %}
#     <h3>No items in list</h3>
#     {% endfor %}
# </table>

# <div class="header-bar">  // task_confirm_delete.html
#     <a href=" {% url 'tasks' %}"> <-- back </a>
# </div>
# <div>
#     <form method="POST">
#         {% csrf_token %}
#         <p>Are you sure you want to delete this task? "{{task}}"</p>
#         <input class="button" type="submit" value="Delete" />
#     </form>
# </div>

####### 로그인과 로그아웃 ####################################################################################
# from .views import CustomLoginView  // urls.py
# from django.contrib.auth.views import LogoutView
# urlpatterns = [
#     path('login/', CustomLoginView.as_view(), name='login'),
#     path('logout/', LogoutView.as_view(next_page="login"), name='logout'), // 로그아웃은 뷰를 따로 만들지않음, 로그아웃후 url만 입력
# ]

# from django.contrib.auth.views import LoginView // views.py
# class CustomLoginView(LoginView): // (파일 default는 registration/login.html)
#     template_name = 'base/login.html'
#     fields = '__all__'   //  models에 있는 모든것을 form처럼 사용
#     redirect_authenticated_user = True // 로그인 되있으면 되돌려보냄 (디폴트는 False), 로그아웃 필수
#
#     def get_success_url(self):
#         return reverse_lazy('tasks') // 로그인하면 tasks로 이동

# <div>     // login.html
#     <form method="POST">
#         {% csrf_token %}
#         {{form.as_p}}
#         <input class="button" type="submit" value="login">
#     </form>
# </div>

# <div>     // task_list.html
#     {% if request.user.is_authenticated %}    // 로그인 되있다면
#     <p>{{ request.user }}</p>
#     <a href="{% url 'logout' %}">Logout</a>
#     {% else %}
#     <a href="{% url 'login' %}">Login</a>
#     {% endif %}
# </div>

# from django.contrib.auth.mixins import LoginRequiredMixin     // views.py
# class TaskList(LoginRequiredMixin, ListView): ...    // LoginRequiredMixin을 상속받으면 로그인 필수 클래스가됨
# class TaskDetail(LoginRequiredMixin, DetailView): ...
# class TaskCreate(LoginRequiredMixin, CreateView): ...
# class TaskUpdate(LoginRequiredMixin, UpdateView): ...
# class TaskDelete(LoginRequiredMixin, DeleteView): ...

# LOGIN_URL = 'login'       // settings.py , LoginRequiredMixin 클래스가 있는 페이지에 로그인없이 들어갈때 URL설정

####### 로그인한 유저의 정보만 ####################################################################################
 
# class TaskList(LoginRequiredMixin, ListView):
# ...생략...
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['tasks'] = context['tasks'].filter(user=self.request.user) // 로그인된 user의 tasks만
#         context['count'] = context['tasks'].filter(complete=False).count() // 로그인된 user의 tasks중 complete되지 않는것만 카운트, 디폴트는 True (전체카운트)
#         return context

# class TaskCreate(LoginRequiredMixin, CreateView):
# ...생략...
#     def form_valid(self, form):
#         form.instance.user = self.request.user // 현재 로그인 된 사용자가 만들어진 form의 주인
#         return super(TaskCreate, self).form_valid(form) // TaskCreate클래스에서 self의 form들만 리턴

####### 회원가입 ####################################################################################
# <p> Don't have an account? <a href="{% url 'register' %}">Register</a></p>    // login.html

# from .views import TaskList, TaskDetail, TaskCreate, TaskUpdate, TaskDelete, CustomLoginView, RegisterPage //urls.py
# urlpatterns = [
#     path('register/', RegisterPage.as_view(), name='register'), // RegisterPage는 FormView를 상속한 제네릭뷰
# ]

# from django.views.generic.edit import CreateView, UpdateView, DeleteView, FormView    // views.py
# from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth import login
# class RegisterPage(FormView):     // FormView는 form형식임을 알려줌
#     template_name = 'base/register.html'
#     form_class = UserCreationForm // 기존에 있는 회원가입 폼을 사용
#     redirect_authenticated_user = True
#     success_url = reverse_lazy('tasks')

#     def form_valid(self, form):
#         user = form.save() // 가입 양식에따라 유저생성
#         if user is not None:  // 가입이 완료되면
#             login(self.request, user) // 자동 로그인
#         return super(RegisterPage, self).form_valid(form) // RegisterPage클래스에서 self의 회원가입 정보만 리턴

#     def get(self, *args, **kwargs):
#         if self.request.user.is_authenticated: // 로그인 되있는 상태로 들어왔다면 (위에도 있는데 확실히하게 위해)
#             return redirect('tasks')
#         return super(RegisterPage, self).get(*args, **kwargs)

# <form method="POST"> // register.html
#     {% csrf_token %}
#     <label>{{form.username.label}}</label>    // {% form.as_p %}를 사용해도됨
#     {{form.username}}
#     <label>{{form.password1.label}}</label>
#     {{form.password1}}
#     <label>{{form.password2.label}}</label>
#     {{form.password2}}
#     <input class="button" type="submit" value="Register">
# </form>
# <p> Already have an account? <a href="{% url 'login' %}">Login</a></p>

####### 검색기능 ####################################################################################
# <form method="GET" style="display:flex;"> // task_list.html
#     <input type="text" name="search-area" value="{{search_input}}"> // 검색후 search_input의 값이 검색창에 유지되도록
#     <input class="button" type="submit" value="search">
# </form>

# class TaskList(LoginRequiredMixin, ListView): // views.py
# ...생략...
# def get_context_data(self, **kwargs):     
#     ...생략...
    # 검색 안 할땐 self.request.GET.get('search-area')는 None이라서 or ''를 붙여 검색창에 빈칸을 유지할수있음
    # 검색 할땐 search-area의 이름을 가진 정보를 get방식으로 가져와 search_input 변수에 입력 
#     search_input = self.request.GET.get('search-area') or ''   
#     if search_input:
#     context['tasks'] = context['tasks'].filter(title__startswith=search_input) // title를 검색어로 시작되는 것만(__startswith), __icontains은 대소문자 구분없이 전체 검색
#     context['search_input'] = search_input // 검색창 value 유지
#     return context         // tasks(평소엔 전체, 검색했을땐 특정), search_input(평소엔 빈칸, 검색했을땐 특정) 부분을 템플릿에전달 

######## 메인템플릿 ###########################################################################

#  <!DOCTYPE html>
# ...생략...
#     <!-- 구글 font -->  
#     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
#     <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap" rel="stylesheet">
# ...생략...
# .container{   // 컨테이너
#             max-width: 600px;
#             margin: auto;
#             background-color: #fff;
#         }
# .header-bar {
#             display: flex;
#             justify-content: space-between;
#             color: #fff;
#             padding: 10px;
#             border-radius: 5px 5px 0 0;
#             background: linear-gradient(1000deg, #a99ad3 0%, #6654af 40%, #381275 100%);  // 그라데이션 배경
#         }
# ...생략...
#     <div class="container">
#       <!-- 기본 템플릿 안에 삽입될 내용 Start -->
#       {% block content %}
#       {% endblock %}
#       <!-- 기본 템플릿 안에 삽입될 내용 End -->
#     </div>
# </body>
# </html>

# {% extends 'base/main.html' %}    // 연결할 템플릿
# {% block content %}
# (... 내용생략 ...)
# {% endblock %}
####### 기타 프론트엔드 ##################################################################
# // task_list.html
#  <i>(You have {{ count }} incomplete task{{ count|pluralize:"s" }})</i> // {{ count|pluralize:"s" }} 개수세서 복수면 s를붙여라



