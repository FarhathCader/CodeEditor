const express = require('express')
const router = express.Router()
const {postSubmission} = require('../controllers/submissionController');

router.post('/', postSubmission);

module.exports = router