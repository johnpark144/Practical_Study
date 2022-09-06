import mailbox
from imap_tools import MailBox
from account import *

# mailbox = MailBox("imap.gmail.com", 993)
# mailbox.login(EMAIL_ADDRESS, EMAIL_PASSWORD, initial_folder="INBOX")
# mailbox.logout()

with MailBox("imap.gmail.com", 993).login(EMAIL_ADDRESS, EMAIL_PASSWORD, initial_folder="INBOX") as mailbox:
    # for msg in mailbox.fetch(limit=5, reverse=True): # limit 지우면 전체 메일 다 가져오기
    #     print("[{}] {}".format(msg.from_, msg.subject))

    # for msg in mailbox.fetch('(UNSEEN)'): # 읽지 않은 메일 가져오기
    #     print("[{}] {}".format(msg.from_, msg.subject))

    # for msg in mailbox.fetch('(FROM vyckd354@gmail.com)', limit=5, reverse=True): # 특정인이 보낸 메일 다 가져오기
    #     print("[{}] {}".format(msg.from_, msg.subject))
    
    # for msg in mailbox.fetch('(TEXT "Netflix")'): # 어떤 글자를 포함하는 메일(제목, 본문), 한글X
    #     print("[{}] {}".format(msg.from_, msg.subject))

    # for msg in mailbox.fetch('(SUBJECT "Krystal")'): # 어떤 글자를 포함하는 메일(제목만), 한글X
    #     print("[{}] {}".format(msg.from_, msg.subject))
    
    # for msg in mailbox.fetch(reverse=True): # 어떤 글자를 포함하는 메일(제목만), 한글가능 o
    #     if "없음" in msg.subject :
    #         print("[{}] {}".format(msg.from_, msg.subject))

    # for msg in mailbox.fetch('(SENTSINCE 07-Jul-2022)'): # 특정 날짜 이후에 온 메일
    #     print("[{}] {}".format(msg.from_, msg.subject))

    # for msg in mailbox.fetch('(on 26-Jul-2022)'): # 특정 날짜에 온 메일
    #     print("[{}] {}".format(msg.from_, msg.subject))

    # for msg in mailbox.fetch('(SENTSINCE 26-Jul-2020 SUBJECT "krystal")'): # 2가지 이상의 조건을 모두 만족하는 메일
    #     print("[{}] {}".format(msg.from_, msg.subject))

    for msg in mailbox.fetch('(OR SENTSINCE 26-Jul-2020 SUBJECT "krystal")'): # 2가지 이상의 조건중 하나라도 만족하는 메일(맨앞에 OR만 붙임)
        print("[{}] {}".format(msg.from_, msg.subject))