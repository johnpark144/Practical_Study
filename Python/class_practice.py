class House :
    def __init__(self, location, house_type, deal_type, price, completion_year):
        self.location = location
        self.house_type = house_type
        self.deal_type = deal_type
        self.price = price
        self.completion_year = completion_year

    def show_detail(self):
        print("{} {} {} {} {}년".format(self.location, self.house_type, self.deal_type,\
            self.price, self.completion_year))

houses = []    
house1 = House("강남", "아파트", "매매", "10억", 2010)
house2 = House("마포", "오피스텔", "전세", "5억", 2007)
house3 = House("송파", "빌라", "월세", "500/50", 2000)

houses.append(house1)
houses.append(house2)
houses.append(house3)

print("총 {}대의 매물이 있습니다.".format(len(houses)))

for house in houses :
    house.show_detail()
