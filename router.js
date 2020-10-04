const express = require('express')
const router = express.Router()

const controller = require('./controller')

router.get('/', controller.loader)
router.post('/load', controller.create)
router.post('/upload', controller.upload)

module.exports = router