const { Contact } = require('../../models/contact');

const listContacts = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  console.log(favorite);
  const skip = (page - 1) * limit;
  const contacts = await Contact.find({ owner: _id }, '', { skip, limit: Number(limit) }).populate('owner', '_id, email, subscription');
  
  if (favorite === 'false') {
    const notFavoriteContacts = await contacts.filter(item => item.favorite === false);
    res.json({
      status: "success",
      code: 200,
      data: {
        result: notFavoriteContacts
      }
    })
    return
  }
  if (favorite === 'true') {
    const favoriteContacts = await contacts.filter(item => item.favorite === true);
    res.json({
      status: "success",
      code: 200,
      data: {
        result: favoriteContacts
      }
    })
    return
  }
  res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts
      }
    })
}

module.exports = listContacts;