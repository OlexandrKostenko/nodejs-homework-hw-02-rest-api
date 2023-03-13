const { User, userRegisterJoiSchema, userLoginJoiSchema, userSubscriptionJoiSchema } = require('./user');
const { Contact, contactsJoiSchema } = require('./contact');

module.exports = {
    User,
    Contact,
    userRegisterJoiSchema,
    contactsJoiSchema,
    userLoginJoiSchema,
    userSubscriptionJoiSchema
}