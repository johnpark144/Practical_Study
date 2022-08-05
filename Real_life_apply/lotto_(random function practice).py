from random import *

lotto =[]
for i in range(1,7) :
    number = int(random()*45) + 1
    lotto.append(number)
print(lotto)
