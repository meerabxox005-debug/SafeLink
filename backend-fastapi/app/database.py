from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URI = os.getenv("MONGO_URI")

client = MongoClient(MONGO_URI)

db = client["safelink"]

users_collection = db["users"]
contacts_collection = db["contacts"]
alerts_collection = db["alerts"]

print("✅ MongoDB Connected")