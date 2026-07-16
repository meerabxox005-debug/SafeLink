from fastapi import APIRouter, HTTPException
from bson import ObjectId

from app.database import contacts_collection
from app.models import Contact

router = APIRouter(
    prefix="/api/contacts",
    tags=["Trusted Contacts"]
)


# Add Contact
@router.post("/")
def add_contact(contact: Contact):

    contacts_collection.insert_one(contact.dict())

    return {
        "success": True,
        "message": "Contact added successfully"
    }


# Get Contacts
@router.get("/{userEmail}")
def get_contacts(userEmail: str):

    contacts = list(
        contacts_collection.find({"userEmail": userEmail})
    )

    for contact in contacts:
        contact["_id"] = str(contact["_id"])

    return contacts


# Delete Contact
@router.delete("/{contact_id}")
def delete_contact(contact_id: str):

    result = contacts_collection.delete_one(
        {"_id": ObjectId(contact_id)}
    )

    if result.deleted_count == 0:
        raise HTTPException(
            status_code=404,
            detail="Contact not found"
        )

    return {
        "success": True,
        "message": "Contact deleted successfully"
    }