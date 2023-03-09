const contactsOperations = require('../models/contacts');

const getContactById = async (req, res) => {
    const { id } = req.params;
    const result = await contactsOperations.getContactById(id);
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
      data: {
        result
      }
    })
  } 

module.exports = getContactById;