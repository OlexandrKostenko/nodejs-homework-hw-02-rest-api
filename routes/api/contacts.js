const express = require('express');
const ctrl = require('../../controllers');

const { validation, ctrlWrapper } = require('../../middlewares');
const { contactsJoiSchema, favoriteContactsJoiSchema } = require('../../models/contact');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.listContacts));

router.get('/:id', ctrlWrapper(ctrl.getContactById));

router.post('/', validation(contactsJoiSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:id', ctrlWrapper(ctrl.removeContact));

router.put('/:id', validation(contactsJoiSchema), ctrlWrapper(ctrl.updateContact));

router.patch('/:id/favorite', validation(favoriteContactsJoiSchema), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
