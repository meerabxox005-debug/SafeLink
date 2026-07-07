const Contact = require("./models/contact");

const contactSchema = new mongoose.Schema({
    userEmail: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    relationship: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Contact", contactSchema);