const { Contact } = require('../../models/contact');

const getContactById = async (req, res) => {
    const { id } = req.params;
  const result = await Contact.findById(id);
  console.log(result);
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