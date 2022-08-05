try:
    print("This is Four fundamental calculator")
    num1 = int(input("Input first number : "))
    pmmd = input("[+, -, *, /]")
    num2 = int(input("Input second number : "))

    if pmmd == "+" :
        result = num1 + num2

    elif pmmd == "-" :
        result = num1 - num2

    elif pmmd == "*" :
        result = num1 * num2

    elif pmmd == "/" :
        result = num1 / num2

    print("{} {} {} = {}".format(num1, pmmd, num2, result))
except ValueError :
    print("Please input a number")
except ZeroDivisionError :
    print("You can't divide it by '0'")
except NameError :
    print ("please pick out of [+,-,*,/] ")