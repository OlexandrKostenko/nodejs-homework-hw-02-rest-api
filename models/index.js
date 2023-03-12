const { User, userRegisterJoiSchema, userLoginJoiSchema } = require('./user');
const { Contact, contactsJoiSchema } = require('./contact');

module.exports = {
    User,
    Contact,
    userRegisterJoiSchema,
    contactsJoiSchema,
    userLoginJoiSchema
}