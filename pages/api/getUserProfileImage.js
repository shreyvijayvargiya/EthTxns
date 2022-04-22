const toonavatar = require('cartoon-avatar');

module.exports = (req, res) => {
    const avatar = toonavatar.generate_avatar();
    res.send({ data: avatar, success: true, error: false });
};
