#######################################################
import requests
from bs4 import BeautifulSoup
headers = {"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36"}
url = "https://comic.naver.com/webtoon/weekday"
res = requests.get(url, headers=headers)
res.raise_for_status()

soup = BeautifulSoup(res.text, "lxml")
########################################################
print(soup.title.get_text())
print(soup.a) # soup 객체에서 처음 발견되는 a element 출력
print(soup.a.attrs) # a element의 속성 정보를 출력
print(soup.a["href"]) # a element의 href 속성 '값' 정보를 출력

print(soup.find("a", attrs={"class" : "Nbtn_upload"})) # class = "Nbtn_upload" 인 a element 를 찾아줘
print(soup.find(attrs={"class" : "Nbtn_upload"})) # class = "Nbtn_upload" 인 어떤 element 를 찾아줘

print(soup.find("li", attrs={"class" : "rank01"}))
rank1 = soup.find("li", attrs={"class" : "rank01"})
rank2 = rank1.next_sibling.next_sibling
rank3 = rank2.next_sibling.next_sibling
print(rank1.a.get_text())
print(rank2.a.get_text())
print(rank3.a.get_text())

rank2 = rank1.find_next_sibling("li") # li에 해당하는 다음 형제찾기
print(rank2.a.get_text())

rank3_previous = rank3.previous_sibling.previous_sibling
print(rank3_previous.a.get_text()) # rank2랑 같음

print(rank1.parent)

print(rank1.find_next_siblings("li"))

webtoon = soup.find("a", text = "조조코믹스-안 하던 짓 4화 : 혼자 살고 싶다")
print(webtoon)


