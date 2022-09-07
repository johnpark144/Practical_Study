############ 일반장고FBV, api_view 장식자(FBV) ##############
from django.urls import path
from .views import article_list, article_detail

urlpatterns = [
    path('article/', article_list),
    path('detail/<int:pk>', article_detail),
]

########### APIView (CBV) #################################
from django.urls import path
from .views import ArticleAPIview, ArticleDetails
urlpatterns = [
    path('article/', ArticleAPIview.as_view()),
    path('detail/<int:id>', ArticleDetails.as_view()),
]

########### Generic 뷰(CBV) & Mixins ######################
from django.urls import path
from .views import GenericAPIView
urlpatterns = [
    path('generic/article/<int:id>', GenericAPIView.as_view()),
]

########## APIView (CBV), Generic 뷰(CBV), model ViewSet #####
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet

router = DefaultRouter()
router.register('article', ArticleViewSet, basename='article')  # 앱처럼 묶어서 관리하기위해

urlpatterns = [
    path('viewset/', include(router.urls)),
    path('viewset/int:<pk>/', include(router.urls)),
]
