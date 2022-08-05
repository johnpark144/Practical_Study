from random import *
online = randint(4,28)
while True :
    offline1 = randint(4,28)
    if offline1 == online:
        continue
    else :
        break

while True :
    offline2 = randint(4,28)
    if offline2 == online or offline2 == offline1 :
        continue
    else :
        break

while True :
    offline3 = randint(4,28)
    if offline3 == online or offline3 == offline1 or offline3 == offline2  :
        continue
    else :
        break

for_sort = [offline1, offline2, offline3]
for_sort.sort()

def th_or_not(value) :
    if value != 1 and value != 2 and value != 3 and value != 11 \
    and value != 12 and value != 13 and value != 21 and value != 22 and value != 22 and value != 23 :
        return str(value) + "th"
    elif value == 1 or value == 11 or value == 21 :
        return str(value) + "st"
    elif value == 2 or value == 12 or value == 22 :
        return str(value) + "nd"
    elif value == 3 or value == 13 or value == 23 :
        return str(value) + "rd"

online = th_or_not(online)
for_sort[0] = th_or_not(for_sort[0])
for_sort[1] = th_or_not(for_sort[1])
for_sort[2] = th_or_not(for_sort[2])

print ("online : %s, offfline : %s, %s, %s," %(online, for_sort[0], for_sort[1], for_sort[2]))