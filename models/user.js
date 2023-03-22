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
  avatarURL: {
    type: String,
    required: true,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, 'Verify token is required'],
  },
  token: {
    type: String,
    default: null,
  },
},
    { versionKey: false, timestamps: true },
);

const userRegisterJoiSchema = Joi.object({
  password: Joi.string().min(6).max(30).required(),
  email: Joi.string().email().required(),
  subscription: Joi.string().valid('starter', 'pro', 'business')
});

const userLoginJoiSchema = Joi.object({
  password: Joi.string().min(6).max(30).required(),
  email: Joi.string().email().required()
});

const userSubscriptionJoiSchema = Joi.object({
  subscription: Joi.string().valid('starter', 'pro', 'business').required()
});

const verifyEmailJoiSchema = Joi.object({
  email: Joi.string().email().required()
});

const User = model('user', userSchema);

module.exports = { User, userRegisterJoiSchema, userLoginJoiSchema, userSubscriptionJoiSchema, verifyEmailJoiSchema };