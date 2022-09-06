#################################################################################
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By # 대소문자 조심
import time
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

browser = webdriver.Chrome()
browser.maximize_window()

browser.get('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_input_type_radio')

#################################################################################

browser.switch_to.frame('iframeResult') # frame 전환 (다른 frame이 있을때 전환해 주지않으면 접근불가)

def select_radid_button(elem) :
    elem = browser.find_element(By.XPATH, elem)
    # 선택이 안되어 있으면 선택하기
    if elem.is_selected() == False : # 라디오 버튼이 선택되어 있지 않으면
        print("선택 안되어 있으므로 선택하기")
        elem.click()
    else : # 선택되어 있다면
        print("선택 되어 있으므로 아무동작 안함")

select_radid_button('//*[@id="html"]')
time.sleep(0.5)
select_radid_button('//*[@id="css"]')
time.sleep(0.5)
select_radid_button('//*[@id="css"]')
time.sleep(0.5)
select_radid_button('//*[@id="javascript"]')

time.sleep(1)
browser.close()