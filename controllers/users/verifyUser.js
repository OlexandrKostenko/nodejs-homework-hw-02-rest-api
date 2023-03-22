const { User } = require('../../models');

const verifyUser = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
    if (!user) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "User not found"
      })
      return
    }
    await User.findByIdAndUpdate(user._id, { verificationToken: "", verify: true })
    res.json({
      status: "success",
      code: 200,
      data: {
        message: 'Verification succesful'
      }
    })
  } 

module.exports = verifyUser;



