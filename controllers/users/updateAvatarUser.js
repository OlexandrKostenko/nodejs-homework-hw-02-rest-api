const { User } = require('../../models');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

const avatarDir = path.join(__dirname, '../../', 'public', 'avatars');

const updateAvatarUser = async (req, res) => {
    try {
        const { path: tempUpload, filename } = req.file;
        const { _id } = req.user;
        const img = await Jimp.read(tempUpload)
        await img.autocrop().cover(250, 250, Jimp.HORIZONTAL_ALIGN_CENTER || Jimp.VERTICAL_ALIGN_MIDDLE).writeAsync(tempUpload);
        const [extention] = filename.split('.').reverse();
        const avatarName = `${_id}.${extention}`;
        const resultUpload = path.join(avatarDir, avatarName);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join('avatars', resultUpload);
        await User.findByIdAndUpdate(_id, { avatarURL });
        res.json({
            avatarURL,
        })
    } catch (error) {
        await fs.unlink(req.file.path);
        throw error;
    }
}

module.exports = updateAvatarUser;