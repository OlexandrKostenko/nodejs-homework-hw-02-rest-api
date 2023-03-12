const Joi = require("joi");
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    subscription: {
        type: String,
        enum: ["starter", "pro", "business"],
        default: "starter"
    },
    token: {
        type: String,
        default: null,
    },
});

const userRegisterJoiSchema = Joi.object({
  password: Joi.string().min(6).max(30).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid('starter', 'pro', 'business')
});

const userLoginJoiSchema = Joi.object({
  password: Joi.string().min(6).max(30).required(),
  email: Joi.string().email().required()
});

const User = model('user', userSchema);

module.exports = { User, userRegisterJoiSchema, userLoginJoiSchema };