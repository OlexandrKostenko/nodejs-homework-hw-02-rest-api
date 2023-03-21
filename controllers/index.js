const listContacts = require('./contacts/listContacts');
const getContactById = require('./contacts/getContactById');
const addContact = require('./contacts/addContact');
const removeContact = require('./contacts/removeContact');
const updateContact = require('./contacts/updateContact');
const updateStatusContact = require('./contacts/updateStatusContact');
const register = require('./users/register');
const login = require('./users/login');
const logout = require('./users/logout');
const getCurrent = require('./users/getCurrent');
const updateSubscriptionUser = require('./users/updateSubscriptionUser');
const updateAvatarUser = require('./users/updateAvatarUser');
const verifyUser = require('./users/verifyUser');
const resendVerifyEmail = require('./users/resendVerifyEmail');

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact,
    register,
    login,
    logout,
    getCurrent,
    updateSubscriptionUser,
    updateAvatarUser,
    verifyUser,
    resendVerifyEmail
}