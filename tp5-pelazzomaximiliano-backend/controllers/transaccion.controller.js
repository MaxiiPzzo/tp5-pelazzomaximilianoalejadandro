const Transaccion = require('../models/transaccion');
const transaccionCtrl = {}

//Dar de alta una Transaccion
transaccionCtrl.createTransaccion = async (req, res) => {
    var transaccion = new Transaccion(req.body)
    try {
        await transaccion.save()
        res.json({
            'status': '1',
            'msg': 'Transaccion guardada.'
        })
    }
    catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

//Recuperar TODAS las Transacciones Registradas
transaccionCtrl.getTransacciones = async (req, res) => {
    try {
        var transacciones = await Transaccion.find()
        res.json(transacciones)
    }
    catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion.'
        })
    }
}

//Recuperar el histórico de transacciones de un determinado cliente (GET), utilizar email como clave
transaccionCtrl.getTransaccionesByEmailCliente = async (req, res) => {
    const email = req.params.email
    try {
        var transaccionesCliente = await Transaccion.find({ emailCliente: email })
        res.json(transaccionesCliente)
    }
    catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion.'
        })
    }
}

// Recuperar TODAS las Transacciones que tengan como origen y destino las divisas (monedas) recibidas como parámetro
transaccionCtrl.getTransaccionesByDivisa = async (req, res) => {
    try {
        var transaccionesDivisa = await Transaccion.find({ monedaOrigen: req.query.origen, monedaDestino: req.query.destino })
        res.json(transaccionesDivisa)
    }
    catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion.'
        })
    }
}

module.exports = transaccionCtrl