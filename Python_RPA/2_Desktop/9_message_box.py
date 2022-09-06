import pyautogui
# pyautogui.countdown(3) # 카운트 다운
# print("자동화 시작")

pyautogui.alert("자동화 수행 실패","경고") # 확인 버튼만 있는 팝업
result = pyautogui.confirm("계속 진행하겠습니까?", "확인") # 확인, 취소 버튼을 result에 저장
print(result)
result = pyautogui.prompt("파일명을 무엇으로 하시겠습니까?" "입력") # 사용자 입력
print(result)
result = pyautogui.password("암호를 입력하세요") # 암호 입력
print(result)