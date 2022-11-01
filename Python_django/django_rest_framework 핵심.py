####### URL과 뷰 ######################################################################
# python -m venv mysite // 가상환경 (Scripts -> activate)
# django-admin startproject mysite
# django-admin startapp pybo
# pip install django
# py manage.py runserver

######## 모델 ############################################################################
from django.db import models //models.py

class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    update = models.DateTimeField(auto_now=True)
    create = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.body[0:50] // 50자만
        
############################################### 앱연결 및 Migrate ##########################
# INSTALLED_APPS = [ 'pybo.apps.PyboConfig',]  // Settings

# python manage.py makemigrations
# python manage.py migrate

####### 장고 관리자 ############################################################################
from django.contrib import admin //admin.py
from .models import Note

class NoteAdmin(admin.ModelAdmin):
    search_fields = ['subject'] 

admin.site.register(Note, NoteAdmin)

######### Django_rest_framework basis ##############################################################
# pip install djangorestframework
# INSTALLED_APPS = [ 'rest_framework',]  // Settings

####################### //views.py
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
    
######### serializers #################################################################
from rest_framework.serializers import ModelSerializer, serializers      // serializers.py
from .models import Note

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'
        
        
####################### //views.py
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

####################### //urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name='routes'),
    path('notes/', views.getNotes, name='notes'),
    path('notes/<str:pk>', views.getNote, name='notes'),
]

###### 리액트 사용전 요청허용 세팅 #############################################################
# python -m pip install django-cors-headers //  다른포트에서 데이터를 요청했을때 차단하는것을 방지
# INSTALLED_APPS=['corsheaders',] // settings.py
# MIDDLEWARE = ['corsheaders.middleware.CorsMiddleware',]

# CORS_ALLOW_ALL_ORIGINS = True //  모든 요청을 허용할때 사용
# CORS_ALLOW_ALL_ORIGINS = [ 
#     'http://localhost:3000/',
# ] //  특정 요청만 허용할때 사용

######### 리액트(frontend) #################################################################
    
# npx create-react-app frontend
# npm start

import React, { useEffect, useState } from "react";

export default function NoteListPage(){
    const [notes, setNotes] = useState([])

    useEffect(()=>{
        getNotes()
    },[])

    let getNotes = async () =>{
        let response = await fetch('http://127.0.0.1:8000/api/notes/')
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

#########  #################################################################

