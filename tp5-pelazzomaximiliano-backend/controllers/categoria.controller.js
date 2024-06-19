const Categoria = require('../models/categoria');
const categoriaCtrl = {}

categoriaCtrl.createCategoria = async (req, res) => {
    var categoria = new Categoria(req.body)
    try {
        await categoria.save()
        res.json({
            'status': '1',
            'msg': 'Categoria guardada.'
        })
    }
    catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

categoriaCtrl.getCategorias = async (req, res) => {
    try {
        var categorias = await Categoria.find()
        res.json(categorias)
    }
    catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion.'
        })
    }
}

module.exports = categoriaCtrl