####### URL과 뷰 ####################################################################################################################################
# python -m venv virenv // 가상환경 (Scripts -> activate) 작업폴더와 가상환경폴더를 섞지말것
# pip install django

# 인터프리터로 가상환경에 python.exe를 찾아서 지정해 줘야함

# django-admin startproject mysite
# django-admin startapp api
# py manage.py runserver

######## 모델 ##########################################################################################################################################
from django.db import models //models.py

class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    update = models.DateTimeField(auto_now=True)
    create = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50] // 50자만
        
##### 앱연결 및 Migrate ############################################################################################################################
# INSTALLED_APPS = [ 'api.apps.ApiConfig',]  // Settings

# python manage.py makemigrations
# python manage.py migrate

####### 장고 관리자 ###################################################################################################################################
from django.contrib import admin //admin.py
from .models import Note

class NoteAdmin(admin.ModelAdmin):
    search_fields = ['subject'] 

admin.site.register(Note, NoteAdmin)

######### Django_rest_framework basis ######################################################################################################################
# pip install djangorestframework
# INSTALLED_APPS = [ 'rest_framework',]  // Settings

######### //views.py
from rest_framework.response import Response   
from rest_framework.decorators import api_view

@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
        {
            'Endpoint': '/token/',
        },
        {
            'Endpoint': '/token/refresh',
        }
    ]

    return Response(routes)
    
######### serializers #######################################################################################################################################
from rest_framework.serializers import ModelSerializer, serializers      // serializers.py
from .models import Note

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
        
        
############# //views.py
@api_view(['GET'])
def getNotes(request):
    if request.method == 'GET':
        notes = Note.objects.all().order_by('-update')
        serialzer = NoteSerializer(notes, many=True) # many=True 여러개 serialize
        return Response(serialzer.data)

@api_view(['GET'])
def getNote(request, pk):
    if request.method == 'GET':
        notes = Note.objects.get(id=pk)
        serialzer = NoteSerializer(notes, many=False) # many=False는 한개만 serialize
        return Response(serialzer.data)

########### // api.urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('notes/', views.getNotes, name='notes'),
    path('notes/<str:pk>/', views.getNote, name='notes'),
]

###### 리액트 사용전 요청허용 세팅 (CORS) ########################################################################################################################
# python -m pip install django-cors-headers //  다른포트에서 데이터를 요청했을때 차단하는것을 방지
# INSTALLED_APPS=['corsheaders',] // settings.py
# MIDDLEWARE = ['corsheaders.middleware.CorsMiddleware',]

# CORS_ALLOW_ALL_ORIGINS = True //  모든 요청을 허용할때 사용
# CORS_ALLOW_ALL_ORIGINS = [ 
#     'http://localhost:3000/',
# ] //  특정 요청만 허용할때 사용

######### 리액트(frontend) #######################################################################################################################################
    
# npx create-react-app frontend
# npm install react-router-dom --save
# npm start

# "proxy": "http://127.0.0.1:8000/",  // package.json()

####### // NoteListPage.js
import React, { useEffect, useState } from "react";

export default function NoteListPage(){
    const [notes, setNotes] = useState([])

    useEffect(()=>{
        let getNotes = async () =>{
            let response = await fetch('/api/notes/')
            let data = await response.json()
            setNotes(data)
        }
        getNotes()
    },[])
    
    return(
        <div>
            <div className="notes-list">
                {notes.map((note, idx)=>(
                    <h3 key={idx}>{note.body}</h3> // key는 id넣줘도 되고 idx따로 만들어줘도됨
                ))}
            </div>
        </div>
    )
}

######### // App.js
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from "./components/Header";
import NoteListPage from "./pages/NoteListPage";

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Routes>
          <Route exact path='/' element={<NoteListPage />} />
          <Route path='/note/:id' element={<NotePage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

######### useParams로 id 따와서 그 id맞는 api가져오기    // NotePage.js
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';

export default function NotePage({ }){
    const { id } = useParams();
    const [note, setNote] = useState(null)

    useEffect(()=>{
        let getNote = async()=>{
            let response = await fetch(`/api/notes/${id}`)
            let data = await response.json()
            setNote(data)
        }
        getNote()
    }, [id])

    return(
        <div>
             <p> {note?.body}</p> {/* ? 는 body 가있으면 실행하고 없으면 내비둠*/}
        </div>
    )
}

######### 수정(Update) ###########################################################################################################################################
@api_view(['GET','PUT'])    // views.py
def getNote(request, pk):
    if request.method == 'GET':
        # ... 생략 ...
    if request.method == 'PUT':
        data = request.data
        note = Note.objects.get(id=pk)
        serializer = NoteSerializer(instance=note, data=data)

        if serializer.is_valid():
            serializer.save()

        return Response(serializer.data)
    
############## // NotePage.js
import { useNavigate, useParams } from 'react-router-dom';
# ... 생략 ...
const { id } = useParams();
const [note, setNote] = useState(null)
const navigate = useNavigate();
# ... 생략 ...
const updateNote = async () => {
    await fetch(`/api/notes/${id}/`,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            body : note,
        })
    })
    navigate('/')
}

return (
    <div className="note">
        <div className="note-header">
            <span style={{ cursor: 'pointer' }} onClick={updateNote} className="material-icons-outlined">
                arrow_back_ios
            </span>
        </div>
        <textarea onChange={(e)=>{setNote( e.target.value )} Value={note?.body} /> {/* ? 는 body 가있으면 실행하고 없으면 내비둠*/}
    </div>
)    
    
######### 삭제(Delete) ##################################################################################################################################
@api_view(['GET','PUT','DELETE'])   // views.py
def getNote(request, pk):
    if request.method == 'GET':
        # ... 생략 ...
    if request.method == 'PUT':
        # ... 생략 ...
    if request.method == 'DELETE':
        note = Note.objects.get(id=pk)
        note.delete()
        return Response('Note was deleted.')

############## // NotePage.js

# ... 생략 ...
const updateNote = async () => {
    if (id !== 'new') {
        if (!note) {
            deleteNote()
        } else {
            await fetch(`/api/notes/${id}/`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    body : note,
                })
            })
            navigate('/')
        }
    } else {
        navigate('/')
    }
}

const deleteNote = async () => {
    await fetch(`/api/notes/${id}/`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
    })
    navigate('/')
}

return (
# ... 생략 ...
<button onClick={deleteNote}>
    Delete
</button>
# ... 생략 ...
    
######### 생성(Create) #########################################################################################################################################
@api_view(['GET','POST'])   // views.py
def getNotes(request):
    if request.method == 'GET':
        # ... 생략 ...
    if request.method == 'POST':
        data = request.data
        note = Note.objects.create(
            body=data['body']
        )
        serialzer = NoteSerializer(note, many=False)
        return Response(serialzer.data)

############## // Addbutton.js
import React from "react";      
import { Link } from "react-router-dom";

export default function AddButton({ }) {
    return (<>
        <Link to='/note/new' className="floating-button material-icons-outlined">
            add
        </Link>
    </>)
}

############# // NoteListPage.js
return (
    # ... 생략 ...
        <AddButton /> 
    # ... 생략 ...
)
    
############# // NotePage.js
# ... 생략 ...
let getNote = async () => {
    if(id === 'new') return     // 새로 생성하는 경우 api를 불러오지않음

    let response = await fetch(`/api/notes/${id}/`)
    let data = await response.json()
    setNote(data)
}   
# ... 생략 ...
const createNote = async () => {
    if (note !== null) {
        await fetch(`/api/notes/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                body : note,
            }),
        })
    }
    navigate('/')
}
    
# ... 생략 ...
return (
    # ... 생략 ...
    {id !== 'new' ? (
        <button onClick={deleteNote}>
            Delete
        </button>
    ) : (
        <button onClick={createNote}>
            Done
        </button>
    )
    }
    # ... 생략 ...

###### 리액트앱을 장고 Template으로 합치려면 (선택) ###############################################################################################################
import { HashRouter, Route, Routes } from 'react-router-dom';   // .App.js
 return (
    <HashRouter>    // BrowserRouter을 HashRouter로 바꿔주기(장고 포트에서도 돌아다닐 수 있음)
        # ... 생략 ...
    </HashRouter>
  );
######### 배포판 형성
    
 # npm run build 

############# // settings.py
TEMPLATES = [
    {
    # ... 생략 ...
        'DIRS': [
            BASE_DIR / 'frontend/build'
        ],
    # ... 생략 ...
    }
]
# ... 생략 ...    
STATICFILES_DIRS =[
    BASE_DIR / 'frontend/build/static'
]

############# // noteApp.urls.py
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView   # // 제네릭뷰로 템플릿 바로전달

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),
    path('', TemplateView.as_view(template_name='index.html')),
]

############ Auth (장고 백엔드) ##################################################################################################################################
python -m pip install djangorestframework-simplejwt

############ // settings.py
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES':(
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

############ // api.urls.py

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)
    
urlpatterns = [
    # ... 생략 ...
    path('token/', TokenObtainPairView.as_view(), name='tokenObtainPair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='tokenRefresh'),
]
    
############### // http://127.0.0.1:8000/api/token/
# refresh토큰 access토큰 확인가능
    
# Username : (SuperUser)
# Password : (SuperUserPassWord)
    
############## // settings.py
    
from datetime import timedelta

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),  # // 접근하기 위한 토큰 만료기간
    'REFRESH_TOKEN_LIFETIME': timedelta(days=30),    # // 로그인후 새로고침되지 않을시 로그인이 얼마나 지속되는지
    'ROTATE_REFRESH_TOKENS': False,     # // REFRESH_TOKENS 사용여부
    'BLACKLIST_AFTER_ROTATION': False,  # // REFRESH_TOKENS 사용된경우 블랙리스트 처리 (재사용불가), INSTALLED_APPS추가해줘야함
    'UPDATE_LAST_LOGIN': False,

    'ALGORITHM': 'HS256',
    'VERIFYING_KEY': None,
    'AUDIENCE': None,
    'ISSUER': None,
    'JWK_URL': None,
    'LEEWAY': 0,

    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
    'USER_AUTHENTICATION_RULE': 'rest_framework_simplejwt.authentication.default_user_authentication_rule',

    'AUTH_TOKEN_CLASSES': ('rest_framework_simplejwt.tokens.AccessToken',),
    'TOKEN_TYPE_CLAIM': 'token_type',
    'TOKEN_USER_CLASS': 'rest_framework_simplejwt.models.TokenUser',

    'JTI_CLAIM': 'jti',

    'SLIDING_TOKEN_REFRESH_EXP_CLAIM': 'refresh_exp',
    'SLIDING_TOKEN_LIFETIME': timedelta(minutes=5),
    'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),
}
    
############ 블랙리스트기능 사용하는 경우(선택) // settings.py
INSTALLED_APPS = [
    # ... 생략 ...
    'rest_framework_simplejwt.token_blacklist',
    ]

# py manage.py migrate // 마이그레이션 해줘야됨
    
################################################################################################################# Customizing token ###############

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer   # // views.py 
from rest_framework_simplejwt.views import TokenObtainPairView

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        # ...

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer  
    

############### // api.urls.py
from .views import MyTokenObtainPairView
from rest_framework_simplejwt.views import (
  # TokenObtainPairView를 지워줌
    TokenRefreshView,
)
    
urlpatterns = [
    # ... 생략 ...
    path('token/', MyTokenObtainPairView.as_view(), name='tokenObtainPair'),    # // MyTokenObtainPairView로 대체
    path('token/refresh/', TokenRefreshView.as_view(), name='tokenRefresh'),
]  

# https://jwt.io/ 에서 토큰정보 확인 가능
    
######## Auth (리액트 프론트엔드) #####################################################################################################################
npm install jwt-decode // 디코딩 라이브러리

##################################################################################################### 로그인, 로그아웃, UseContext(정보전달) ########
import { createContext, useState } from "react";    // AuthContext.js
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode"

const AuthContext = createContext()
export default AuthContext;

export const AuthProvider = ({ children }) =>{
    const [authTokens, setAuthTokens] = useState(localStorage.getItem('authTokens') ? JSON.parse(localStorage.getItem('authTokens')) : null) // 페이지마다 저장된 토큰이 있는지 확인하여 있으면 정보를 유지해줌(로그인유지)
    const [user, setUser] = useState(localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null) // 페이지마다 유저정보가 있는지 확인하여 있으면 정보를 유지해줌(로그인유지)
    const navigate = useNavigate();
    
    // 로그인해서 토큰들을 불러옴
    const loginUser = async (e) => {
        e.preventDefault()
        let response = await fetch('http://127.0.0.1:8000/api/token/',{
            method:'POST',
            headers:{
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value}) // input name(e.target.password)의 value
        })
        let data = await response.json()

        if(response.status === 200){
            setAuthTokens(data)
            setUser(jwt_decode(data.access)) // 받은 토큰을 디코딩함
            localStorage.setItem('authTokens', JSON.stringify(data)) // localStorage에 토큰을 저장해둠
            navigate('/')
        }else{
            alert('Something went wrong!')
        }
    }
    
    // 로그아웃
    const logoutUser = () =>{
        setAuthTokens(null)
        setUser(null) 
        localStorage.removeItem('authTokens')
        navigate('/login')
    }
    
    // useContext로 사용할 객체 상수
    const contextData ={   
        user:user,
        loginUser:loginUser,
        logoutUser:logoutUser
    }

    return(
        <AuthContext.Provider value={contextData}>  // 사용가능하게 할 value (객체 상수)를 제공 
            {children}
        </AuthContext.Provider>
    )
}

########## // App.js
# ... 생략 ...
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    return (
    <HashRouter>
      <div className='container dark'>
        <div className='app'>
          <AuthProvider>    // AuthProvider로 감싸 주는 부분만 useContext 사용가능
            <Header setIsLoggedIn={setIsLoggedIn}/>     // setIsLoggedIn으로 로그아웃 시키려고
            <Routes>
              {isLoggedIn ? (
                <>
                  <Route exact path='/' element={<NoteListPage />} />
                  <Route path='/note/:id' element={<NotePage />} />
                </>
              ) : (
                <>
                  <Route path='/' element={<LoginPage setIsLoggedIn={setIsLoggedIn}/>} />   // setIsLoggedIn으로 로그인 시키려고
                  <Route path='/login/' element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />  // setIsLoggedIn으로 로그인 시키려고
                </>
              )}
            </Routes>
          </AuthProvider>
        </div>
      </div>
    </HashRouter >
  );
    
############# // Header.js
import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function Header({ setIsLoggedIn }){
    let { user, logoutUser } = useContext(AuthContext)  // useContext를통해 createContext로 제공받은 것을 사용
    useEffect(() => {
        if (user) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [user])

    return(
        <div className="app-header">
            <h1>My Notes</h1>
            <Link to='/'>Home</Link>
            {user ? (
               <p onClick={logoutUser} style={{cursor:'pointer'}}>Logout</p>
            ):(
            <Link to='/login'>Login</Link>
            )}
            {user && <p>Hello {user.username}</p>}
        </div>
    )
}

############# // LoginPage.js
import { useContext, useEffect } from "react"
import AuthContext from "../context/AuthContext";

export default function LoginPage({ setIsLoggedIn }) {
    let { user, loginUser } = useContext(AuthContext)    // useContext를통해 createContext로 제공받은 것을 사용
    useEffect(() => {
        if (user) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [user])

    return (
        <div>
            <form onSubmit={loginUser}>
                <input type='text' name='username' placeholder='Enter Username' />
                <input type='password' name='password' placeholder='Enter Password' />
                <input type='submit' />
            </form>
        </div>
    )
}
################################################################################################# 4분마다 Token 업데이트 ########################
const [loading, setLoading] = useState(true)   // AuthContext.js

// Token 업데이트
const updateToken = async () =>{
    console.log('update token called')
    let response = await fetch('http://127.0.0.1:8000/api/token/refresh/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'refresh':authTokens.refresh })   // 받은 정보를 json화 시킴
    })
    let data = await response.json()

    if (response.status === 200) {
        setAuthTokens(data)
        setUser(jwt_decode(data.access))
        localStorage.setItem('authTokens', JSON.stringify(data))
    } else {
        logoutUser()
    }
    
    if(loading){
        setLoading(false)
    }
}
// authTokens존재하면 4분마다 updateToken실행
useEffect(()=>{
    if(loading){
        updateToken()
    }
    let interval = setInterval(()=>{
        if(authTokens){
            updateToken()
        }
    }, 240000)
    return()=> clearInterval(interval)

},[authTokens, loading])
    
####### modles에 회원정보 (마이그레이션 필수) #################### 회원정보 모델 마이그레이션후 해야할 모든업데이트는 NoteApp 깃헙참고 ##################
from django.db import models    // models.py
from django.contrib.auth.models import User

class Note(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField(null=True, blank=True)
    update = models.DateTimeField(auto_now=True)
    create = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50]
    
####### Django MySQL 연동 ######################################################################################################### 
pip install mysqlclient  // 연동도구 설치
python -m pip install django-environ    // .env를 이을 도구 설치
    
################### .env (manage.py)와 같은 경로 
PASSWORD='********' # // DB접속 계정 비밀번호
SECRET_KEY = 'django-insecure-m8*6kftg-5$!9m@lh366@_+9vbmmg43@$xh=@jpfos@vi)#o%&' # // settings.py에 있는 시크릿키를 이쪽으로 이동시킴

################### settings.py
from environ import Env
env = Env()
env_path = BASE_DIR / ".env"
if env_path.exists():
    with env_path.open("rt", encoding="utf8") as f:
        env.read_env(f, overwrite=True)

SECRET_KEY = env('SECRET_KEY')  # // SECRET_KEY를 mySettings에 복사
    
# ... 생략 ...
    
DATABASES={
    'default': {
        'ENGINE': 'django.db.backends.mysql',    # // 사용할 엔진 설정
        'NAME': 'app',                           # // mysql 데이터베이스 이름
        'USER': 'root',                          # // DB접속 계정명
        'PASSWORD': env('PASSWORD'),             # // .env에 따로 저장
        'HOST': 'localhost',                     # // DB주소
        'PORT': '3306',                          # // 포트번호
    }
}
    
############### MySQL DB생성후 마이그레이트 해야함
CREATE DATABASE app
    
   
