// Import required packages
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");   // <-- Add this
console.log("MONGO_URI =", process.env.MONGO_URI);
const Contact = require("./models/Contact");
const Alert = require("./models/Alert");
const nodemailer = require("nodemailer");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

// Create Express app
const app = express();

// Connect to MongoDB  <-- Add this block
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log(err));

// Middleware
app.use(cors());
app.use(express.json());

// Email transporter
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
});
transporter.verify(function (error, success) {
    if (error) {
        console.log("SMTP Error:", error);
    } else {
        console.log("✅ Brevo SMTP is ready!");
    }
});

// Home route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Home route is working!"
    });
});

// Test API route
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "Welcome to SafeLink AI API!",
        version: "1.0.0"
    });
});

// Login API
app.post("/api/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "Invalid email or password."
            });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Invalid email or password."
            });
        }

       res.json({
    success: true,
    message: "Login Successful!",
    user: {
        name: user.name,
        email: user.email
    }
});

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});
// Server configuration
const PORT = process.env.PORT || 3000;

// Health check route
app.get("/health", (req, res) => {
  res.json({
    status: "SafeLink AI backend is running 🚀",
    time: new Date()
  });
});

// Signup API
app.post("/api/signup", async (req, res) => {

    try {

        const { name, email, phone, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({
                success: false,
                message: "Email already registered."
            });
        }

        // Encrypt password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = new User({
            name,
            email,
            phone,
            password: hashedPassword
        });

        await user.save();

        res.json({
            success: true,
            message: "Account created successfully!"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// Add Contact API
app.get("/api/contacts/:email", async (req, res) => {

    try {

        const contacts = await Contact.find({
            userEmail: req.params.email
        });
        console.log("Contacts:");
console.log(JSON.stringify(contacts, null, 2));

        res.json(contacts);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// Add Contact API
app.post("/api/add-contact", async (req, res) => {
    console.log(req.body);
    try {

        const {
    userEmail,
    name,
    phone,
    email,
    relationship
} = req.body;
const contact = new Contact({
    userEmail,
    name,
    phone,
    email,
    relationship
});

        await contact.save();

        res.json({
            success: true,
            message: "Contact added successfully!"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

}); 

// Delete Contact API
app.delete("/api/delete-contact/:id", async (req, res) => {

    try {

        await Contact.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Contact deleted successfully!"
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// Save SOS Alert
app.post("/api/sos", async (req, res) => {

    try {

        const { userEmail, latitude, longitude, locationLink } = req.body;

        const alert = new Alert({
            userEmail,
            latitude,
            longitude,
            locationLink
        });

        await alert.save();

// Get all trusted contacts
const contacts = await Contact.find({
    userEmail
});

// Send email to each contact
for (const contact of contacts) {

    if (!contact.email) continue;

    const mailOptions = {
       from: `"SafeLink AI" <${process.env.SENDER_EMAIL}>`,
        to: contact.email,
        subject: "🚨 SafeLink Emergency SOS Alert",
        html: `
            <h2>Emergency SOS Alert</h2>

            <p>Hello <b>${contact.name}</b>,</p>

            <p><b>${userEmail}</b> has triggered an emergency SOS alert.</p>

            <p><b>Relationship:</b> ${contact.relationship}</p>

            <p><b>Location:</b></p>

            <a href="${locationLink}">
                ${locationLink}
            </a>

            <br><br>

            <p>Please contact them immediately.</p>

            <hr>

            <small>This alert was sent automatically by SafeLink AI.</small>
        `
    };

try {
    console.log("Sending email to:", contact.email);

const info = await transporter.sendMail(mailOptions);

console.log("✅ Email sent:", info.response);
} catch (err) {
    console.log("❌ Email failed:");
    console.log(err);
}
}

res.json({
    success: true,
    message: "SOS Alert sent successfully!"
});
    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// Get Alert History
app.get("/api/alerts/:email", async (req, res) => {

    try {

        const alerts = await Alert.find({
            userEmail: req.params.email
        }).sort({ createdAt: -1 });

        res.json(alerts);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// Get trusted contacts for SOS
app.get("/api/sos-contacts/:email", async (req, res) => {

    try {

        const contacts = await Contact.find({
            userEmail: req.params.email
        });

        res.json({
            success: true,
            contacts
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

});

// ================= CHATBOT API =================

app.post("/api/chatbot", async (req, res) => {

    try {

        const { message } = req.body;

        const prompt = `
You are SafeLink AI, the official AI assistant of the SafeLink emergency safety application.

Your personality:
- Friendly, calm and supportive.
- Speak in simple English.
- Keep answers between 2 and 5 sentences unless the user asks for more detail.

Your responsibilities:
- Help users stay safe.
- Give personal safety advice.
- Explain first aid in general terms.
- Give emergency preparedness tips.
- Explain that SafeLink is an emergency safety application designed to help users stay safe by providing SOS alerts, live location sharing, trusted contacts, emergency guidance, and an AI safety assistant.
- Explain SafeLink features clearly whenever users ask about them.
- Answer greetings and general conversation politely.
- For first aid questions, provide brief, accurate first aid guidance suitable for the general public, while reminding users that formal training is recommended.
- When users ask "What is SafeLink?" or ask about the app, explain: "SafeLink is an emergency safety application designed to help users stay safe by providing SOS alerts, live location sharing, trusted contacts, emergency guidance, and an AI safety assistant."

Rules:
- If the user appears to describe an emergency, advise them to contact local emergency services immediately and use the SafeLink SOS feature.
- Do not claim to be a doctor, lawyer, or emergency responder.
- If you're unsure, say you don't know rather than making something up.
- Avoid helping with illegal or harmful activities.
- You may answer simple greetings and casual conversation.
- If a question is unrelated to safety, briefly answer it if it is harmless, then gently guide the conversation back to safety or SafeLink whenever appropriate.
- When answering first aid questions, provide practical step-by-step guidance in simple language, but remind users to seek professional medical help for serious injuries or emergencies.

User:
${message}
`;

       const result = await model.generateContent(prompt);

const response = await result.response;

let reply = response.text();

const emergencyWords = [
     "emergency",
    "danger",
    "attack",
    "fire",
    "earthquake",
    "accident",
    "help",
    "harassment",
    "harassing",
    "follow",
    "following",
    "stalking",
    "violence",
    "kidnap",
    "kidnapping",
    "robbery",
    "assault",
    "abuse",
    "threat",
    "threatening",
    "injured"
];

if (emergencyWords.some(word => message.toLowerCase().includes(word))) {

    reply += `

🚨 If you're in immediate danger, use the SafeLink SOS button and contact your local emergency services immediately.`;

}

        res.json({
            success: true,
            reply
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            success: false,
            reply: "Sorry, I'm having trouble responding right now. Please try again."
        });

    }

});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server is running on https://safelink-hbf7.onrender.com:${PORT}`);
});