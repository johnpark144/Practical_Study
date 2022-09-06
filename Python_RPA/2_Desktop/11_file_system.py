# 파일 기본
from ast import pattern
import os
import shutil # shell utilities,

# print(os.getcwd()) # current working directory 현재 작업 공간
# os.chdir("rpa_basic") # rpa_basic 으로 작업 공간 이동
# print(os.getcwd())
# os.chdir("../..") # 조부모 폴더로 이동
# print(os.getcwd())
# os.chdir("C:/") # 주어진 절대 경로로 이동
# print(os.getcwd())

# 파일 경로 만들기
# file_path =  os.path.join(os.getcwd(), "my_file.txt") # 절대 경로 생성
# print(file_path)

# 파일 경로에서 폴더 정보 가져오기
# print(os.path.dirname(r"C:\coding\my_file.txt"))

# 파일 정보 가져오기
# import time
# import datetime

# from numpy import size
# file_path = "check_box.png"

# # 파일의 생성 날짜
# ctime = os.path.getctime(file_path)

# # 날짜를 strftime을 통해 연월일 시분초 형태로 출력
# # print(datetime.datetime.fromtimestamp(ctime))로만 해도 출력가능
# print(datetime.datetime.fromtimestamp(ctime).strftime("%Y %m %d %H:%M:%S")) # ctime은 생성날짜 (create)

# # 파일의 수정 날짜
# mtime = os.path.getmtime(file_path)
# print(datetime.datetime.fromtimestamp(mtime).strftime("%Y %m %d %H:%M:%S")) # mtime은 수정날짜 (modify)

# # 파일의 마지막 접근 날짜
# atime = os.path.getatime(file_path)
# print(datetime.datetime.fromtimestamp(atime).strftime("%Y %m %d %H:%M:%S")) # atime은 수정날짜 (access)

# # 파일 크기
# size = os.path.getsize(file_path)
# print(size) # 바이트 단위로 파일크기 가져오기


# 파일 목록 가져오기
# print(os.listdir()) # 모든 폴더, 파일 목록 가져오기
# print(os.listdir("RPA_basic")) # 주어진 폴더 밑에서 모든 폴더, 파일 목록 가져오기

# 파일 목록 가져오기 (하위폴더 포함)
# result = os.walk("RPA_basic") # 주어진 폴더 밑에서 모든 폴더, 파일 목록 가져오기 ( . 찍으면 현재 폴더에서)

# for root, dirs, files in result :
#     print(root, dirs, files)

# 만약 폴더 내에서 특정 파일들을 찾으려면?
# name = "11_file_system.py"
# result = []
# for root, dirs, files in os.walk(".") :
#     if name in files:
#         result.append(os.path.join(root, name))
# print(result)

# 만약 폴더 내에서 특정 패턴을 가진 파일들을 찾으려면?
# *.xlsx, *.txt, 자동화*.png
# import fnmatch
# pattern = "file*.png" # file로시작하고 .png로 끝나는 모든 파일
# result = []
# for root, dirs, files in os.walk(".") :
#     for name in files:
#         if fnmatch.fnmatch(name, pattern): # 이름이 패턴과 일치하면
#             result.append(os.path.join(root, name))
# print(result)

# 주어진 경로가 파일인지? 폴더인지?
# print(os.path.isdir("RPA_basic")) # RPA_basic은 폴더인가 ? True
# print(os.path.isfile("RPA_basic")) # RPA_basic은 파일인가 ? False
# 만약에 지정된 경로에 해당하는 파일 or 폴더가 없다면?
# print(os.path.isdir("asdjknf")) # asdjknf라는 파일이나 폴더가 없어서 False

# 주어진 경로가 존재하는지?
# if os.path.exists("RPA_basic"):
#     print("파일 또는 폴더가 존재함")
# else :
#     print("파일 또는 폴더가 존재하지 않음")

# 파일 만들기
# open("new_file.txt", "a").close() # 빈 파일 생성
# 파일명 변경하기 (폴더명 변경도 동일)
# os.rename("new_file.txt", "new_file_rename.txt") # new_file_rename.txt로 이름변경
# 파일 삭제하기
# os.remove("new_file_rename.txt")
# 파일 복사하기
# 어떤 파일을 폴더 안으로 복사하기 (import shutil)
# shutil.copy("check_box.png","test_folder") # 원본 파일 경로, 대상 폴더 경로
# shutil.copy("check_box.png","test_folder/copied.png") # 원본 파일 경로, 대상 폴더 경로(변경된 파일명)
# shutil.copyfile("check_box.png","test_folder/copied2.png") # 원본 파일 경로, 대상 폴더 경로만(변경된 파일명)

# 폴더 만들기
# os.mkdir("new_folder") # 현재 경로 기준으로 폴더 생성
# os.makedirs("new_folder/a/b/c") # 하위 폴더를 가지는 폴더 생성
# 폴더 삭제하기
# os.rmdir("new_folder") # 폴더 안이 비어있을때만 가능
# shutil.rmtree("new_folder") # 폴더 안이 비어있지 않아도 완전삭제 가능 / 모든 파일이 삭제되기 떄문에 주의! 
# 폴더 복사
# shutil.copytree("test_folder","test_folder2") # 원본 폴더 경로, 대상 폴더 경로
# 폴더 이동
# shutil.move("test_folder2","test_folder") # 원본 폴더 경로, 대상 폴더 경로 / 대상폴더가 없으면 이름이 변경됨



