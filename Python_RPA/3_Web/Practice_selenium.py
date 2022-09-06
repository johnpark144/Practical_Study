#################################################################################
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import time
import urllib.request
import ssl
ssl._create_default_https_context = ssl._create_unverified_context

driver = webdriver.Chrome()
driver.get("https://www.google.com/imghp?hl=ko&ogbl")

#################################################################################

driver.maximize_window()
elem = driver.find_element(By.NAME, "q")
elem.send_keys("파이썬") # 키입력
elem.send_keys(Keys.RETURN) # enter

interval = 2 # 2초에 한번씩 스크롤 내림

#현재 문서 높이를 가져와서 저장
prev_height = driver.execute_script("return document.body.scrollHeight")
while True :
    # 스크롤을 가장 아래로 내림
    driver.execute_script("window.scrollTo(0, document.body.scrollHeight)")

    # 페이지 로딩 대기
    time.sleep(interval)
    
    #현재 문서 높이를 가져와서 저장
    curr_height = driver.execute_script("return document.body.scrollHeight")
    if curr_height == prev_height:
        try :
            driver.find_element(By.CSS_SELECTOR,".mye4qd").click() # 스크롤 다 내렸을때 더보기 시도, css_selector할때 맨앞과 빈칸에 .붙임
        except :
            break
    prev_height = curr_height

images = driver.find_elements(By.CSS_SELECTOR,".isv-r.PNCib.MSM1fd.BUooTd")

driver.execute_script("window.scrollTo(0,0)")

for idx, image in enumerate(images) :
    try :
        image.click()
        time.sleep(2)
        img_url = driver.find_element(By.CSS_SELECTOR,".n3VNCb.KAlRDb").get_attribute('src')
        urllib.request.urlretrieve(img_url, "test{}.jpg".format(idx+1))
    except :
        pass



# assert "Python" in driver.title
# elem = driver.find_element(By.NAME, "q")
# elem.clear()
# elem.send_keys("pycon")
# elem.send_keys(Keys.RETURN)
# assert "No results found." not in driver.page_source
# driver.close()