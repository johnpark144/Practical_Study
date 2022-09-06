#################################################################################
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

browser = webdriver.Chrome()
browser.maximize_window()

browser.get('https://www.w3schools.com/')

#################################################################################

browser.execute_script("window.scrollTo(0, 700)")

elem = browser.find_element(By.CSS_SELECTOR,".w3-button.tut-button") 
elem.click()

browser.find_element(By.XPATH,'//*[@id="topnav"]/div/div[1]/a[10]').click()

time.sleep(0.5)
# 특정 영역 까지 스크롤
elem = browser.find_element(By.XPATH,'//*[@id="leftmenuinnerinner"]/a[118]')
elem.location_once_scrolled_into_view

browser.find_element(By.XPATH,'//*[@id="leftmenuinnerinner"]/a[contains(text(), "Contact")]').click()

browser.find_element(By.NAME,"firstname").send_keys("나도")
browser.find_element(By.NAME,"lastname").send_keys("코딩")
browser.find_element(By.XPATH,'//*[@id="country"]/option[contains(text(), "Can")]').click()
browser.find_element(By.XPATH,'//*[@id="main"]/div[3]/textarea').send_keys("퀴즈완료")
time.sleep(2)
browser.find_element(By.XPATH,'//*[@id="main"]/div[3]/a').click()
time.sleep(2)
browser.quit()
