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

    # Google Maps link
    map_link = f"https://maps.google.com/?q={data.latitude},{data.longitude}"

    # Save SOS alert
    alert = {
        "userEmail": data.userEmail,
        "latitude": data.latitude,
        "longitude": data.longitude,
        "locationLink": map_link,
        "createdAt": datetime.utcnow()
    }

    alerts_collection.insert_one(alert)

    # Get trusted contacts
    contacts = list(
        contacts_collection.find({"userEmail": data.userEmail})
    )

    # Send email to every trusted contact
    for contact in contacts:
        try:
             await send_sos_email(
            receiver=contact["email"],
            user_email=data.userEmail,
            latitude=data.latitude,
            longitude=data.longitude
        )
        except Exception as e: 
            print("Email failed:", e)

    return {
        "success": True,
        "message": "SOS saved successfully.",
        "location": {
            "lat": data.latitude,
            "lng": data.longitude
        }
    }


@router.get("/{user_email}")
async def get_alerts(user_email: str):

    alerts = list(
        alerts_collection.find(
            {"userEmail": user_email},
            {"_id": 0}
        )
    )

    return alerts