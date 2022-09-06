from turtle import right
import pyautogui
w = pyautogui.getWindowsWithTitle('제목 없음')[0] # 메모장 1개 띄운 상태
w.activate()
w.maximize()

# pyautogui.write("12345#$5^") # 타이핑기능 (한글안됨, pyperclip패키지 다운받아서 클립보드에 저장후 붙여 넣어야함)
# pyautogui.write("Nadocoding", interval=0.1) # 타이핑 시간간격

# pyautogui.write(["t","e","s","t","left","left","right","l","a","enter"], interval = 0.2)
# t e s t 순서대로 적고 왼쪽방향키 2번, 오른쪽 한번, l, a 적고 enter키 입력

# 특수 문자
# pyautogui.keyDown("Shift") # shift 누른 상태에서
# pyautogui.press("4") # 숫자 4를 입력하고
# pyautogui.keyUp("shift") # shift 키를 뗀다 ($ 표시)

# 조합키(Hot key) (수동으로) 
# pyautogui.keyDown("ctrl")
# pyautogui.keyDown("a")
# pyautogui.keyUp("a")
# pyautogui.keyUp("ctrl") # ctrl + a : 전체선택

# 간편한 조합키 (Hot key)
# pyautogui.hotkey("ctrl", "alt", "delete") # ctrl > alt > shift > shift 뗌 > alt 뗌 > ctrl 뗌
# pyautogui.hotkey("alt", "f4")

import pyperclip
# pyperclip.copy("나도코딩") # "나도코딩"이라는 글자를 클립보드에 저장
# pyautogui.hotkey("ctrl", "v") # 붙여넣기

def my_write(text): # 함수로 저장해서 간편하게 사용
    pyperclip.copy(text)
    pyautogui.hotkey("ctrl", "v")

my_write("니도 코딩")

# win : ctrl + alt + del -> 자동화 프로그램 종료

