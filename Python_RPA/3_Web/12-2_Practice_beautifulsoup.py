##############################################################################################
from bs4 import BeautifulSoup
from urllib.request import urlopen
import requests
import re # 정규식용 (기본프레임x)

headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"}
url = "https://news.daum.net/"
res = requests.get(url, headers = headers)
res.raise_for_status()
soup = BeautifulSoup(res.text, "lxml")
##############################################################################################

anchors = soup.select("div.item_issue") #div에 클래스가 item_issue인것을 다찾아라

for idx, anchor in enumerate(anchors) :
    title = anchor.find("a",attrs={"class":"link_txt","data-tiara-ordnum":"{}".format(idx+1)}).get_text().strip() # 글자
    link = anchor.find("a",attrs={"class":"link_txt","data-tiara-ordnum":"{}".format(idx+1)}).attrs['href'] #하이퍼링크
    print(title, "\n", link )


##############################################################################################
images = soup.find_all("img", attrs={"class":re.compile("^thumb")})

for idx, image in enumerate(images) :
    image_url = image["src"]
    if image_url.startswith("//") :
        image_url = "http:" + image_url

    print(image_url)
    image_res = requests.get(image_url)
    image_res.raise_for_status()

    with open("img{}.jpg".format(idx + 1), "wb") as f:
        f.write(image_res.content)

    if idx >= 4: # 상위 5개이미지만 다운
        break
##############################################################################################
