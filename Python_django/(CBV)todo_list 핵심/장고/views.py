from django.shortcuts import render, redirect
from django.views.generic.list import ListView
from django.views.generic.detail import DetailView
from django.views.generic.edit import CreateView, UpdateView, DeleteView, FormView
from django.urls import reverse_lazy

from django.contrib.auth.views import LoginView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import login

from .models import Task

# django에 내장되있는 어스뷰와 제네릭뷰(클래스뷰)들을 상속,

class CustomLoginView(LoginView): # (파일 default는 registration/login.html)
    template_name = 'base/login.html'
    fields = '__all__'   # '__all__'은 models에 있는 모든것을 form처럼 사용
    redirect_authenticated_user = True # 로그인 되있으면 되돌려보냄 (디폴트는 False)

    def get_success_url(self):
        return reverse_lazy('tasks') # 로그인하면 tasks로 이동

class RegisterPage(FormView):
    template_name = 'base/register.html'
    form_class = UserCreationForm # 회원가입 폼을 폼으로 사용
    redirect_authenticated_user = True
    success_url = reverse_lazy('tasks') # 템플릿이 실행되고 views로 돌아올때 tasks로 이동

    def form_valid(self, form):
        user = form.save() # 가입 양식에따라 유저생성
        if user is not None:  # 가입이 완료되면
            login(self.request, user) # 자동 로그인
        return super(RegisterPage, self).form_valid(form) # RegisterPage클래스에서 self의 회원가입 정보만 리턴

    def get(self, *args, **kwargs):
        if self.request.user.is_authenticated: # 회원가입 페이지에 들어서는데 로그인 되있는 상태로 들어왔다면
            return redirect('tasks') # tasks로 돌려보내라
        return super(RegisterPage, self).get(*args, **kwargs)


class TaskList(LoginRequiredMixin, ListView):   # (파일 default는 base/task_list.html), LoginRequiredMixin을두면 로그인 필수(settings에서 redirect URL지정해야함)
    model = Task    # models에 Task를 model로함
    context_object_name = 'tasks' # ListView에 내장되있는 context_object의 이름을 tasks로 바꿈 (default는 object_list)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['tasks'] = context['tasks'].filter(user=self.request.user) # 오직 현재 로그인된 user의 tasks만 필터해서 입력 
        context['count'] = context['tasks'].filter(complete=False).count() # 오직 현재 로그인된 user의 tasks중 complete되지 않는것만 카운트, 디폴트는 True (전체카운트)

        # 검색 안 할땐 self.request.GET.get('search-area')는 None이라서 or ''를 붙여 검색창에 빈칸을 유지할수있음
        # 검색 할땐 search-area의 이름을 가진 정보를 get방식으로 가져와 search_input 변수에 입력 
        search_input = self.request.GET.get('search-area') or ''   
        if search_input:
            context['tasks'] = context['tasks'].filter(title__startswith=search_input)  # title를 검색어로 시작되는 것만(__startswith), __icontains은 대소문자 구분없이 전체 검색

        context['search_input'] = search_input # search_input을 context에 담아 템플릿에 전달 (검색창 value가되어 유지)

        return context # tasks(평소엔 전체, 검색했을땐 특정), search_input(평소엔 빈칸, 검색했을땐 특정) 부분을 템플릿에전달

class TaskDetail(LoginRequiredMixin, DetailView): # (파일 default는 task_detail.html)
    model = Task
    context_object_name = 'task'
    template_name = 'base/task.html' # template 이름을 이같이 따로 지정할 수 있음
    

class TaskCreate(LoginRequiredMixin, CreateView): # (파일 default는 task_form.html) -> 처음 만들때 사용
    model = Task
    fields = ['title', 'description', 'complete'] # 이 세가지 form만 화면에 보이도록 (User을 빼야해서)
    success_url = reverse_lazy('tasks')

    def form_valid(self, form):
        form.instance.user = self.request.user # 현재 로그인 된 사용자가 만들어진 form의 주인
        return super(TaskCreate, self).form_valid(form) # TaskCreate클래스에서 self의 form들만 리턴

class TaskUpdate(LoginRequiredMixin, UpdateView): # (파일 default는 task_form.html) -> 수정할때 사용
    model = Task
    fields = ['title', 'description', 'complete'] 
    success_url = reverse_lazy('tasks')

class TaskDelete(LoginRequiredMixin, DeleteView): # (파일 default는 task_confirm_delete.html)
    model = Task
    context_object_name = 'task'
    success_url = reverse_lazy('tasks')