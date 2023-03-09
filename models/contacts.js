const fs = require('fs').promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
}

async function getContactById(id) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === id);
    if (!result) {
        return null;
    }
    return result;
}

async function removeContact(id) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === id);
    if (idx === -1) {
        return null;
    }
    const newContacts = contacts.filter((_, index) => index !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return contacts[idx];
}

async function addContact(body) {
    const contacts = await listContacts();
    const newContact = { id: v4(), ...body};
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === id);
  if (idx === -1) {
    return null;
  };
  contacts[idx] = { ...body, id };
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return contacts[idx];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
