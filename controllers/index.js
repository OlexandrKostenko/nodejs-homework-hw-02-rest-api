const listContacts = require('./contacts/listContacts');
const getContactById = require('./contacts/getContactById');
const addContact = require('./contacts/addContact');
const removeContact = require('./contacts/removeContact');
const updateContact = require('./contacts/updateContact');
const updateStatusContact = require('./contacts/updateStatusContact');

module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact,
    updateStatusContact
}