from django.contrib import admin
from .models import Question

class QuestionAdmin(admin.ModelAdmin):
    search_fields = ['subject']     # 관리자 페이지에서 'sbject' 검색기능

admin.site.register(Question, QuestionAdmin) # Question , subject으로 질문검색기능 을 관리자페이지에 띄워줌
