const {addLike, getLikes} = require('../controllers/likeController');

const router = require('express').Router();


router.get('/',getLikes)
router.post('/',addLike)

module.exports = router