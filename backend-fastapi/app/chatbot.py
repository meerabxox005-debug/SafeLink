import os
import google.generativeai as genai

from fastapi import APIRouter
from app.models import ChatRequest

router = APIRouter(
    prefix="/api/chatbot",
    tags=["AI Chatbot"]
)

# Configure Gemini
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")

SYSTEM_PROMPT = """
You are SafeLink AI.

You are a friendly, supportive AI assistant built into the SafeLink application.

You ONLY help with topics related to:

- Personal safety
- Emergency preparedness
- Women's safety
- Child safety
- Travel safety
- Cyber safety
- First aid
- Disaster preparedness
- Mental wellbeing
- SafeLink app features
- Trusted contacts
- SOS feature
- Location sharing
- Nearby emergency services

Your personality:
- Friendly
- Calm
- Caring
- Professional
- Easy to understand

You can have natural conversations.

If someone greets you, greet them warmly.

If someone asks a safety question, answer in detail.

If someone asks something unrelated such as:
- Poems
- Coding
- Homework
- Movies
- Politics
- Random facts

Politely explain that you're SafeLink AI and your purpose is helping with safety and SafeLink features.

Never pretend to call emergency services.

If someone may be in danger, advise using the SafeLink SOS feature and contacting local emergency services.
"""

chat = model.start_chat(history=[])


@router.post("/")
async def chatbot(data: ChatRequest):

    prompt = f"""
{SYSTEM_PROMPT}

User:
{data.message}
"""

    try:
        response = chat.send_message(prompt)

        return {
            "reply": response.text
        }

    except Exception as e:
         return {
            "reply": str(e)
    }