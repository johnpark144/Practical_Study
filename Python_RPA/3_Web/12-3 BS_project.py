from email.mime import image
import requests
from bs4 import BeautifulSoup
import re

def create_soup(url) :
    res = requests.get(url)
    res.raise_for_status()
    soup = BeautifulSoup(res.text, 'lxml')
    return soup

def scrape_weather():
    print("[오늘의 날씨]")
    url = "https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=%EC%84%9C%EC%9A%B8%EB%82%A0%EC%94%A8"
    soup = create_soup(url)

    cast = soup.find("p", attrs={"class":"summary"}).get_text() # 날씨상태
    curr_temp = soup.find("div", attrs={"class":"temperature_text"}).get_text() # 현재온도
    curr_lowest = soup.find("span",attrs={"class":"lowest"}).get_text() # 최저기온
    curr_highest = soup.find("span",attrs={"class":"highest"}).get_text()# 최고기온
    rainfall = soup.findAll("div",attrs={"class":"cell_weather"}) # 오전, 오후강수량
    microdust = soup.find("li",attrs={"class":"item_today level2"}).find("span",attrs={"class":"txt"}).get_text() #미세먼지
    

    print(cast)
    print(curr_temp.replace(" 현재 온도","현재 온도 : "))
    print(curr_lowest.replace("최저기온","최저 기온 : "))
    print(curr_highest.replace("최고기온","최고 기온 : "))
    print("미세먼지지수 :", microdust)
    
    for i, a in enumerate(rainfall)  :
        rain = a.find("span",attrs={"class":"rainfall"}).get_text()
        if i == 0 :
            print("오전강수량 :",rain)
        if i == 1 :
            print("오후강수량 :",rain)
            break
    print()
   
# 모든요일 최저 최고 기온
    # all_temperature = soup.findAll("li", attrs={"class":re.compile('^week_item')})
    # for a in all_temperature  :
    #     lowest = a.find("span",attrs={"class":"lowest"}).get_text()
    #     highest =  a.find("span",attrs={"class":"highest"}).get_text()
    #     print(lowest, highest)

def headline_news() :
    print("[헤드라인 뉴스]")
    url = "https://news.daum.net/"
    soup = create_soup(url)
    news_list = soup.find_all("a", attrs={"class":re.compile("^link"), "data-tiara-ordnum":re.compile("\d")})

    for index, news in enumerate(news_list) :
        title = news.get_text().strip()
        link = news.attrs['href']
        print("{}.{}".format(index+1, title))
        print(" (링크 : {}".format(link))
        if index + 1 == 20:
            break
    print()

def daily_english() :
    print("[오늘의 회화 - ENGLISH]")
    url = "https://www.hackers.co.kr/?c=s_eng/eng_contents/I_others_english&keywd=haceng_submain_lnb_eng_I_others_english&logger_kw=haceng_submain_lnb_eng_I_others_english#;"
    soup = create_soup(url)

    sentences = soup.find_all("div", attrs={"class":"conv_txt"})
    for index, sentence_eng in enumerate(sentences[1]) :
        sentence_eng = sentence_eng.get_text().strip()
        if not sentence_eng :
            continue
        print(sentence_eng)
    print()

    sentences = soup.find_all("div", attrs={"class":"conv_txt"})
    for index, sentence_kor in enumerate(sentences[0]) :
        sentence_kor = sentence_kor.get_text().strip()
        if not sentence_kor :
            continue
        print(sentence_kor)
        

if __name__ == "__main__":
    scrape_weather() #오늘의 날씨 정보 가져오기
    headline_news()
    daily_english()