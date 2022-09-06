import pyautogui

pyautogui.PAUSE = 0.4 # interval 0.4 secs

database = pyautogui.getWindowsWithTitle('Employees_DB')[0] # Excel file
NameTag = pyautogui.getWindowsWithTitle('NameTag')[0] # powerpoint file
num_pic = pyautogui.locateOnScreen("num_pic.png", confidence = 0.8) # the image "emplyee-number" to appoint the mouse path

try :
    num_of_imp = pyautogui.prompt("How many imployees are there in total?") # input the number of imployees
    num_of_imp = int(num_of_imp) # change the type to 'int' For the loop
    pyautogui.alert(f"It will take around {num_of_imp * 16 + 3} seconds") # Estimated taking time 
    pyautogui.alert('If you want to stop, Please press the "ctrl + alt + delete" botton \n or put the mouse cursor on the very corner of left-top') # the way to stop

    NameTag.activate() # Before the loop start, to maximize
    if NameTag.isMaximized == False :
        NameTag.maximize()

    database.activate()
    if database.isMaximized == False :
        database.maximize()

    # pyautogui.hotkey("ctrl", "home") # Cell A1

    for i in range(num_of_imp):

        # Employee_number
        pyautogui.press("down") # move to next row (Cell A1, A2, A3...)
        pyautogui.hotkey("ctrl", "c") # Copy
        NameTag.activate()
        while num_pic is None : # To wait until it recognize the image and find the part
            num_pic = pyautogui.locateOnScreen("num_pic.png")
        pyautogui.moveTo(num_pic[0]+320,num_pic[1]) # Relative coordinates based on the pics' location

        pyautogui.doubleClick()
        pyautogui.hotkey("ctrl", "v") # Paste

        pyautogui.rightClick()
        pyautogui.press("h")
        pyautogui.press("tab")
        pyautogui.press("tab")
        pyautogui.write("36") # Font size
        pyautogui.press("enter")

        # Team
        database.activate()
        pyautogui.press("right")
        pyautogui.hotkey("ctrl", "c") # Copy
        NameTag.activate()
        while num_pic is None : # To wait until it recognize the image and find the part
            num_pic = pyautogui.locateOnScreen("num_pic.png")
        pyautogui.moveTo(num_pic[0]+320,num_pic[1]+100) # Relative coordinates based on the pics' location

        pyautogui.doubleClick()
        pyautogui.hotkey("ctrl", "v") # Paste

        pyautogui.rightClick()
        pyautogui.press("h")
        pyautogui.press("tab")
        pyautogui.press("tab")
        pyautogui.write("40") # Font size
        pyautogui.press("enter")

        # Name
        database.activate()
        pyautogui.press("right")
        pyautogui.hotkey("ctrl", "c")  # Copy
        NameTag.activate()
        while num_pic is None :
            num_pic = pyautogui.locateOnScreen("num_pic.png") # To wait until it recognize the image and find the part
        pyautogui.moveTo(num_pic[0]+320,num_pic[1]+220) # Relative coordinates based on the pics' location

        pyautogui.doubleClick()
        pyautogui.hotkey("ctrl", "v") # Paste

        pyautogui.rightClick()
        pyautogui.press("h")
        pyautogui.press("tab")
        pyautogui.press("tab")
        pyautogui.write("40") # Font size
        pyautogui.press("enter")
        pyautogui.press("pagedown") # Next slide

        # For the next step
        database.activate()
        pyautogui.press("home") # move to first collumn (Cell A)

    pyautogui.alert(f"It is completed") # the Alert when it is done


except TypeError:
    pyautogui.alert("the program ended") # when cenceled the program

except ValueError:
    pyautogui.alert("You input wrong value, so the program ended") # when the value is not number
