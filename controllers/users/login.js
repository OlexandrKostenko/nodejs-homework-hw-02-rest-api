const { User } = require('../../models');
require("dotenv").config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { SECRET_KEY } = process.env

const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(401).json({
        status: "error",
        code: 401,
        message: "Email or password is wrong"
      })
      return
    }
    const passCompare = bcrypt.compareSync(password, user.password);
    if (!passCompare) {
       res.status(401).json({
        status: "error",
        code: 401,
        message: "Email or password is wrong"
      })
      return 
    }
    const payload = {
        id: user._id
    };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
    await User.findByIdAndUpdate(user._id, { token });
    const { subscription } = user;
    res.json({
        status: 'success',
        code: 200,
        data: {
            token,
            user: {
                email,
                subscription
            }
        }
    })
}

module.exports = login;