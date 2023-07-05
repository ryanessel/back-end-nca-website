const { Schema, model } = require("mongoose");

const contactSchema = new Schema(
    {
        firstName: {
            type: String
        },
        lastName: {
            type: String
        },

        email: {
            type: String
        },

        company: {
            type: String
        },

        phone: {
            type: String
        },

        city: {
            type: String
        },

        stateProvince: {
            type: String
        },

        country: {
            type: String
        },

        message: {
            type: String
        },
    },
    {
        timestamps: true,
    }
);

const Contact = model("Contact", contactSchema);

module.exports = Contact;