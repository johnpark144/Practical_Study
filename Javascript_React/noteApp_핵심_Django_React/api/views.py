from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from .models import Note
from .serializers import NoteSerializer, CreateUserSerializer
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
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


@api_view(['POST'])
def createUser(request):
    if request.method == 'POST':
        data = request.data
        username = data['username']
        
        if User.objects.filter(username=username).exists():
            return Response(status=400, data=dict(message="Beacuase the user already exists"))

        user = User.objects.create(
            username = username,
            password = make_password(data['password']),
            email = data['email'],
        )
        serialzer = CreateUserSerializer(user, many=False)
        return Response(serialzer.data)
       
       
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET, POST',
            'GET_body': None,
            'GET_description': 'Returns an array of notes',
            'POST_body': "{'body': ""}",
            'POST_description': 'Creates new note with data sent in post request',
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET, PUT, DELETE',
            'GET_body': None,
            'GET_description': 'Returns a single note object',
            'PUT_body': "{'body': ""}",
            'PUT_description': 'Creates an existing note with data sent in post request',
            'DELETE_body': None,
            'DELETE_description': 'Deletes and exiting note',
        },
        {
            'Endpoint': '/token/',
        },
        {
            'Endpoint': '/token/refresh',
        }
    ]

    return Response(routes)

@api_view(['GET','POST'])
def getNotes(request):
    if request.method == 'GET':
        notes = Note.objects.all().order_by('-update')
        serialzer = NoteSerializer(notes, many=True)
        return Response(serialzer.data)

    if request.method == 'POST':
        data = request.data
        id = data['user']
        note = Note.objects.create(
            user = User.objects.get(id=id), # User 랑 note 가 다대일 관계로 묶여있어서 무조건 User가 들어가야함
            body = data['body']
        )
        serialzer = NoteSerializer(note, many=False)
        return Response(serialzer.data)

@api_view(['GET','PUT','DELETE'])
def getNote(request, pk):
    if request.method == 'GET':
        notes = Note.objects.get(id=pk)
        serialzer = NoteSerializer(notes, many=False) # many=False는 한개만 serialize
        return Response(serialzer.data)

    if request.method == 'PUT':
        data = request.data
        note = Note.objects.get(id=pk)
        serializer = NoteSerializer(instance=note, data=data)

        if serializer.is_valid():
            serializer.save()
        return Response(serializer.data)

    if request.method == 'DELETE':
        note = Note.objects.get(id=pk)
        note.delete()
        return Response('Note was deleted.')
