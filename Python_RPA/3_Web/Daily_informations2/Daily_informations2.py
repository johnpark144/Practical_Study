import time
from selenium import webdriver
from selenium.webdriver.common.by import By
import ssl
ssl._create_default_https_context = ssl._create_unverified_context
options = webdriver.ChromeOptions()
options.headless = True
options.add_argument('--log-level=1') # To accesss thru headless
driver = webdriver.Chrome(options=options)

### Current Traffic informations
def traffic():
    # Incidents
    driver.get("http://traffic.houstontranstar.org/roadclosures/#freeway") # Houston traffic information website
    time.sleep(1)
    print("[Houston Freeway incidents]")
    for tr in range(1,100):
        try :
            for td in range(1,7):
                elem = driver.find_element(By.XPATH,'//*[@id="freeway"]/div[2]/table/tbody/tr[{}]/td[{}]'.format(tr,td)) # To print cell by cell, defined tr, td        
                if td == 1 :
                    print("{}. Location : {}".format(tr, elem.text),end=" ") # 1st line(Location)
                elif td == 2 :
                    print("({})".format(elem.text),end=" ") # 1st line(Description)
                elif td == 3 :
                    print("({} vehicles invloved)".format(elem.text)) # 1st line(Vehicles Involved)
                elif td == 4 :
                    print("Lanes Affected :",elem.text,end=" ") # 2nd line(Lanes Affected)
                elif td == 5 :
                    print("({})".format(elem.text)) # 2nd line(Status)
                elif td == 6 :
                    # 3rd line(Link)
                    print("Map link :",elem.find_element(By.XPATH,f'//*[@id="freeway"]/div[2]/table/tbody/tr[{tr}]/td[6]/a').get_attribute('href')) 
            print()

        except :
            if tr == 1 and td == 1: # when tr,td = 1, namely no incidents so Error happen
                print("No incident is found")
            print()
            break
    
    # Stalls
    driver.find_element("xpath", '//*[@id="navTabs"]/li[3]').click()
    time.sleep(1)
    print("[Houston stalls]")
    for tr in range(1,100):
        try :
            for td in range(1,6):
                elem = driver.find_element(By.XPATH,'//*[@id="stalls"]/div[2]/table/tbody/tr[{}]/td[{}]'
                .format(tr,td))         
                if td == 1 :
                    print("{}. Location : {}".format(tr, elem.text), end=" ")
                elif td == 2 :
                    print("({})".format(elem.text))           
                elif td == 3 :
                    print("Lanes Affected :",elem.text, end=" ")
                elif td == 4 :
                    print("({})".format(elem.text))
                elif td == 5 :
                    print("Map link :",elem.find_element(By.XPATH,f'//*[@id="stalls"]/div[2]/table/tbody/tr[{tr}]/td[5]/a').get_attribute('href')) 
            print()
        except :
            if tr == 1 and td == 1 :
                print("No stalls is found")
            print()
            break

### Current Amazon Today's deal(70% off or more)
def amazon():
    driver.get("https://www.amazon.com/deals?ref_=nav_cs_gb&deals-widget=%257B%2522version%2522%253A1%252C%2522viewIndex%2522%253A0%252C%2522presetId%2522%253A%2522EE2E9BCF5784A48C27BC19C9E6BB1DC0%2522%252C%2522discountRanges%2522%253A%255B%257B%2522sectionText%2522%253A%2522Discount%2522%252C%2522optionText%2522%253A%252210%2525%2520off%2520or%2520more%2522%252C%2522from%2522%253A10%252C%2522to%2522%253Anull%252C%2522selected%2522%253Afalse%257D%252C%257B%2522sectionText%2522%253A%2522Discount%2522%252C%2522optionText%2522%253A%252225%2525%2520off%2520or%2520more%2522%252C%2522from%2522%253A25%252C%2522to%2522%253Anull%252C%2522selected%2522%253Afalse%257D%252C%257B%2522sectionText%2522%253A%2522Discount%2522%252C%2522optionText%2522%253A%252250%2525%2520off%2520or%2520more%2522%252C%2522from%2522%253A50%252C%2522to%2522%253Anull%252C%2522selected%2522%253Afalse%257D%252C%257B%2522sectionText%2522%253A%2522Discount%2522%252C%2522optionText%2522%253A%252270%2525%2520off%2520or%2520more%2522%252C%2522from%2522%253A70%252C%2522to%2522%253Anull%252C%2522selected%2522%253Atrue%257D%255D%252C%2522sorting%2522%253A%2522BY_CUSTOM_CRITERION%2522%252C%2522starRating%2522%253A4%257D")
    print("[Amazon Today's deal(70% off or more)]")
    # Find all products
    elems = driver.find_elements(By.CSS_SELECTOR,'.DealGridItem-module__dealItemDisplayGrid_e7RQVFWSOrwXBX4i24Tqg.DealGridItem-module__withBorders_2jNNLI6U1oDls7Ten3Dttl.DealGridItem-module__withoutActionButton_2OI8DAanWNRCagYDL2iIqN')
    time.sleep(1)
    no_price_products = 0 # Not to count no-price products
    for i, elem in enumerate(elems) :
        try :
            if elem.find_element(By.CSS_SELECTOR,'.a-price').text : # If price exist
                print("{}.({})".format(i+1-no_price_products, elem.find_element(By.CSS_SELECTOR,'.BadgeAutomatedLabel-module__badgeAutomatedLabel_2Teem9LTaUlj6gBh5R45wd').text),end="") # Index, Discount rate
                print(elem.find_element(By.CSS_SELECTOR,'.a-price').text) # Price
                print(elem.find_element(By.CSS_SELECTOR,'.DealContent-module__truncate_sWbxETx42ZPStTc9jwySW').text[:100] + "...") # Name
                print(elem.find_element(By.CSS_SELECTOR,'.a-link-normal').get_attribute('href')) # Link
                print()

        except : # If price doesn't exist
            no_price_products += 1
            pass

        finally:
            if i + 1 - no_price_products == 10: # If the number of products printed 10 times
                print()
                break

### Recent Netflix Rankings
def rank_options(url,option_name):
    driver.get(url)
    period_of_time = driver.find_element(By.XPATH,'//*[@id="maincontent"]/div/div/div').text # To print the variable period of time
    if url == "https://top10.netflix.com/films" : # To print initially
        print("[Netflix Rankings : {}]".format(period_of_time))
    print(option_name)
    time.sleep(1)

    for tr in range(1,11):
        for td in range(1,5): 
            elem = driver.find_element(By.XPATH,'//*[@id="weekly-lists"]/div/div[5]/div/div[1]/div/table/tbody/tr[{}]/td[{}]'.format(tr,td))
            if td == 1 :
                print("Rank {}.".format(tr),end=" ") # 1st line(Rank)
            elif td == 2 :
                if tr == 10 : # To align, When it turn as 2-digit-number
                    print(elem.text.ljust(39),end=" ") # 2nd line(Name) with spaces
                else :
                    print(elem.text.ljust(40),end=" ")
            elif td == 3 : # Weeks in top 10 part skiped
                pass
            elif td == 4 : 
                print("(Hours viewed: {})".format(elem.text)) # 3rd line(HOURS VIEWED)
    print()
def netflix_rank() :
    rank_options("https://top10.netflix.com/films","Films(English)")
    rank_options("https://top10.netflix.com/films-non-english","Films(non_English)")
    rank_options("https://top10.netflix.com/tv","TV(English)")
    rank_options("https://top10.netflix.com/tv-non-english","TV(non_English)")
    
if __name__ == "__main__": # It is not called when called from other modules
    traffic()
    amazon()
    netflix_rank()


