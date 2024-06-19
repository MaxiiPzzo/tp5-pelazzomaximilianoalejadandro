const transaccionCtrl = require('./../controllers/transaccion.controller');

const express = require('express')
const router = express.Router()

function validateDivisasParams(req, res, next) {
    const { origen, destino } = req.query
    if (!origen || !destino) {
        return res.status(400).json({ message: 'Los parámetros origen y destino son obligatorios.' })
    }
    next()
}

router.post('/', transaccionCtrl.createTransaccion)
router.get('/', transaccionCtrl.getTransacciones)
router.get('/divisas', validateDivisasParams,transaccionCtrl.getTransaccionesByDivisa)
router.get('/:email', transaccionCtrl.getTransaccionesByEmailCliente)

module.exports = router