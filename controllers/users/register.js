const { User } = require('../../models');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');

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
  const result = await User.create({email, password: hashPassword, subscription, avatarURL});
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