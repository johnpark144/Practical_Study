#################################################################################
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By # 대소문자 조심
import time
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

browser = webdriver.Chrome()
browser.maximize_window()
url = "https://www.11st.co.kr/browsing/BestSeller.tmall?method=getBestSellerMain&xfrom=main^gnb#pageNum%%6"
browser.get(url)
#################################################################################

# 지정한 위치로 스크롤 내리기
# 모니터 해상도 높이인 1080 위치로 스크롤 내리기
browser.execute_script("window.scrollTo(0, 1080)") # 1920 * 1080
browser.execute_script("window.scrollTo(0, 3080)") 
# 화면 가장 아래로 스크롤 내리기
browser.execute_script("window.scrollTo(0, document.body.scrollHeight)")

interval = 1 # 1초에 한번씩 스크롤 내림

#현재 문서 높이를 가져와서 저장
prev_height = browser.execute_script("return document.body.scrollHeight")
# 반복 수행
while True :
    # 스크롤을 가장 아래로 내림
    browser.execute_script("window.scrollTo(0, document.body.scrollHeight)")
    # 페이지 로딩 대기
    time.sleep(interval)
    #현재 문서 높이를 가져와서 저장
    curr_height = browser.execute_script("return document.body.scrollHeight")
    if curr_height == prev_height:
        break
    prev_height = curr_height

browser.execute_script("window.scrollTo(0, 0)") # 맨위로

time.sleep(1)

# 특정 영역 까지 스크롤
elem = browser.find_element(By.XPATH,'//*[@id="thisClick_3728806324"]/div/a/div[1]/img') # 특정부분 (제품 400에 스크롤)
elem.location_once_scrolled_into_view # 함수 아니니까 ()x

print("스크롤 완료")