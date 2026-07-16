from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import client

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

@app.get("/")
def home():
    return {"message": "✅ SafeLink FastAPI Backend is Running!"}

@app.get("/health")
def health():
    return {"status": "healthy"}