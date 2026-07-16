from fastapi import APIRouter
from pydantic import BaseModel
from datetime import datetime
from app.database import alerts_collection, contacts_collection
from app.email_service import send_sos_email

router = APIRouter(
    prefix="/api/alerts",
    tags=["SOS Alerts"]
)

class SOSRequest(BaseModel):
    userEmail: str
    latitude: float
    longitude: float

@router.post("/")
async def send_sos(data: SOSRequest):

    alert = {
        "userEmail": data.userEmail,
        "latitude": data.latitude,
        "longitude": data.longitude,
        "time": datetime.utcnow()
    }

    alerts_collection.insert_one(alert)

    # Get all trusted contacts
    contacts = list(
        contacts_collection.find({"userEmail": data.userEmail})
    )

    # Send email to each trusted contact
    for contact in contacts:
        await send_sos_email(
            receiver=contact["email"],
            user_email=data.userEmail,
            latitude=data.latitude,
            longitude=data.longitude
        )

    return {
        "success": True,
        "message": "SOS saved successfully.",
        "location": {
            "lat": data.latitude,
            "lng": data.longitude
        }
    }