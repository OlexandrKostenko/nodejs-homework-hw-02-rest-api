const express = require('express');
const ctrl = require('../../controllers');

const { validation, ctrlWrapper, auth } = require('../../middlewares');
const { contactsJoiSchema, favoriteContactsJoiSchema } = require('../../models/contact');

const router = express.Router();

router.get('/', auth, ctrlWrapper(ctrl.listContacts));

router.get('/:id', auth, ctrlWrapper(ctrl.getContactById));

router.post('/', auth, validation(contactsJoiSchema), ctrlWrapper(ctrl.addContact));

router.delete('/:id', auth, ctrlWrapper(ctrl.removeContact));

router.put('/:id', auth, validation(contactsJoiSchema), ctrlWrapper(ctrl.updateContact));

router.patch('/:id/favorite', auth, validation(favoriteContactsJoiSchema), ctrlWrapper(ctrl.updateStatusContact));

module.exports = router;
