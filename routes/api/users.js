const express = require('express');
const ctrl = require('../../controllers');

const { validation, ctrlWrapper, auth } = require('../../middlewares');
const { userRegisterJoiSchema, userLoginJoiSchema} = require('../../models');

const router = express.Router();

router.post('/register', validation(userRegisterJoiSchema), ctrlWrapper(ctrl.register));

router.post('/login', validation(userLoginJoiSchema), ctrlWrapper(ctrl.login));

router.post('/logout', auth, ctrlWrapper(ctrl.logout));

router.post('/current', auth, ctrlWrapper(ctrl.getCurrent));