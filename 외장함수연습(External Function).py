#외장함수는 라이브러리 함수를 import해서 씀 (라이브러리는 이미 깔려있는게 있고, 다운받아야 되는것도 있음)

#------------------sys의 함수-------------------
import sys
print(sys.argv)

#------------------pickl의 함수-------------------
import pickle

f = open("test.txt", 'wb')
data = {1: 'python', 2: 'you need'} 
pickle.dump(data, f) #딕셔너리 형식으로 파일에 저장
f.close()

f = open("test.txt", 'rb')
data = pickle.load(f)  #딕셔너리 형식을 파일에서 불러오기
print(data)
f.close()

#{1: 'python', 2: 'you need'}
#------------------time의 함수-------------------
import time

print(time.time()) # 1970년 1월 1일 0시 0분 0총 기준으로 지난 시간을 초단위로 알려줌
#1657901969.7144861

mytime = time.localtime(time.time()) # 현재 시간을 튜플형태로
print(mytime)
#time.struct_time(tm_year=2022, tm_mon=7, tm_mday=15, tm_hour=11, tm_min=16, tm_sec=52, tm_wday=4, tm_yday=196, tm_isdst=1)

myasctime = time.asctime(time.localtime(time.time())) # 현재 시간을 보기좋은 형태로
print(myasctime)
#Fri Jul 15 11:19:29 2022

mycttime = time.ctime()# 현재 시간을 보기좋은 형태로
print(mycttime)
#Fri Jul 15 11:19:29 2022

# for i in range(1,3) :
#     print (i)
#     time.sleep(1) # 1초씩 쉬면서 나와라
# # 1 (1초쉬고)
# # 2

#------------------random의 함수-------------------
import random

print(random.random()) # 소수 아무숫자 랜덤으로
print(random.randint(1,10)) # 1,10 까지 랜덤으로 (뒷자리포함)
print(random.randrange(1,10)) # 1,9 까지 랜덤으로 (뒷자리미포함)

#------------------webbrowser의 함수-------------------
import webbrowser
webbrowser.open("http://google.com") #구글사이트 오픈

#------------------glob의 함수-------------------
import glob # 경로 내의 폴더/ 파일 목록 조회
print(glob.glob("*.py")) # 확장자가 py인 모든파일

#------------------os의 함수-------------------
import os # 운영체제에서 제공하는 기본 기능
print(os.getcwd()) #현재 디렉토리

folder = "sample"
if os.path.exists(folder) : #folder(sample이라는 이름이 정의된 변수)가 현 파일에 존재한다면,
    print("이미 존재하는 폴더입니다")
    os.rmdir(folder)
    print(folder,"폴더를 삭제하였습니다.") #폴더를 삭제
else:
    os.makedirs(folder) #폴더를 생성
    print(folder,"폴더를 생성하였습니다.")
print(os.listdir()) # glob와 비슷하게 현 폴더의 들어있는 파일

#------------------datetime의 함수-------------------
import datetime
print("오늘날짜는 ", datetime.date.today())

today = datetime.date.today() # 오늘날짜 저장
td = datetime.timedelta(days=100) # timedelta 는 두날짜 사이 간격, 100일저장
print("우리가 만난지 100일은", today + td) # 오늘부터 100일이후
