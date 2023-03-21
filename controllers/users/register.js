const { User } = require('../../models');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { v4 } = require('uuid');
const sendEmail = require('../../middlewares/sendEmail');

const register = async (req, res) => {
    const { email, password, subscription } = req.body;
    const isUser = await User.findOne({email})
    if (isUser) {
        res.status(409).json({
        status: "error",
        code: 409,
        message: "Email in use"
      })
      return
    }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);
  const verificationToken = v4();
  const result = await User.create({ email, password: hashPassword, subscription, avatarURL, verificationToken });
  const mail = {
    to: email,
    subject: "Verificate your email",
    html: `<a href="http://localhost:3000/users/verify/${verificationToken}" target="_blank">Touch here to verify your email</a>`,
  };
  
  await sendEmail(mail);
    res.status(201).json({
      status: "success",
      code: 201,
      user: {
          email: result.email,
          subscription: result.subscription,
          avatarURL: result.avatarURL
      }
    })
}

module.exports = register;