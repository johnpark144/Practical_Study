import os
import pygame
import sys
from Level_1 import lev_1
from Level_2 import lev_2
from Level_3 import lev_3
from Level_4 import lev_4
from Level_5 import lev_5
from Level_6 import lev_6
from Final_Level import final
####################################################################################
# Screen initialized
pygame.init()

# Screen size
screen_width = 640
screen_height = 480
screen = pygame.display.set_mode((screen_width, screen_height))

# Game title
pygame.display.set_caption("John's_remove_balls")

# FPS
clock = pygame.time.Clock()
####################################################################################

current_path = os.path.dirname(__file__) # Current file location
image_path = os.path.join(current_path, "images") # Images folder location

# After you lose game, this happen to check whether to continue or not
def wanna_continue() : 
    for event in pygame.event.get(): # To prevent from automatical start due to hitting the space_bar
        if event.type == pygame.KEYDOWN : 
            if event.key == pygame.K_SPACE:
                pass

    global game_font, background, running, life
    background = pygame.image.load(os.path.join(image_path, "continue.png")) # Background switched to black display
    screen.blit(background, (0,0))
    game_font = pygame.font.Font(None, 40)

    life_msg = game_font.render(f"life : {life}", True, (255, 255, 255)) # Life message, White
    screen.blit(life_msg, (screen_width-100,10))
    pygame.display.update() # Redrawing the display (neccesary)

    msg = game_font.render("Do you want to continue?", True, (255, 255, 255)) # Continue message, White
    msg_rect = msg.get_rect(center=(int(screen_width / 2), int(screen_height / 2) - 50))
    screen.blit(msg, msg_rect)
    pygame.display.update()

    yes_msg = game_font.render("YES", True, (255, 255, 0)) # Yes message, Yello(default)
    yes_msg_rect = yes_msg.get_rect(center=(int(screen_width / 2), int(screen_height / 2) + 100))
    screen.blit(yes_msg, yes_msg_rect)
    pygame.display.update()

    no_msg = game_font.render("No", True, (255, 255, 255)) # No message, White(default)
    no_msg_rect = no_msg.get_rect(center=(int(screen_width / 2), int(screen_height / 2)+ 150))
    screen.blit(no_msg, no_msg_rect)
    pygame.display.update()

    space_bar_msg = pygame.font.Font(None, 20).render("to pick = <space_bar>", True, (255, 255, 255)) # to pick = <space_bar> message, white
    space_bar_msg_rect = space_bar_msg.get_rect(center=(int(screen_width / 2) + 200, int(screen_height / 2) + 130))
    screen.blit(space_bar_msg, space_bar_msg_rect)
    pygame.display.update()

    yes_or_no = 1 # default

    while running:
        for event in pygame.event.get(): # What kind of event happend?
            if event.type == pygame.QUIT: # If Quit the game
                return 0

            if event.type == pygame.KEYDOWN : # When hit some keys
                if event.key == pygame.K_UP:    # If the key is "upward" key, "Yes" turn to Yellow
                    yes_or_no = 1 # To switch the "return value"
                    yes_msg = game_font.render("YES", True, (255, 255, 0)) # Yellow
                    yes_msg_rect = yes_msg.get_rect(center=(int(screen_width / 2), int(screen_height / 2) + 100))
                    screen.blit(yes_msg, yes_msg_rect)
                    pygame.display.update() 
                    no_msg = game_font.render("No", True, (255, 255, 255)) # White
                    no_msg_rect = no_msg.get_rect(center=(int(screen_width / 2), int(screen_height / 2)+ 150))
                    screen.blit(no_msg, no_msg_rect)
                    pygame.display.update() 

                if event.key == pygame.K_DOWN: # if the key is "downward" key, "No" turn to Yellow
                    yes_or_no = 0  # To switch the "return value"
                    yes_msg = game_font.render("YES", True, (255, 255, 255)) # White
                    yes_msg_rect = yes_msg.get_rect(center=(int(screen_width / 2), int(screen_height / 2) + 100))
                    screen.blit(yes_msg, yes_msg_rect)
                    pygame.display.update() 
                    no_msg = game_font.render("No", True, (255, 255, 0)) # Yellow
                    no_msg_rect = no_msg.get_rect(center=(int(screen_width / 2), int(screen_height / 2)+ 150))
                    screen.blit(no_msg, no_msg_rect)
                    pygame.display.update()

                if event.key == pygame.K_SPACE: # When space_bar hit
                    if yes_or_no == 1: # if the key is "upward" key
                        return 1 
                    else:
                        return 0

# After all life run out, this happen to get user discontinued
def game_over_msg() :
    if life == 0 :
        global running, background
        background = pygame.image.load(os.path.join(image_path, "continue.png"))
        screen.blit(background, (0,0))

        game_over_msg = game_font.render("Game over", True, (255, 255, 255)) # "Game over" displayed, White
        game_over_msg_rect = game_over_msg.get_rect(center=(int(screen_width / 2), int(screen_height / 2) - 50))
        screen.blit(game_over_msg, game_over_msg_rect)
        pygame.display.update()

        pygame.time.delay(3000) # 3 secs after "Game over" displayed
        pygame.quit() # Quit the game
        print(sys.path)
        running = False # To prevent from automatic re-start

global running, life
running = True
life = 5


# Game start
start_msgs = [                          # First message before game start
            "- John's_remove_balls -",
            "Wellcome!",
            "move : left , right",
            "attack : <space_bar>"
            ]
i = 70
for start_msg in start_msgs :
    if start_msg == start_msgs[-2]:
        i += 150
    else :
        i += 50

    start_msg = pygame.font.Font(None, 40).render(start_msg, True, (255, 255, 0)) # First message, Yellow
    start_msg_rect = start_msg.get_rect(center=(int(screen_width / 2),  i))
    screen.blit(start_msg, start_msg_rect)
pygame.display.update()
pygame.time.delay(1500)

try :
    # Level 1 start
    while running:
        if lev_1() == 0 :   # if you lose game, you receive return value 0
            life -= 1
            game_over_msg()
            if wanna_continue() == 1: # when hit the space_bar on "Yes" which is "continue"
                continue
            raise Exception('Good bye') # when hit the space_bar on "No" which is "discontinue"

        else :   # if you win game, you receive return value 1
            # Level 2 start
            while running:
                if lev_2() == 0 : 
                    life -= 1
                    game_over_msg()
                    if wanna_continue() == 1:
                        continue
                    raise Exception('Good bye')

                else :   # if you win game, you receive return value 1
                    # Level 3 start
                    while running:
                        if lev_3() == 0 : # if you lose game, you receive return value 0
                            life -= 1
                            game_over_msg()
                            if wanna_continue() == 1:
                                continue
                            raise Exception('Good bye')
                            
                        else :   # if you win game, you receive return value 1
                            # level 4 start
                            while running:
                                if lev_4() == 0 :   # if you lose game, you receive return value 0
                                    life -= 1
                                    game_over_msg()
                                    if wanna_continue() == 1:
                                        continue
                                    raise Exception('Good bye')

                                else :   # if you win game, you receive return value 1
                                    # level 5 start
                                    while running:
                                        if lev_5() == 0 :   # if you lose game, you receive return value 0
                                            life -= 1
                                            game_over_msg()
                                            if wanna_continue() == 1:
                                                continue
                                            raise Exception('Good bye')
                                                                   
                                        else :   # if you win game, you receive return value 1
                                            # level 6 start
                                            while running:
                                                if lev_6() == 0 :   # if you lose game, you receive return value 0
                                                    life -= 1
                                                    game_over_msg()                 
                                                    if wanna_continue() == 1:
                                                        continue
                                                    raise Exception('Good bye')
                                                                                                                                      
                                                else :   # if you win game, you receive return value 1
                                                    # final level start
                                                    while running:
                                                        if final() == 0 :   # if you lose game, you receive return value 0
                                                            life -= 1
                                                            game_over_msg()
                                                            if wanna_continue() == 1:
                                                                continue
                                                            raise Exception('Good bye')
                                                                                                                                                              
                                                        else :  # if you win game, you receive return value 1
                                                            screen.blit(background, (0,0))
                                                            last_msgs = [                           # last message when you clear all stages
                                                            "You did great job!",
                                                            "you cleared all stages!",
                                                            "Thank you for using this Game",
                                                            "from John Park (the Maker of this game)"
                                                            ]
                                                            i = 70
                                                            for last_msg in last_msgs :
                                                                if last_msg == last_msgs[-1]:
                                                                    i += 150
                                                                else :
                                                                    i += 50
                                                                last_msg = game_font.render(last_msg, True, (255, 255, 0)) # Last message, Yellow 
                                                                last_msg_rect = last_msg.get_rect(center=(int(screen_width / 2),  i))
                                                                screen.blit(last_msg, last_msg_rect)
                                                                pygame.display.update()
                                                            pygame.time.delay(5000)
                                                            raise Exception('Good bye')
except Exception :
    pygame.quit()
    exit(0) # To make sure to quit (prevention)


                                                


                                                        