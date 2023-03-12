const express = require('express');
const ctrl = require('../../controllers');

const { validation, ctrlWrapper } = require('../../middlewares');
const { userRegisterJoiSchema, userLoginJoiSchema} = require('../../models');

const router = express.Router();

router.post('/users/register', validation(userRegisterJoiSchema), ctrlWrapper(ctrl.register));

router.post('/users/login', validation(userLoginJoiSchema), ctrlWrapper(ctrl.login));

router.post('/users/logout', ctrlWrapper(ctrl.logout));