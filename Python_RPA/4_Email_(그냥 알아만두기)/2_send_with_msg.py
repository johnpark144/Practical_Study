import smtplib
from account import *
from email.message import EmailMessage

msg = EmailMessage()
msg["Subject"] = "테스트 메일입니다." # 제목 / 한글 O
msg["From"] = EMAIL_ADDRESS # 보내는 사람
msg["To"] = "vyckd354@gmail.com" # 받는 사람

# 여러 명에게 메일을 보낼 떄
# msg["To"] = "vyckd354@gmail.com, vyckd354@gmail.com, vyckd354@gmail.com"

# to_list = ["vyckd354@gmail.com", "vyckd354@gmail.com"]
# msg["To"] = ", ".join(to_list)

# # 참조
# msg["Cc"] = "vyckd354@gmail.com"

# # 비밀 참조
# msg["Bcc"] = "vyckd354@gmail.com"

msg.set_content("테스트 본문입니다.") # 본문 / 한글 O

with smtplib.SMTP("smtp.gmail.com", 587) as smtp:
    smtp.ehlo() # 연결이 잘 수립되는지 확인
    smtp.starttls() # 모든 내용이 암호화되어 전송
    smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD) # 로그인
    smtp.send_message(msg)
