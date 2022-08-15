def profile (name, age, lan1, lan2, lan3) :
    print ("My name is {}, My age is {}, The language I know is {}".format(name,age,lan1),end="")
    if lan2 :
        print(",",lan2,end="")
        if lan3 :
            print(",",lan3,end="")
    print()


name = input("What is your name?")
age = input("What about Age?")
lan1 = input("What language do you use?")
lan2 =""
lan3 =""

while True :
    Y_or_N = input("Anything else? [Y/N]")
    if Y_or_N != "Y" and Y_or_N != "N" :
        print ("Wrong input! please input again.")
        continue
    elif Y_or_N == "Y":
        lan2 = input("What language do you use?")
        while True :
            Y_or_N = input("Anything else? [Y/N]")
            if Y_or_N != "Y" and Y_or_N != "N" :
                print ("Wrong input! please input again.")
                continue
            elif Y_or_N == "Y":
                lan3 = input("What language do you use?")
                break
            elif Y_or_N == "N":
                break
        break
    elif Y_or_N == "N":
        break 

profile(name,age,lan1,lan2,lan3)

