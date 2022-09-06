import requests
from bs4 import BeautifulSoup
import re

def create_soup(url) : # Neccesary frame for bs4, requests
    res = requests.get(url)
    res.raise_for_status()
    soup = BeautifulSoup(res.text, 'lxml')
    return soup

def today_weather():
    print("[Today weather]")
    url = "https://weather.com/weather/today/l/Pasadena+TX?canonicalCityId=e59f93f0b8109855fb22d1a55ffc654fec2e91cf21e75a8a1a425024a908efc1" # the Weather website around my location
    soup = create_soup(url)

    cast = soup.find("div", attrs={"class":"CurrentConditions--header--27uOE"}).get_text() # Pasadena, TX As of now
    curr_temp = soup.find("span", attrs={"class":"CurrentConditions--tempValue--3a50n"}).get_text() # Temperature
    feels_like = soup.find("span",attrs={"class":"TodayDetailsCard--feelsLikeTempValue--Cf9Sl"}).get_text() # feels like
    Humidity = soup.find("span",attrs={"data-testid":"PercentageValue"}).get_text() # Humidity
    rainfall = soup.find("div",attrs={"id":"WxuDailyWeatherCard-main-bb1a17e7-dc20-421a-b1b8-c117308c6626"}).find("span",attrs={"class":"Column--precip--2ck8J"}).get_text() # Chance of Rain
    high_low = soup.find("div",attrs={"data-testid":"wxData"}).get_text() # Highest,Lowest temperature

    highest = high_low[0:high_low.index("/")] # Highest part slice
    lowest = high_low[high_low.index("/")+1:] # Lowest part slice

    print(cast)
    print(f"Current temperature : {curr_temp}")
    print(f"feels like : {feels_like}")
    print(f"highest : {highest}")
    print(f"lowest : {lowest}")
    print(f"Humidity : {Humidity}")
    rain_idx = rainfall.find("n",rainfall.find("n")+1) + 1 # To put ":" between
    print(f"{rainfall[:rain_idx]} : {rainfall[rain_idx:]}")
    print()


def headline_news() :
    print("[Headline News]")
    url = "https://www.houstonchronicle.com/" # Houston local news site
    soup = create_soup(url)
    news_list = soup.find_all("li", attrs={"class":re.compile("^coreHeadlineList--item")})

    for index, news in enumerate(news_list) :
        title = news.get_text().strip()
        link = news.a.attrs['href']
        if link.startswith("https"):
            print("{}.{}".format(index+1, title))
            print(" (Link : {}".format(link))
        else :
            print("{}.{}".format(index+1, title))
            print(" (Link : https://www.houstonchronicle.com{}".format(link)) # because there are many link without initial part
        print()

        if index + 1 == 8: # only 8 article
            break


def daily_korean() :
    print("[Today study - KOREAN]")
    url = "https://www.hackers.co.kr/?c=s_eng/eng_contents/I_others_english&keywd=haceng_submain_lnb_eng_I_others_english&logger_kw=haceng_submain_lnb_eng_I_others_english#;" # Korean-English Daily conversation website
    soup = create_soup(url)

    sentences = soup.find_all("div", attrs={"class":"conv_txt"})
    for index, sentence_kor in enumerate(sentences[0]) : # Korean part
        sentence_kor = sentence_kor.get_text().strip()
        if not sentence_kor : # To remove blank spot
            continue
        print(sentence_kor)
    print()

    sentences = soup.find_all("div", attrs={"class":"conv_txt"})
    for index, sentence_eng in enumerate(sentences[1]) : # English part
        sentence_eng = sentence_eng.get_text().strip()
        if not sentence_eng : # To remove blank spot
            continue
        print(sentence_eng)
    print()

        
if __name__ == "__main__": # It is not called when called from other modules
    today_weather()
    headline_news()
    daily_korean()