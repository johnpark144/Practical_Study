def lev_1() :
    from Main_remove_balls import life
    import pygame
    import os
    ####################################################################################
    pygame.init() # Initialized (necessary)

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

    # Backgrond
    background = pygame.image.load(os.path.join(image_path, "background.png"))

    # Stage
    stage = pygame.image.load(os.path.join(image_path, "stage.png"))
    stage_size = stage.get_rect().size
    stage_height = stage_size[1] 

    # Charcter
    character = pygame.image.load(os.path.join(image_path, "character.png"))
    character_r = pygame.image.load(os.path.join(image_path, "character_R.png"))
    character_l = pygame.image.load(os.path.join(image_path, "character_L.png"))
    character_size = character.get_rect().size
    character_width = character_size[0]
    character_height = character_size[1]
    character_x_pos = (screen_width / 2) - (character_width / 2)
    character_y_pos = screen_height - character_height - stage_height

    # Charcter_direction
    character_to_x = 0

    # Charcter_speed
    character_speed = 5

    # 4 kind of Balls' size
    ball_images = [
        pygame.image.load(os.path.join(image_path, "balloon1.png")),
        pygame.image.load(os.path.join(image_path, "balloon2.png")),
        pygame.image.load(os.path.join(image_path, "balloon3.png")),
        pygame.image.load(os.path.join(image_path, "balloon4.png"))]

    # 4 kind of Balls' speed
    ball_speed_y = [-18, -15, -12, -9] # index 0, 1, 2, 3에 해당하는 값

    # To make multiple balls at the same time
    balls = []

    # Very first ball
    balls.append({
        "pos_x" : 50, # Ball's X_position
        "pos_y" : 50, # Ball's Y_position
        "img_idx" : 0, # Ball_images' index
        "to_x" : 3, # X_dirrection, -3 : leftside, 3 : rightside
        "to_y" : -6,# Y_dirrection,
        "init_spd_y" : ball_speed_y[0]}) # First Y_speend

    # the Variables to remove from display
    weapon_to_remove = -1
    ball_to_remove = -1

    # Font
    game_font = pygame.font.Font(None, 40)

    # Time
    total_time = 60
    start_ticks = pygame.time.get_ticks() 

    # Weapon
    weapon = pygame.image.load(os.path.join(image_path, "weapon.png"))
    weapon_size = weapon.get_rect().size
    weapon_width = weapon_size[0]
    weapon_speed = 10

    # To make multiple weapons at the same time
    weapons = []

    # Level message before game start
    msg = game_font.render("Level 1", True, (255, 255, 0)) # level 1, yellow
    msg_rect = msg.get_rect(center=(int(screen_width / 2), int(screen_height / 2)))
    screen.blit(msg, msg_rect)
    pygame.display.update()
    pygame.time.delay(2000)

    running = True

    # Event infinite loop
    while running :
        dt = clock.tick(30) # Frame Per Second 

        # Event (Key, Mouse etc)
        for event in pygame.event.get(): # What kind of event happend?
            if event.type == pygame.QUIT: # If Quit the game
                pygame.quit()
                running = False # infinite loop turn to False

            if event.type == pygame.KEYDOWN : # When hit some keys
                if event.key == pygame.K_LEFT: # left key
                    character_to_x -= character_speed
                    character = character_l
                elif event.key == pygame.K_RIGHT: # right key
                    character_to_x += character_speed
                    character = character_r
                elif event.key == pygame.K_SPACE: # space_bar to remove balls
                    weapon_x_pos = character_x_pos + (character_width / 2) - (weapon_width / 2)
                    weapon_y_pos = character_y_pos
                    weapons.append([weapon_x_pos, weapon_y_pos])

            if event.type == pygame.KEYUP : # When the keys you hit go up,
                if event.key == pygame.K_LEFT or event.key == pygame.K_RIGHT :
                    character_to_x = 0 # no move anymore

        # Character position
        character_x_pos += character_to_x # input the position_value from the event to current position.

        # Prevention from the character getting outside of the display
        if character_x_pos < 0 :
            character_x_pos = 0
        elif character_x_pos > screen_width - character_width :
            character_x_pos = screen_width - character_width

        # When you hit the spacebar
        weapons = [ [w[0], w[1] - weapon_speed] for w in weapons] # weapon show up (only Y_direnction move upward)

        # When the weapons hit the ceiling
        weapons = [ [w[0], w[1] ] for w in weapons if w[1] > 0] # only when Y_direnction is inside of the display

        # Ball position
        for ball_idx, ball_val in enumerate(balls):
            ball_pos_x = ball_val["pos_x"]
            ball_pos_y = ball_val["pos_y"]
            ball_img_idx = ball_val["img_idx"]

            ball_size = ball_images[ball_img_idx].get_rect().size
            ball_width = ball_size[0]
            ball_height = ball_size[1]

            # Effect for switch the direction of balls when hit the both side of walls
            if ball_pos_x < 0 or ball_pos_x > screen_width - ball_width :
                ball_val["to_x"] = ball_val["to_x"] * -1
            
            # Bounding effect
            if ball_pos_y >= screen_height - stage_height - ball_height :
                ball_val["to_y"] = ball_val["init_spd_y"]
            else:
                ball_val["to_y"] += 0.5

            # Ball position update
            ball_val["pos_x"] += ball_val["to_x"]
            ball_val["pos_y"] += ball_val["to_y"]

        # Collision
        # Character rect update
        character_rect = character.get_rect()
        character_rect.left = character_x_pos
        character_rect.top = character_y_pos

        for ball_idx, ball_val in enumerate(balls): # What kind of ball, out of 4
            ball_pos_x = ball_val["pos_x"]
            ball_pos_y = ball_val["pos_y"]
            ball_img_idx = ball_val["img_idx"]

            # Ball rect update
            ball_rect = ball_images[ball_img_idx].get_rect()
            ball_rect.left = ball_pos_x
            ball_rect.top = ball_pos_y

            # When the collision happen between Character and Ball
            if character_rect.colliderect(ball_rect) :
                # Game over message
                game_result = "Game over"
                msg = game_font.render(game_result, True, (255, 255, 0)) # yellow
                msg_rect = msg.get_rect(center=(int(screen_width / 2), int(screen_height / 2)))
                screen.blit(msg, msg_rect)
                pygame.display.update()
                pygame.time.delay(2000)
                return 0

            # weapon positions
            for weapon_idx, weapon_val in enumerate(weapons):
                weapon_pos_x = weapon_val[0]
                weapon_pos_y = weapon_val[1]

                # weapon rect update
                weapon_rect = weapon.get_rect()
                weapon_rect.left = weapon_pos_x
                weapon_rect.top = weapon_pos_y

                # When the collision happen between Weapon and Ball
                if weapon_rect.colliderect(ball_rect):
                    weapon_to_remove = weapon_idx # Setting to remove the weapon
                    ball_to_remove = ball_idx # Setting to remove the ball

                    # Balls divisions
                    if ball_img_idx < 3 : # if the ball is not maximum index
                        # Current ball information
                        ball_width = ball_rect.size[0]
                        ball_height = ball_rect.size[1]

                        # Divided ball information
                        small_ball_rect = ball_images[ball_img_idx + 1].get_rect()
                        small_ball_width = small_ball_rect.size[0]
                        small_ball_height = small_ball_rect.size[1]

                        # left side ball
                        balls.append({
                            "pos_x" : ball_pos_x + (ball_width / 2) - (small_ball_width / 2),
                            "pos_y" : ball_pos_y + (ball_height / 2) - (small_ball_height / 2),
                            "img_idx" : ball_img_idx + 1, # Next index's ball
                            "to_x" : -3,
                            "to_y" : -6,
                            "init_spd_y" : ball_speed_y[ball_img_idx + 1]}) 

                        # right side ball
                        balls.append({
                            "pos_x" : ball_pos_x + (ball_width / 2) - (small_ball_width / 2),
                            "pos_y" : ball_pos_y + (ball_height / 2) - (small_ball_height / 2),
                            "img_idx" : ball_img_idx + 1, # Next index's ball
                            "to_x" : 3,
                            "to_y" : -6,
                            "init_spd_y" : ball_speed_y[ball_img_idx + 1]})
                        break
            else : 
                continue
            break

        # To remove the Ball and weapon collided
        if ball_to_remove > -1 : # When ball_to_remove switch to the index of the ball
            del balls[ball_to_remove] # the collided ball's index is deleted
            ball_to_remove = -1 # Again to default

        if weapon_to_remove > -1:
            del weapons[weapon_to_remove]
            weapon_to_remove = -1
        
        # When ball is zero, Mission complete
        if len(balls) == 0:
            game_result = "Mission complete"
            # Mission complete message
            msg = game_font.render(game_result, True, (255, 255, 0)) # Yellow
            msg_rect = msg.get_rect(center=(int(screen_width / 2), int(screen_height / 2)))
            screen.blit(msg, msg_rect)
            pygame.display.update()
            pygame.time.delay(2000)
            return 1

        # To draw
        screen.blit(background, (0,0))
        for weapon_x_pos, weapon_y_pos in weapons:
            screen.blit(weapon, (weapon_x_pos, weapon_y_pos))
        for idx, val in enumerate(balls):
            ball_pos_x = val["pos_x"]
            ball_pos_y = val["pos_y"]
            ball_img_idx = val["img_idx"]
            screen.blit(ball_images[ball_img_idx], (ball_pos_x, ball_pos_y))
        
        screen.blit(stage, (0,screen_height - stage_height ))
        screen.blit(character,(character_x_pos, character_y_pos))

        # Time
        elapsed_time = (pygame.time.get_ticks() - start_ticks) / 1000 # ms -> s
        timer = game_font.render("Time : {}".format(int(total_time - elapsed_time)), True,(255, 255, 255))
        screen.blit(timer, (10,10))

        # Life
        life_msg = game_font.render(f"life : {life}", True, (255, 255, 255)) # White
        screen.blit(life_msg, (screen_width-100 ,10))
        pygame.display.update() 
        

        # When you fail by Time over
        if total_time - elapsed_time <= 0 :
            game_result = "Time over"
            # Time over message
            msg = game_font.render(game_result, True, (255, 255, 0)) # Yellow
            msg_rect = msg.get_rect(center=(int(screen_width / 2), int(screen_height / 2)))
            screen.blit(msg, msg_rect)
            pygame.display.update()
            pygame.time.delay(2000)
            return 0
        

        pygame.display.update()  # Redrawing the display (neccesary)

    
