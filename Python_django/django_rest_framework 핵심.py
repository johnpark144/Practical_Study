####### URL과 뷰 ####################################################################################
# python -m venv mysite // 가상환경 (Scripts -> activate)
# django-admin startproject mysite
# django-admin startapp pybo
# pip install django
# py manage.py runserver

######## 모델 ##########################################################################################
from django.db import models //models.py

class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    update = models.DateTimeField(auto_now=True)
    create = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50] // 50자만
        
############################################### 앱연결 및 Migrate ######################################
# INSTALLED_APPS = [ 'pybo.apps.PyboConfig',]  // Settings

# python manage.py makemigrations
# python manage.py migrate

####### 장고 관리자 ###################################################################################
from django.contrib import admin //admin.py
from .models import Note

class NoteAdmin(admin.ModelAdmin):
    search_fields = ['subject'] 

admin.site.register(Note, NoteAdmin)

######### Django_rest_framework basis ##############################################################
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
    ]

    return Response(routes)
    
######### serializers ###############################################################################
from rest_framework.serializers import ModelSerializer, serializers      // serializers.py
from .models import Note

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
        
        
############# //views.py
@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all()
    serialzer = NoteSerializer(notes, many=True)
    return Response(serialzer.data)

@api_view(['GET'])
def getNote(request, pk):
    notes = Note.objects.get(id=pk)
    serialzer = NoteSerializer(notes, many=False) # many=False는 한개만 serialize
    return Response(serialzer.data)

########### //urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('notes/', views.getNotes, name='notes'),
    path('notes/<str:pk>/', views.getNote, name='notes'),
]

###### 리액트 사용전 요청허용 세팅 ###########################################################################
# python -m pip install django-cors-headers //  다른포트에서 데이터를 요청했을때 차단하는것을 방지
# INSTALLED_APPS=['corsheaders',] // settings.py
# MIDDLEWARE = ['corsheaders.middleware.CorsMiddleware',]

# CORS_ALLOW_ALL_ORIGINS = True //  모든 요청을 허용할때 사용
# CORS_ALLOW_ALL_ORIGINS = [ 
#     'http://localhost:3000/',
# ] //  특정 요청만 허용할때 사용

######### 리액트(frontend) ###############################################################################
    
# npx create-react-app frontend
# npm install react-router-dom --save
# npm start

# "proxy": "http://127.0.0.1:8000/",  // package.json()

####### 컴포넌트 // NoteListPage.js
import React, { useEffect, useState } from "react";

export default function NoteListPage(){
    const [notes, setNotes] = useState([])

    useEffect(()=>{
        getNotes()
    },[])

    let getNotes = async () =>{
        let response = await fetch('/api/notes/')
        let data = await response.json()
        setNotes(data)
    }

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

######### 라우터구현  // App.js
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
        getNote()
    }, [id])

    let getNote = async()=>{
        let response = await fetch(`/api/notes/${id}`)
        let data = await response.json()
        setNote(data)
    }

    return(
        <div>
             <p> {note?.body}</p> {/* ? 는 body 가있으면 실행하고 없으면 내비둠*/}
        </div>
    )
}

######### 수정 ###############################################################################
@api_view(['PUT'])          // views.py
def updateNote(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data)

    if serializer.is_valid():
        serializer.save()

    return Response(serializer.data)

############## // url.py
 path('notes/<str:pk>/update/', views.updateNote, name='updateNote'),
    
############## // NotePage.js
import { useNavigate, useParams } from 'react-router-dom';
# ... 생략 ...
const { id } = useParams();
const [note, setNote] = useState(null)
const navigate = useNavigate();
# ... 생략 ...
let updateNote = async () => {
    await fetch(`/api/notes/${id}/update/`,{
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
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
        <textarea onChange={(e)=>{setNote({...note, 'body':e.target.value})}} Value={note?.body} /> {/* ? 는 body 가있으면 실행하고 없으면 내비둠*/}
    </div>
)    
    
######### 삭제 ###############################################################################
@api_view(['DELETE'])   // views.py
def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted.')

############## // url.py
path('notes/<str:pk>/delete/', views.deleteNote, name='deleteNote'),

############## // NotePage.js

# ... 생략 ...
let updateNote = async () => {
    if (id !== 'new') {
        if (note.body === '') {
            deleteNote()
            navigate('/')
        } else {
            await fetch(`/api/notes/${id}/update/`, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(note)
            })
            navigate('/')
        }
    } else {
        navigate('/')
    }
}

let deleteNote = async () => {
    await fetch(`/api/notes/${id}/delete/`, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(note)
    })
    navigate('/')
}

return (
# ... 생략 ...
<button onClick={deleteNote}>
    Delete
</button>
# ... 생략 ...
    
######### 생성 ###############################################################################
@api_view(['POST'])     // views.py
def createNote(request):
    data = request.data
    note = Note.objects.create(
        body=data['body']
    )
    serialzer = NoteSerializer(note, many=False)
    return Response(serialzer.data)

############## // url.py
path('notes/create/', views.createNote, name='createNote'),

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
let createNote = async () => {
    if (note !== null) {
        await fetch(`/api/notes/create/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(note)
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
    
########################################################################################
    
    
  
