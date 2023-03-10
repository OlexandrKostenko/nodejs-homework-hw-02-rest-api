const { Contact } = require('../models/contact');

const removeContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndRemove(id);
    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found"
      })
      return
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted"
    })
  }

module.exports = removeContact;