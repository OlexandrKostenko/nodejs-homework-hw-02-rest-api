const express = require('express');
const ctrl = require('../../controllers');

const { validation, ctrlWrapper, auth, upload } = require('../../middlewares');
const { userRegisterJoiSchema, userLoginJoiSchema, userSubscriptionJoiSchema, verifyEmailJoiSchema} = require('../../models');

const router = express.Router();

router.post('/register', validation(userRegisterJoiSchema), ctrlWrapper(ctrl.register));

router.get('/verify/:verificationToken', ctrlWrapper(ctrl.verifyUser));

router.post('/verify', validation(verifyEmailJoiSchema), ctrlWrapper(ctrl.resendVerifyEmail));

router.post('/login', validation(userLoginJoiSchema), ctrlWrapper(ctrl.login));

router.post('/logout', auth, ctrlWrapper(ctrl.logout));

router.post('/current', auth, ctrlWrapper(ctrl.getCurrent));

router.patch('/', auth, validation(userSubscriptionJoiSchema), ctrlWrapper(ctrl.updateSubscriptionUser));

router.patch('/avatars', auth, upload.single('avatar'), ctrlWrapper(ctrl.updateAvatarUser));

module.exports = router;