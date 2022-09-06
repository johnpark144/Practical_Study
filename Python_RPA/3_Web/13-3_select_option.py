#################################################################################
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By # 대소문자 조심
import time
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

browser = webdriver.Chrome()
browser.maximize_window()

browser.get('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml_option')

#################################################################################

browser.switch_to.frame('iframeResult') # frame 전환 (다른 frame이 있을때 전환해 주지않으면 접근불가)

# cars에 해당하는 element 를 찾고, 드롭다운 내부에 있는 4번째 옵션을 선택
elem = browser.find_element(By.XPATH, '//*[@id="cars"]/option[4]')
# option[4]
# option[4]
# ...
elem.click()
time.sleep(1)

# 텍스트 값을 통해서 선택하는 방법
elem = browser.find_element(By.XPATH,'//*[@id="cars"]/option[text()="Saab"]') # text값을 줘서 선택가능, 만에하나 나중에 항목이 추가될때 유용함
elem.click()
time.sleep(1)

# 텍스트 값이 부분 일치한 항목 선택하는 방법
elem = browser.find_element(By.XPATH,'//*[@id="cars"]/option[contains(text(), "Op")]') # text값의 비슷한 부분 있을때
elem.click()

# time.sleep(2)
# browser.quit()