const { User } = require('../../models');

const updateSubscriptionUser = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;
    const result = await User.findByIdAndUpdate(_id, {subscription}, {new:true});
    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not Found"
      })
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    })
  }

module.exports = updateSubscriptionUser;