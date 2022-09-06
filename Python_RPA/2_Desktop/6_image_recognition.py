from socket import timeout
import pyautogui
pyautogui.PAUSE = 1 # 모든 동작에 1초씩 sleep 적용

# file_menu = pyautogui.locateOnScreen("file_menu.png") # 팁! : window + shift + s 버튼눌러서 이미지부분 스샷
# # print(file_menu)
# pyautogui.click(file_menu)

# trash = pyautogui.locateOnScreen("trash.png")
# pyautogui.moveTo(trash)

# chrome = pyautogui.locateOnScreen("chrome.png")
# pyautogui.click(chrome)


# # 똑같은 그림이 두개 이상인경우
# for i in pyautogui.locateAllOnScreen("check_box.png") :
#     pyautogui.click(i)

# for idx, i in enumerate(pyautogui.locateAllOnScreen("check_box.png")) :
#     if idx == 0 : # 처음꺼 생략
#         continue
#     pyautogui.click(i)


# 속도 개선
# 1. Grayscale (컬러 이미지를 흑백으로 전환한 다음 비교)
# trash = pyautogui.locateOnScreen("trash.png", grayscale = True) # 속도up, but 정확도down
# pyautogui.moveTo(trash)

# 2. 범위 지정
# trash = pyautogui.locateOnScreen("trash.png", region = (1144, 423, 1356-1144, 507-423)) #(x,y,width,height)
# pyautogui.moveTo(trash) # 1144,423 좌표부터 1356,507 좌표까지의 주어진 범위내에서 찾아 이동

# 정확도 개선
# trash = pyautogui.locateOnScreen("trash.png", confidence = 0.8) # 정확도가 90프로이상이면 실행 (pip install opencv- python해서 설치후)
# pyautogui.moveTo(trash)


# 자동화 대상이 바로 보여지지 않는 경우
# 1. 계속 기다리기
# coding = pyautogui.locateOnScreen("coding.png")
# count = 0
# while coding is None :
#     coding = pyautogui.locateOnScreen("coding.png")
#     print(f"발견실패{count}")
#     count += 1
# pyautogui.click(coding)
# print(f"발견성공{count}")

# 2. 일정 시간동안 기다리기 (TimeOut)
import time
import sys

# timeout = 10 # 10초 대기
# start = time.time() # 시작 시간 설정 (while밖이라 고정값)
# coding = None
# while coding is None :
#     coding = pyautogui.locateOnScreen("coding.png")
#     end = time.time() # 종료 시간 설정 (while안이라서 값이 바뀜)
#     if end - start > timeout : # 지정한 10초를 초과하면
#         print("타임 오버")
#         sys.exit()
# pyautogui.click(coding)

timeout = 10 # 10초 대기
def find_target(img_file, timeout=30):
    start = time.time()
    target = None
    while target is None:
        target = pyautogui.locateOnScreen(img_file)
        end = time.time()
        if end - start > timeout:
            break
    return target

def my_click(img_file, timeout=30):
    target = find_target(img_file, timeout)
    if target:
        pyautogui.click(target)
    else:
        print(f"[Timeout {timeout}s] Target not found ({img_file}). Terminate program")
        sys.exit()

my_click("coding.png", 3)

