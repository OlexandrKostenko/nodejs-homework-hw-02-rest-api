const validation = require('./validation');
const ctrlWrapper = require('./ctrlWrapper');
const auth = require('./auth');
const upload = require('./upload');
const sendEmail = require('./sendEmail');

module.exports = {
    validation,
    ctrlWrapper,
    auth,
    upload,
    sendEmail,
}