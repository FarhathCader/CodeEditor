const express = require('express')
const router = express.Router()

const {addProblem,getProblems,getProblem, updateInitialCode} = require('../controllers/probelmController')

router.post('/',addProblem)
router.get('/',getProblems)
router.get('/:id',getProblem)
router.patch('/:id',updateInitialCode)


module.exports = router