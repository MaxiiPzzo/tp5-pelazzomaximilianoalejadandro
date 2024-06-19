const espectadorCtrl = require('./../controllers/espectador.controller')

const express = require('express')
const router = express.Router()

router.post('/', espectadorCtrl.createEspectador)
router.get('/', espectadorCtrl.getEspectadores)
router.get('/:id', espectadorCtrl.getEspectadorByID)

module.exports = router