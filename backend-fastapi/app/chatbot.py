from fastapi import APIRouter
from app.models import ChatRequest

router = APIRouter(
    prefix="/api/chatbot",
    tags=["AI Chatbot"]
)

@router.post("/")
def chat(data: ChatRequest):
    message = data.message.lower()

    if "help" in message:
        reply = "If you are in immediate danger, press the SOS button and contact emergency services."

    elif "unsafe" in message:
        reply = "Try to move to a public place, call someone you trust, and use the SOS feature."

    elif "panic" in message:
        reply = "Take slow breaths, focus on your surroundings, and contact a trusted person."

    else:
        reply = "I'm SafeLink AI. I can provide basic safety guidance. If this is an emergency, use the SOS feature immediately."

    return {
        "reply": reply
    }