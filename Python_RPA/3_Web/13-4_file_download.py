#################################################################################
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By # 대소문자 조심
import time
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

from selenium.webdriver.chrome.options import Options # 특정 부분에 다운로드 하기위하여 옵션을 불러옴 (필수 프레임x)
chrome_options = Options() # Options 클래스를 chrome_options담고 진행
chrome_options.add_experimental_option('prefs',{'download.default_directory' :r'C:\coding'}) # 다운로드할 경로를 옵션으로 지정

browser = webdriver.Chrome(options=chrome_options)
browser.maximize_window()

browser.get('https://www.w3schools.com/tags/tryit.asp?filename=tryhtml5_a_download')

#################################################################################

browser.switch_to.frame('iframeResult') # frame 전환 (다른 frame이 있을때 전환해 주지않으면 접근불가)

elem = browser.find_element(By.XPATH,'/html/body/p[2]/a/img')
elem.click()

time.sleep(2)
browser.quit()