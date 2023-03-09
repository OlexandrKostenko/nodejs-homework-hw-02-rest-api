const contactsOperations = require('../models/contacts');

const removeContact = async (req, res) => {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
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