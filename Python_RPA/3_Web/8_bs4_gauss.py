########################################################
from turtle import title
import requests
from bs4 import BeautifulSoup

url = "https://comic.naver.com/webtoon/list?titleId=675554"
res = requests.get(url)
res.raise_for_status()

soup = BeautifulSoup(res.text, "lxml")
########################################################

# 만화 제목과 링크 가져오기
cartoons = soup.find_all("td", attrs={"class":"title"})
for cartoon in cartoons :
    title = cartoon.a.get_text()
    link = cartoon.a["href"]
    print(title)
    print("https://comic.naver.com"+ link)

# 평점 구하기
total_rates = 0
cartoons = soup.find_all("div", attrs={"class" : "rating_type"})
for cartoon in cartoons :
    star = cartoon.find("strong").get_text()
    print(star)
    total_rates += float(star)
print("평균 평점 : {:.2f}".format(total_rates/len(cartoons)))

# # 만화 제목과 평점과 링크 같이
# cartoons = soup.find_all("td", attrs={"class":"title"})
# cartoonstars = soup.find_all("div", attrs={"class" : "rating_type"})
# cartoons = list(zip(cartoons,cartoonstars))

# for cartoon, cartoonstar in cartoons :
#     title = cartoon.a.get_text()
#     link = cartoon.a["href"]
#     star = cartoonstar.find("strong").get_text()
#     print(title, "// 평점:"+star)
#     print("https://comic.naver.com"+ link)
