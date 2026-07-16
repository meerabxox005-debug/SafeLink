from fastapi import APIRouter, HTTPException
from app.database import users_collection
from app.models import UserSignup, UserLogin
import bcrypt

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


# Signup
@router.post("/signup")
async def signup(user: UserSignup):

    existing = users_collection.find_one({"email": user.email})

    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed = bcrypt.hashpw(
        user.password.encode("utf-8"),
        bcrypt.gensalt()
    ).decode("utf-8")

    users_collection.insert_one({
        "name": user.name,
        "email": user.email,
        "password": hashed
    })

    return {
        "success": True,
        "message": "User registered successfully"
    }


# Login
@router.post("/login")
async def login(user: UserLogin):

    existing = users_collection.find_one({"email": user.email})

    if not existing:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    if not bcrypt.checkpw(
        user.password.encode("utf-8"),
        existing["password"].encode("utf-8")
    ):
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {
        "success": True,
        "user": {
            "name": existing["name"],
            "email": existing["email"]
        }
    }