################ main.urls ################

from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from .settings import MEDIA_URL, MEDIA_ROOT


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('content.urls')),
    path('user/', include('user.urls')),
]


urlpatterns += static(MEDIA_URL, document_root=MEDIA_ROOT) # 미디어파일 조회하기 위해

################ content.urls ################

from django.urls import path
from .views import *
from content.views import Main, UploadFeed, Profile, UploadReply, TogleLike, TogleBookmark
from django.conf.urls.static import static


urlpatterns = [
    path('main/', Main.as_view(), name='main'),
    path('content/upload', UploadFeed.as_view()),
    path('content/profile/', Profile.as_view(), name='profile'),
    path('content/uploadReply', UploadReply.as_view()),
    path('content/togleLike', TogleLike.as_view()),
    path('content/togleBookmark', TogleBookmark.as_view()),
]

################ user.urls ################

from django.urls import path
from .views import Join,Login,Logout,Upload_Profile

urlpatterns = [
    path('join', Join.as_view()),
    path('login', Login.as_view()),
    path('logout', Logout.as_view()),
    path('upload_profile', Upload_Profile.as_view()),
]

