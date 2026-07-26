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
        reply = (
            "I'm here to help. ❤️ "
            "If you're in immediate danger, press the SOS button, move to a safe place if possible, "
            "and contact your local emergency services. You can also ask me about safety tips, "
            "first aid, travel safety, or using SafeLink."
        )

    elif "unsafe" in message:
        reply = (
            "I'm sorry you're feeling unsafe. Try to stay calm, move to a public or well-lit area, "
            "contact someone you trust, and use the SOS feature if you need immediate assistance."
        )

    elif "panic" in message or "anxious" in message:
        reply = (
            "Take a slow breath. You're not alone. Try focusing on your breathing for a moment, "
            "look around and identify five things you can see, and contact someone you trust if you can."
        )

    elif "hello" in message or "hi" in message or "hey" in message:
        reply = (
            "Hello! 😊 I'm SafeLink AI. I'm here to answer your safety questions and help you use the app. "
            "What would you like to know today?"
        )

    elif "thank" in message:
        reply = (
            "You're very welcome! 😊 Stay safe, and remember I'm always here if you need guidance."
        )

    elif "sos" in message:
        reply = (
            "The SOS feature sends your location and emergency alert to your trusted contacts. "
            "Use it only when you need urgent assistance."
        )

    elif "contact" in message:
        reply = (
            "You can add trusted contacts from the Trusted Contacts page. "
            "These people will receive your emergency alerts."
        )

    elif "location" in message:
        reply = (
            "SafeLink can share your live location during emergencies and help you find nearby services."
        )

    elif "safe" in message:
        reply = (
            "I'm glad to hear that! 😊 Is there anything else you'd like help with?"
        )

    else:
        reply = (
            "I'm SafeLink AI. 😊 "
            "I can answer questions about personal safety, first aid, travel safety, emergency preparedness, "
            "and explain how SafeLink works. Feel free to ask me anything!"
        )

    return {
        "reply": reply
    }