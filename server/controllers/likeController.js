const Like = require('../models/likeModel');
const addLike = async (req, res) => {
    try {
        const { name } = req.body;
        const like = await Like.create({ name });
      
        // Emit the notification event
        return res.status(201).json({ like });
    } catch (err) {
        return res.status(400).json({ msg: err.message });
    }
}

const getLikes = async (req, res) => {
    try {
        const likes = await Like.find();
        return res.status(200).json({ likes });
    } catch (err) {
        return res.status(400).json({ msg: err.message });
    }
}

module.exports = { addLike, getLikes };
