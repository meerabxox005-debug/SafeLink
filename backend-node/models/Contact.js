const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  name: String,
  phone: String,
  email: String,
  relationship: String
});

module.exports = mongoose.model("Contact", contactSchema);