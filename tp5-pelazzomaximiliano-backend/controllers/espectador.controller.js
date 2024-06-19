const Espectador = require('../models/espectador');
const espectadorCtrl = {}

// Dar de alta una Espectador
espectadorCtrl.createEspectador = async (req, res) => {
    var espectador = new Espectador(req.body)
    try {
        await espectador.save()
        res.json({
            'status': '1',
            'msg': 'Espectador guardado.'
        })
    }
    catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

// Obtener todas los Espectadores
espectadorCtrl.getEspectadores = async (req, res) => {
    try {
        var espectador = await Espectador.find()
        res.json(espectador)
    }
    catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion.'
        })
    }
}

// Obtener UN Espectador
espectadorCtrl.getEspectadorByID = async (req, res) => {
    try {
        var espectador = await Espectador.findById(req.params.id)
        res.json(espectador)
    }
    catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion.'
        })
    }
}

module.exports = espectadorCtrl