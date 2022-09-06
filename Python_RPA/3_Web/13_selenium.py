from selenium import webdriver
import time
import selenium

browser = webdriver.Chrome()  # ("./chromedriver.exe") -> 같은경로에 있으면 없어도되고 아니면 경로를입력
browser.maximize_window()

# 1. 네이버로 이동
browser.get("http://naver.com")

# 2. 로그인 버튼 클릭
elem = browser.find_element("xpath", "//*[@id='account']/a")
elem.click()

time.sleep(1)
browser.back() # 뒤로가기
time.sleep(1)
browser.forward() # 앞으로가기
time.sleep(1)
browser.refresh() # 새로고침
time.sleep(1)

# 3. id, pw 입력
browser.find_element("id","id").send_keys("vyckd354")
browser.find_element("id","pw").send_keys("zzzzzzzz")

# 4. 로그인 버튼 클릭
browser.find_element("id","log.login").click()

time.sleep(2)

# 5. id를 새로 입력
browser.find_element("id","id").clear()
browser.find_element("id","id").send_keys("my_id")

# 6. html 정보 출력
print(browser.page_source)

# 7. 브라우저 종료
# browser.close() # 현재 탭만 종료
browser.quit() # 전체 브라우저 종료
