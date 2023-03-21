const { User } = require('../../models');
const sendEmail = require('../../middlewares/sendEmail');

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found"
      })
    }
    if (user.verify) {
        res.status(400).json({
            status: "error",
            code: 400,
            message: "Verification has already been passed"
        })
    }
    const mail = {
        to: email,
        subject: "Verificate your email",
        html: `<a href="http://localhost:3000/users/verify/${user.verificationToken}" target="_blank">Touch here to verify your email</a>`,
    };

    await sendEmail(mail);
    res.json({
        message: "Verification email sent"
    })
}

module.exports = resendVerifyEmail;