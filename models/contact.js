const Joi = require("joi");
const { Schema, model } = require('mongoose');

const contactSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Set name for contact'],
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    favorite: {
        type: Boolean,
        default: false,
    },
},
{ versionKey: false, timestamps: true },
);



const contactsJoiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(5).max(15).required(),
  favorite: Joi.bool()
});

const favoriteContactsJoiSchema = Joi.object({
  favorite: Joi.bool().required()
});



const Contact = model('contact', contactSchema);

module.exports = {
    Contact,
    contactsJoiSchema,
    favoriteContactsJoiSchema};