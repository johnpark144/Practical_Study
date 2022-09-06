import imp
import smtplib
from account import *

with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
    smtp.ehlo() # 연결이 잘 수립되는지 확인
    smtp.starttls() # 모든 내용이 암호화되어 전송
    smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD) # 로그인

    subject = "test mail" # 메일 제목 / 한글x
    body = "mail body" # 메일 본문 / 한글x

    msg = f"Subject: {subject}\n{body}"

    # 발신자, 수신자, 정해진 형식의 메시지
    smtp.sendmail(EMAIL_ADDRESS, EMAIL_ADDRESS, msg) #(보내는사람, 받는사람, 메시지)