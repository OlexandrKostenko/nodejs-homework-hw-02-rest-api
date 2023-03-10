const express = require('express');
const ctrl = require('../../controllers');

const { validation, ctrlWrapper } = require('../../middlewares');
const { contactsSchema } = require('../../schemas');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:id', ctrlWrapper(ctrl.getContactById));

router.post('/', validation(contactsSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:id', ctrlWrapper(ctrl.removeContact));

router.put('/:id', validation(contactsSchema), ctrlWrapper(ctrl.updateContact));

module.exports = router;
