
import os
import pygame
import sys
from remove_balls_copy1 import lev_1
from remove_balls_copy2 import lev_2
from remove_balls_copy3 import lev_3
from remove_balls_copy4 import lev_4
from remove_balls_copy5 import lev_5
from remove_balls_copy6 import lev_6
from remove_balls_copy7 import final
####################################################################################
# 기본 초기화 (반드시 해야 하는 것들)
pygame.init() # 초기화 (반드시필요)

# 화면 크기 설정
screen_width = 640  # 가로
screen_height = 480 # 세로
screen = pygame.display.set_mode((screen_width, screen_height))

# 화면 타이틀 설정
pygame.display.set_caption("John's_remove_balls") # 게임 이름

# FPS
clock = pygame.time.Clock()
####################################################################################
# 1. 사용자 게임 초기화 (배경화면, 게임, 이미지, 좌표, 속도, 폰트 등)
current_path = os.path.dirname(__file__) #현재파일의 위치 반환
image_path = os.path.join(current_path, "images") # images 폴더 위치 반환

def wanna_continue() :
    for event in pygame.event.get(): # 지고나서 모르고 spce눌렀을수도 있어서 (자동 continue 방지)
        if event.type == pygame.KEYDOWN : 
            if event.key == pygame.K_SPACE:
                pass

    yes_or_no = 1

    global game_font, background, running, life
    background = pygame.image.load(os.path.join(image_path, "continue.png"))
    screen.blit(background, (0,0))
    game_font = pygame.font.Font(None, 40)

    life_msg = game_font.render(f"life : {life}", True, (255, 255, 255)) # 흰색
    screen.blit(life_msg, (screen_width-100,10))
    pygame.display.update() # 게임화면을 다시 그리기 / 필수!

    msg = game_font.render("Do you want to continue?", True, (255, 255, 255)) # 흰색
    msg_rect = msg.get_rect(center=(int(screen_width / 2), int(screen_height / 2) - 50))
    screen.blit(msg, msg_rect)
    pygame.display.update() # 게임화면을 다시 그리기 / 필수!

    yes_msg = game_font.render("YES", True, (255, 255, 0)) # 노란색
    yes_msg_rect = yes_msg.get_rect(center=(int(screen_width / 2), int(screen_height / 2) + 100))
    screen.blit(yes_msg, yes_msg_rect)
    pygame.display.update() # 게임화면을 다시 그리기 / 필수!

    no_msg = game_font.render("No", True, (255, 255, 255)) # 흰색
    no_msg_rect = no_msg.get_rect(center=(int(screen_width / 2), int(screen_height / 2)+ 150))
    screen.blit(no_msg, no_msg_rect)
    pygame.display.update() # 게임화면을 다시 그리기 / 필수!

    space_bar_msg = pygame.font.Font(None, 20).render("to pick = <space_bar>", True, (255, 255, 255)) # 흰색
    space_bar_msg_rect = space_bar_msg.get_rect(center=(int(screen_width / 2) + 200, int(screen_height / 2) + 130))
    screen.blit(space_bar_msg, space_bar_msg_rect)
    pygame.display.update() # 게임화면을 다시 그리기 / 필수!

    while running:
        for event in pygame.event.get(): #어떤 이벤트가 발생하였는가?
            if event.type == pygame.QUIT: # 창이 닫히는 이벤트가 발생하였는가?
                return 0

            if event.type == pygame.KEYDOWN : 
                if event.key == pygame.K_UP:
                    yes_or_no = 1
                    yes_msg = game_font.render("YES", True, (255, 255, 0)) # 노란색
                    yes_msg_rect = yes_msg.get_rect(center=(int(screen_width / 2), int(screen_height / 2) + 100))
                    screen.blit(yes_msg, yes_msg_rect)
                    pygame.display.update() # 게임화면을 다시 그리기 / 필수!
                    no_msg = game_font.render("No", True, (255, 255, 255)) # 노란색
                    no_msg_rect = no_msg.get_rect(center=(int(screen_width / 2), int(screen_height / 2)+ 150))
                    screen.blit(no_msg, no_msg_rect)
                    pygame.display.update() # 게임화면을 다시 그리기 / 필수!  

                if event.key == pygame.K_DOWN: 
                    yes_or_no = 0
                    yes_msg = game_font.render("YES", True, (255, 255, 255)) # 노란색
                    yes_msg_rect = yes_msg.get_rect(center=(int(screen_width / 2), int(screen_height / 2) + 100))
                    screen.blit(yes_msg, yes_msg_rect)
                    pygame.display.update() # 게임화면을 다시 그리기 / 필수!
                    no_msg = game_font.render("No", True, (255, 255, 0)) # 노란색
                    no_msg_rect = no_msg.get_rect(center=(int(screen_width / 2), int(screen_height / 2)+ 150))
                    screen.blit(no_msg, no_msg_rect)
                    pygame.display.update() # 게임화면을 다시 그리기 / 필수!

                if event.key == pygame.K_SPACE:
                    if yes_or_no == 1:
                        return 1
                    else:
                        return 0

def game_over_msg() :
    if life == 0 :
        global running, background
        background = pygame.image.load(os.path.join(image_path, "continue.png"))
        screen.blit(background, (0,0))

        game_over_msg = game_font.render("Game over", True, (255, 255, 255)) # 흰색
        game_over_msg_rect = game_over_msg.get_rect(center=(int(screen_width / 2), int(screen_height / 2) - 50))
        screen.blit(game_over_msg, game_over_msg_rect)
        pygame.display.update() # 게임화면을 다시 그리기 / 필수!

        pygame.time.delay(3000)
        pygame.quit()
        print(sys.path)
        running = False # pygame 종료

global running, life
running = True
life = 5

start_msgs = [
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

    start_msg = pygame.font.Font(None, 40).render(start_msg, True, (255, 255, 0)) # 노란색 
    start_msg_rect = start_msg.get_rect(center=(int(screen_width / 2),  i))
    screen.blit(start_msg, start_msg_rect)
pygame.display.update() # 게임화면을 다시 그리기 / 필수!
pygame.time.delay(1500)

try :
    while running:
        if lev_1() == 0 :   # 0 이면종료
            life -= 1
            game_over_msg()
            if wanna_continue() == 1:
                continue
            raise Exception('Good bye')

        else :   # 1 이면다음레벨
            while running:
                if lev_2() == 0 : # 0 이면종료
                    life -= 1
                    game_over_msg()
                    if wanna_continue() == 1:
                        continue
                    raise Exception('Good bye')
                    
                else :   # 1 이면다음레벨
                    while running:
                        if lev_3() == 0 :  # 0 이면종료
                            life -= 1
                            game_over_msg()
                            if wanna_continue() == 1:
                                continue
                            raise Exception('Good bye')
                            
                        else :   # 1 이면다음레벨
                            while running:
                                if lev_4() == 0 :   # 0 이면종료
                                    life -= 1
                                    game_over_msg()
                                    if wanna_continue() == 1:
                                        continue
                                    raise Exception('Good bye')

                                else :   # 1 이면다음레벨
                                    while running:
                                        if lev_5() == 0 :   # 0 이면종료
                                            life -= 1
                                            game_over_msg()
                                            if wanna_continue() == 1:
                                                continue
                                            raise Exception('Good bye')
                                                                   
                                        else :   # 1 이면다음레벨
                                            while running:
                                                if lev_6() == 0 :   # 0 이면종료 
                                                    life -= 1
                                                    game_over_msg()                 
                                                    if wanna_continue() == 1:
                                                        continue
                                                    raise Exception('Good bye')
                                                                                                                                      
                                                else :   # 1 이면다음레벨
                                                    while running:
                                                        if final() == 0 :   # 0 이면종료
                                                            life -= 1
                                                            game_over_msg()
                                                            if wanna_continue() == 1:
                                                                continue
                                                            raise Exception('Good bye')
                                                                                                                                                              
                                                        else :   # 1 이면다음레벨
                                                            screen.blit(background, (0,0))
                                                            last_msgs = [
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
                                                                last_msg = game_font.render(last_msg, True, (255, 255, 0)) # 노란색 
                                                                last_msg_rect = last_msg.get_rect(center=(int(screen_width / 2),  i))
                                                                screen.blit(last_msg, last_msg_rect)
                                                                pygame.display.update() # 게임화면을 다시 그리기 / 필수!
                                                            pygame.time.delay(5000)
                                                            raise Exception('Good bye')
except Exception :
    pygame.quit()
    exit(0) # 껐을때 다시 실행하는 오류 방지


                                                


                                                        