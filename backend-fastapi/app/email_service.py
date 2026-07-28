import os
import requests
from dotenv import load_dotenv

load_dotenv()

BREVO_API_KEY = os.getenv("BREVO_API_KEY")
SENDER_EMAIL = os.getenv("SENDER_EMAIL")


async def send_sos_email(receiver: str, user_email: str, latitude: float, longitude: float):
    url = "https://api.brevo.com/v3/smtp/email"

    headers = {
        "accept": "application/json",
        "api-key": BREVO_API_KEY,
        "content-type": "application/json"
    }

    data = {
        "sender": {
            "name": "SafeLink",
            "email": SENDER_EMAIL
        },
        "to": [
            {
                "email": receiver
            }
        ],
        "subject": "🚨 SafeLink Emergency Alert",
        "textContent": f"""
Emergency Alert!

{user_email} has triggered an SOS.

Location:
https://maps.google.com/?q={latitude},{longitude}

Please contact them immediately.
"""
    }

    response = requests.post(url, headers=headers, json=data)

    print("Brevo Status:", response.status_code)
    print("Brevo Response:", response.text)

    if response.status_code not in [200, 201]:
        raise Exception(f"Brevo API Error: {response.text}")