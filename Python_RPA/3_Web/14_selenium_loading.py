

from selenium import webdriver

from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

url = "https://flight.naver.com/"
browser = webdriver.Chrome()  # ("./chromedriver.exe") -> 같은경로에 있으면 없어도되고 아니면 경로를입력
browser.maximize_window() # 창 최대화


browser.get(url) # url로 이동

# 여행 날짜 정하기
browser.find_element(By.XPATH, "//*[@id='__next']/div/div[1]/div[4]/div/div/div[2]/div[2]/button[1]").click()
browser.find_element(By.XPATH, "//*[@id='__next']/div/div[1]/div[9]/div[2]/div[1]/div[2]/div/div[2]/table/tbody/tr[5]/td[4]").click()
browser.find_element(By.XPATH, "//*[@id='__next']/div/div[1]/div[9]/div[2]/div[1]/div[2]/div/div[4]/table/tbody/tr[3]/td[4]").click()

# 제주도 선택

browser.find_element(By.XPATH, "//*[@id=\"__next\"]/div/div[1]/div[4]/div/div/div[2]/div[1]/button[2]").click()
time.sleep(2)
browser.find_element(By.XPATH, "//*[@id=\"__next\"]/div/div[1]/div[9]/div[2]/section/section/button[1]").click()
browser.find_element(By.XPATH, "//*[@id=\"__next\"]/div/div[1]/div[9]/div[2]/section/section/div/button[2]").click()
browser.find_element(By.XPATH, "//*[@id=\"__next\"]/div/div[1]/div[4]/div/div/button").click()

try :
    # 로딩풀리면 동작
    elem = WebDriverWait(browser, 10).until(EC.presence_of_element_located((By.CSS_SELECTOR,".table.table-condensed"))) # css(클래스)는 .을 맨앞과 space에 붙여줘야함
    print(elem.text)# 첫번쨰 결과 출력
except :
    print("fail")
    # browser.quit()
