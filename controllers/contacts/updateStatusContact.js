const { Contact } = require('../../models/contact');

const updateStatusContact = async (req, res) => {
    const { id } = req.params;
    const { favorite } = req.body;
    const result = await Contact.findByIdAndUpdate(id, {favorite}, {new:true});
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

module.exports = updateStatusContact;