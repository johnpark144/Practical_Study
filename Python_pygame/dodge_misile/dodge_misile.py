
from itertools import count
import math
import os
import pygame
import random
####################################################################################
# Screen initialized
pygame.init()

# Screen size
screen_width = 480
screen_height = 640
screen = pygame.display.set_mode((screen_width, screen_height))

# Game title
pygame.display.set_caption("Dodge_misile")

# FPS
clock = pygame.time.Clock()

current_path = os.path.dirname(__file__) # Current file location
image_path = os.path.join(current_path, "images") # Images folder location

# Background
Background = pygame.image.load(os.path.join(image_path, "Background.png"))


# Character (Rocket)
character = pygame.image.load(os.path.join(image_path, "character.png"))
character_size = character.get_rect().size 
character_width = character_size[0]
character_height = character_size[1]
character_x_pos = (screen_width / 2) - (character_width /2)
character_y_pos = screen_height - character_height

# Enemy1 (Misile)
enemy = pygame.image.load(os.path.join(image_path, "enemy.png"))
enemy_size = enemy.get_rect().size 
enemy_width = enemy_size[0] 
enemy_height = enemy_size[1]
enemy_x_pos = random.randint(0 - (enemy_width / 2), screen_width - (enemy_width / 2)) # Appear at random spot in the display
enemy_y_pos = 5 - enemy_size[1]

# Enemy2 (Misile)
enemy2 = pygame.image.load(os.path.join(image_path, "enemy.png"))
enemy2_size = enemy2.get_rect().size 
enemy2_width = enemy2_size[0] 
enemy2_height = enemy2_size[1]
enemy2_x_pos = random.randint(0 - (enemy2_width / 2), screen_width - (enemy2_width / 2)) # Appear at random spot in the display
enemy2_y_pos = 0 - enemy2_size[1]

# Enemy3 (Misile)
enemy3 = pygame.image.load(os.path.join(image_path, "enemy.png"))
enemy3_size = enemy3.get_rect().size 
enemy3_width = enemy3_size[0] 
enemy3_height = enemy3_size[1] 
enemy3_x_pos = random.randint(0 - (enemy3_width / 2), screen_width - (enemy3_width / 2)) # Appear at random spot in the display
enemy3_y_pos = 0 - enemy3_size[1]

# Move
to_x = 0 # only Character's X_direction

to_y = 0 # only Enemy1's Y_direction
to_y2 = 0 # only Enemy2's Y_direction
to_y3 = 0 # only Enemy3's Y_direction

# Speed
character_speed = 0.6
enemy_speed = 0.05
enemy2_speed = 0 # it doesn appear at first
enemy3_speed = 0 # it doesn appear at first

# Number to count the enemy passed to level up
number_reached_to_land = 0
number_reached_to_land2 = 0

# Font
game_font = pygame.font.Font(None, 40)

# Total time
total_time = 101

# Game start
cnts = [3,2,1]
for cnt in cnts :
    start_msgs = [                          # First message before game start
                "- John's_dodge_misile -",
                "Wellcome!",
                "move : left , right",
                str(cnt),
                
                ]
    i = 70

    for start_msg in start_msgs :
        if start_msg == start_msgs[-2]:
            i += 120
        elif start_msg == start_msgs[-1]:
            i += 180
        else :
            i += 70

        start_msg = pygame.font.Font(None, 40).render(start_msg, True, (255, 255, 0)) # First message, Yellow
        start_msg_rect = start_msg.get_rect(center=(int(screen_width / 2),  i))
        screen.blit(start_msg, start_msg_rect)
        pygame.display.update()
    pygame.time.delay(1000)
    screen.fill((0,0,0))

# start time information
start_ticks = pygame.time.get_ticks() # Current ticks

# Event infinite loop
running = True
while running :
    dt = clock.tick(100) # FPS

    # Event (Key, Mouse etc)
    for event in pygame.event.get(): # What kind of event happend?
        if event.type == pygame.QUIT: # If Quit the game
            running = False # infinite loop turn to False

        if event.type == pygame.KEYDOWN : # When hit some keys
            if event.key == pygame.K_LEFT: # left key
                to_x -= character_speed
            elif event.key == pygame.K_RIGHT : # right key
                to_x += character_speed


        if event.type == pygame.KEYUP : # When the keys you hit go up,
            if event.key == pygame.K_LEFT or event.key == pygame.K_RIGHT:
                to_x = 0

    # Speed up
    if number_reached_to_land2 >= 13 :
        enemy_speed = 0.1
    if number_reached_to_land2 >= 20 :
        enemy_speed = 0.15
    if number_reached_to_land2 >= 30 :
        enemy_speed = 0.2
    if number_reached_to_land2 >= 40 :
        enemy_speed = 0.25

    # Enemy come down
    to_y += enemy_speed
    to_y2 += enemy2_speed # enemy2_speed's first value is 0
    to_y3 += enemy3_speed # enemy3_speed's first value is 0

    # Relocation of Enemy 1
    if enemy_y_pos > screen_height :
        enemy_x_pos = random.randint(0 - (enemy_width / 2), screen_width - (enemy_width / 2)) # Relocation of X_position randomly
        enemy_y_pos = 5 - enemy_size[1] # Relocation of Y_position
        to_y = 0
        number_reached_to_land += 1

    # If Enemy 1 passed 5 times
    if number_reached_to_land >= 5 : 
        enemy2_speed = enemy_speed + 0.05 # Enemy 2 appear

    # Relocation of Enemy 2
    if enemy2_y_pos > screen_height :
        enemy2_x_pos = random.randint(0 - (enemy2_width / 2), screen_width - (enemy2_width / 2))
        enemy2_y_pos = 5 - enemy2_size[1]
        to_y2 = 0
        number_reached_to_land2 += 1


    # If Enemy 2 passed 8 times
    if number_reached_to_land2 >= 8 :
        enemy3_speed = enemy_speed + 0.08 # Enemy 3 appear

    if enemy3_y_pos > screen_height :
        enemy3_x_pos = random.randint(0 - (enemy3_width / 2), screen_width - (enemy3_width / 2))
        enemy3_y_pos = 5 - enemy3_size[1]
        to_y3 = 0

    # Character position
    character_x_pos += to_x * dt
    enemy_y_pos += to_y
    enemy2_y_pos += to_y2
    enemy3_y_pos += to_y3

    # Prevention from the character getting outside of the display
    if character_x_pos < 0 :
        character_x_pos = 0
    elif character_x_pos > screen_width - character_width :
        character_x_pos = screen_width - character_width

    # To draw
    screen.blit(Background, (0, 0)) 
    screen.blit(character, (character_x_pos, character_y_pos)) 
    screen.blit(enemy, (enemy_x_pos, enemy_y_pos)) 
    screen.blit(enemy2, (enemy2_x_pos, enemy2_y_pos))
    screen.blit(enemy3, (enemy3_x_pos, enemy3_y_pos))

    # calculation of timeflow
    elapsed_time =  (pygame.time.get_ticks() - start_ticks) / 1000
    
    # Timer
    timer = game_font.render(str(int(total_time - elapsed_time)), True,(255, 255, 255))
    screen.blit(timer, (10, 10))

    # Time over
    if total_time - elapsed_time <= 0 :
        print("You did Good job!")
        running = False
    
    # Information for Collision
    character_rect = character.get_rect()
    character_rect.left = character_x_pos
    character_rect.top = character_y_pos

    enemy_rect = enemy.get_rect()
    enemy_rect.left = enemy_x_pos
    enemy_rect.top = enemy_y_pos

    enemy2_rect = enemy2.get_rect()
    enemy2_rect.left = enemy2_x_pos
    enemy2_rect.top = enemy2_y_pos

    enemy3_rect = enemy3.get_rect()
    enemy3_rect.left = enemy3_x_pos
    enemy3_rect.top = enemy3_y_pos

    # Whether or not collision
    game_over_time = math.floor(total_time - elapsed_time) 

    if character_rect.colliderect(enemy_rect) :
        print("Game over")
        print("with {}secs left".format(game_over_time))
        running = False

    if character_rect.colliderect(enemy2_rect) :
        print("Game over")
        print("with {}secs left".format(game_over_time))
        running = False

    if character_rect.colliderect(enemy3_rect) :
        print("Game over")
        print("with {}secs left".format(game_over_time))
        running = False


    pygame.display.update() # Redrawing the display (neccesary)

pygame.time.delay(500) # delay 0.5 secs

pygame.quit() # Quit the game