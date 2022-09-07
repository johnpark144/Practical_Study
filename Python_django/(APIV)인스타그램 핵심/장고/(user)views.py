import os
from uuid import uuid4
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import User
from django.contrib.auth.hashers import make_password
from instagram.settings import MEDIA_ROOT

class Join(APIView):
    def get(self, request):
        return render(request, "user/join.html")

    def post(self, request):
        email = request.data.get('email', None)
        nickname = request.data.get('nickname', None)
        name = request.data.get('name', None)
        password = request.data.get('password', None)

        User.objects.create(email=email,
                            nickname=nickname,
                            name=name,
                            password=make_password(password),# make_password는 패스워들를 단방향 암호화
                            profile_image='default_profile.jpg') # 디폴트로 이미지 해둠
        return Response(status=200)


class Login(APIView):
    def get(self, request):
        return render(request, "user/Login.html")

    def post(self, request):
        email = request.data.get('email', None)
        password = request.data.get('password', None)

        user = User.objects.filter(email=email).first() # email은 unique이라서 어차피 하나만있지만 first를 안해주면 리스트로 나옴(for문 사용안해도됨)

        if user is None:
            return Response(status=400, data=dict(message="Wrong email or password")) # 아이디가 존재하지 않는경우
        if user.check_password(password): 
            request.session['email'] = email # 로그인한 email이 현재 홈페이지 사용자의 email이 될것 
            return Response(status=200) # 정상 로그인 세션 or 쿠키
        else:
            return Response(status=400, data=dict(message="Wrong email or password")) # 비밀번호가 틀린경우

class Logout(APIView):
    def get(self, request):
        request.session.flush()
        return render(request, "user/Login.html")


class Upload_Profile(APIView):
    def post(self, request):
        # 일단 파일을 불러와
        file = request.FILES['file']
        uuid_name = uuid4().hex # 랜덤한 글자를 만들어준다
        save_path = os.path.join(MEDIA_ROOT, uuid_name) # settings에 입력되어있는 MEDIA_ROOT경로에 uuid_name인 랜덤한 글자로 저장

        with open(save_path,'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        profile_image = uuid_name   # 랜덤한 글자를 이름명으로하고
        email = request.data.get('email')   # 현재 접속한 email이 변수 email에 담아서

        user = User.objects.filter(email=email).first() # 그 email을가진 user를 찾고
        user.profile_image = profile_image # 그 user의 profile_image가 현재 랜덤명을 가진 profile_image로 입력
        user.save() # 수정할땐 항상  save가 필요

        return Response(status=200)