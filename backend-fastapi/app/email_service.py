from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from pydantic import EmailStr
from dotenv import load_dotenv
import os

load_dotenv()

conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_FROM=os.getenv("MAIL_FROM"),
    MAIL_PORT=int(os.getenv("MAIL_PORT")),
    MAIL_SERVER=os.getenv("MAIL_SERVER"),
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True
)

async def send_sos_email(receiver: str, user_email: str, latitude: float, longitude: float):

    message = MessageSchema(
        subject="🚨 SafeLink Emergency Alert",
        recipients=[receiver],
        body=f"""
Emergency Alert!

{user_email} has triggered an SOS.

Location:
https://maps.google.com/?q={latitude},{longitude}

Please contact them immediately.
""",
        subtype="plain"
    )

    fm = FastMail(conf)
    await fm.send_message(message)