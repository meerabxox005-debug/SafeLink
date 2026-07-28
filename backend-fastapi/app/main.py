from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import client
from fastapi.staticfiles import StaticFiles

# Import routers
from app.auth import router as auth_router
from app.contacts import router as contacts_router
from app.alerts import router as alerts_router
from app.chatbot import router as chatbot_router

app = FastAPI(
    title="SafeLink API",
    version="1.0.0"
)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500",
        "https://safelink-frontend.onrender.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router)
app.include_router(contacts_router)
app.include_router(alerts_router)
app.include_router(chatbot_router)

@app.get("/health")
def health():
    return {"status": "healthy"}

# ---------- TEST EMAIL ROUTE ----------
from app.email_service import send_sos_email

@app.get("/test-email")
async def test_email():
    await send_sos_email(
        receiver="yourpersonalemail@gmail.com",  # replace with your own email
        user_email="test@safelink.com",
        latitude=24.8607,
        longitude=67.0011
    )

    return {"message": "Email sent successfully"}
import socket

@app.get("/smtp-test")
def smtp_test():
    try:
        socket.create_connection(("smtp-relay.brevo.com", 587), timeout=10)
        return {"status": "Connected"}
    except Exception as e:
        return {"error": str(e)}


# Serve frontend
app.mount(
    "/",
    StaticFiles(directory="../frontend", html=True),
    name="frontend"
)