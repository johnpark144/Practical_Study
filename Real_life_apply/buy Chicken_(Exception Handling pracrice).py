from logging import exception
class SoldOutError(Exception) :
    pass

chicken = 10
while True :
    try :
        sold = int(input("How many chicken do you want to buy?  [number in stock : {}]".format(chicken)))
        if sold <= 0 :
            raise ValueError
        elif sold < chicken :
            chicken -= sold
            print("You bought {}.".format(sold))
            while True :
                try :
                    Y_or_N = input("Do you want to buy more? [Y/N]")
                    if Y_or_N != "Y" and Y_or_N != "N" :
                        raise ValueError
                    elif Y_or_N == "Y" :
                        break
                    elif Y_or_N == "N" :
                        break
                except ValueError :
                    print("You input a wrong value.")
            if Y_or_N == "N" :
                break
        elif sold == chicken :
            sold = 0
            chicken = 0
            print("You have bought all, so we close today")
            break
        elif sold > chicken :
            raise SoldOutError
    except ValueError :
        print("You input a wrong value.")
    except SoldOutError :
        print("We have not too much chicken to buy that much.")
print("Thank you for visiting us, \n see you later.")