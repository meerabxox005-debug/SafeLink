from pydantic import BaseModel, EmailStr
from typing import Optional


# User Signup
class UserSignup(BaseModel):
    name: str
    email: EmailStr
    password: str


# User Login
class UserLogin(BaseModel):
    email: EmailStr
    password: str


# Trusted Contact
class Contact(BaseModel):
    userEmail: EmailStr
    name: str
    phone: str
    email: EmailStr
    relationship: str


# SOS Request
class SOSRequest(BaseModel):
    userEmail: EmailStr
    latitude: float
    longitude: float


# Chatbot Request
class ChatRequest(BaseModel):
    message: str

