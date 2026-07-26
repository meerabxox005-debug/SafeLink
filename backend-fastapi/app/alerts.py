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

...

@router.post("/")
async def send_sos(data: SOSRequest):

    # existing SOS code here

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