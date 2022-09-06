import mailbox
from textwrap import indent
from imap_tools import MailBox
from account import *

applicant_list = [] # 지원자 리스트


with MailBox("imap.gmail.com", 993).login(EMAIL_ADDRESS, EMAIL_PASSWORD, initial_folder="INBOX") as mailbox:
    index = 1 # 순번
    for msg in mailbox.fetch('(SENTSINCE 26-Jul-2022)'): # 2022 7/26 이후 온메일 조회
        if "파이썬 특강" in msg.subject :
            nickname, phone = msg.text.strip().split("/")
            print("순번 : {} 닉네임 : {} 전화번호 : {}".format(index, nickname, phone))
            applicant_list.append((msg, index, nickname, phone))
            index += 1

for applicant in applicant_list:
    print(applicant)