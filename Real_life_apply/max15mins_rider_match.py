from random import *
total =0
for i in range(1,51) :
   time = randint(5,50)
   if 5 <= time <= 15:
    print ("[0] customer %s : %smins" %(i,time))
    total += 1
   else :
    print("[ ] customer %s : %smins" %(i,time))

print("total rider is '%s'" %total)
   

    
