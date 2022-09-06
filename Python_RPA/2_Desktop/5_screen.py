import pyautogui

# # 스크린샷 찍기
# img = pyautogui.screenshot() # 스크린샷
# img.save("screenshot.png") # 스샷한 파일을 저장

# pyautogui.mouseInfo()

# 24,14 60,169,242 #3CA9F2

pixel = pyautogui.pixel(24,14)
print(pixel)

# print(pyautogui.pixelMatchesColor(24,14,(60,169,242)))
# print(pyautogui.pixelMatchesColor(24,14,pixel))
print(pyautogui.pixelMatchesColor(24,14,pixel))