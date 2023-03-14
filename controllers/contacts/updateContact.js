const { Contact } = require('../../models/contact');

const updateContact = async (req, res) => {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);
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

module.exports = updateContact;