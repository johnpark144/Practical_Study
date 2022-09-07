################ content.views ################
import os
from uuid import uuid4
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response

from instagram.settings import MEDIA_ROOT
from user.models import User
from .models import *

class Main(APIView): 
    def get(self, request):
        email = request.session.get('email',None) # 현재 로그인된 세션에 email를 가져오고 없으면 None
        user = User.objects.filter(email=email).first() # 현재 로그인된 email을가진 유저가 user
        if email is None or user is None:   # 로그인 필수
            return render(request,"user/login.html")

# feed_object_list안에있는 부분들을 그냥 feed로쓰면
# 처음 입력된 profile_image나 nickname이 나중에 바껴도 평생 같은걸로 쓰이지만,
# for문이 실행되어 리스트에 append해줌으로써 업데이트될때마다 전에 피드도 똑같이 변경해줌

        feed_object_list = Feed.objects.all().order_by('-id') # (ORM방식 쿼리셋) // select * from content_feed;(SQL방식)
        feed_list = []

        for feed in feed_object_list: 
            user = User.objects.filter(email=feed.email).first()    # 모든 유저중 피드의 이메일이 user
            reply_object_list = Reply.objects.filter(feed_id=feed.id) # 피드의 모든 댓글이 reply_object_list
            reply_list = []

            for reply in reply_object_list:
                user = User.objects.filter(email=reply.email).first()  # 모든 유저중 댓글의 이메일이 user
                reply_list.append({'reply_content': reply.reply_content,
                                    'nickname':user.nickname})
            
            like_count = Like.objects.filter(feed_id=feed.id, is_like=True).count()  # 피드의 전체 좋아요 개수 카운트 (몇명이 좋아요를..)
            is_liked = Like.objects.filter(feed_id=feed.id, email=email, is_like=True).exists() # 현재 사용자가 어떤 피드의 좋아요를 눌렀는지 여부(진한하트,하얀하트)
            is_marked = BookMark.objects.filter(feed_id=feed.id, email=email,is_marked=True).exists() 

            feed_list.append({'id':feed.id,
                                'image':feed.image,
                                'content':feed.content,
                                'like_count':like_count,
                                'profile_image':user.profile_image,
                                'nickname':user.nickname,
                                'reply_list':reply_list,
                                'is_liked':is_liked,
                                'is_marked':is_marked,
                                })

        return render(request,"instagram/main.html", context={"feeds":feed_list,"user":user})

class UploadFeed(APIView):
    def post(self, request):
        # 일단 파일을 불러와
        file = request.FILES['file']
        uuid_name = uuid4().hex # 랜덤한 글자를 만들어준다
        save_path = os.path.join(MEDIA_ROOT, uuid_name) # settings에 입력되어있는 MEDIA_ROOT경로에 uuid_name인 랜덤한 글자로 저장

        with open(save_path,'wb+') as destination:
            for chunk in file.chunks():
                destination.write(chunk)

        image = uuid_name
        content = request.data.get('content')
        email = request.session.get('email',None) # 현재 로그인된 세션에 email를 가져오고 없으면 None

        Feed.objects.create(image=image, content=content, email=email)

        return Response(status=200)

class Profile(APIView):
    def get(self, request):
        email = request.session.get('email', None) # email를 가져오거나 없으면 None
        user = User.objects.filter(email=email).first()
        if email is None or user is None:
            return render(request,"user/login.html")

        feed_list = Feed.objects.filter(email=email).all()

        like_list = list(Like.objects.filter(email=email, is_like=True).values_list('feed_id', flat=True)) # values_list는 원하는 필드만 가져옴, flat=True해야 list로 감싸서 리스트를 만들수 있음
        like_feed_list = Feed.objects.filter(id__in=like_list)

        bookmark_list = list(BookMark.objects.filter(email=email, is_marked=True).values_list('feed_id', flat=True))
        bookmark_feed_list = Feed.objects.filter(id__in=bookmark_list)

        return render(request,"content/profile.html", context={"user":user,
                                                                "feed_list":feed_list,
                                                                "like_feed_list":like_feed_list,
                                                                "bookmark_feed_list":bookmark_feed_list,
                                                                })

class UploadReply(APIView):
    def post(self, request):
        feed_id = request.data.get('feed_id', None)
        reply_content = request.data.get('reply_content', None)
        email = request.session.get('email', None)

        Reply.objects.create(feed_id=feed_id, reply_content=reply_content, email=email)
        return Response(status=200)

class TogleLike(APIView):
    def post(self, request):
        feed_id = request.data.get('feed_id', None)
        favorite_text = request.data.get('favorite_text', None)

        if favorite_text == 'favorite_border':
            is_like = True
        else:
            is_like = False

        email = request.session.get('email', None)

        like = Like.objects.filter(feed_id=feed_id, email=email).first()

        if like:
            like.is_like = is_like
            like.save()
        else:
            Like.objects.create(feed_id=feed_id, is_like=is_like, email=email)

        return Response(status=200)

class TogleBookmark(APIView):
    def post(self, request):
        feed_id = request.data.get('feed_id', None)
        bookmark_text = request.data.get('bookmark_text', None)

        if bookmark_text == 'bookmark_border':
            is_marked = True
        else:
            is_marked = False

        email = request.session.get('email', None)

        bookmark = BookMark.objects.filter(feed_id=feed_id, email=email).first()

        if bookmark:
            bookmark.is_marked = is_marked
            bookmark.save()
        else:
            BookMark.objects.create(feed_id=feed_id, is_marked=is_marked, email=email)

        return Response(status=200)

