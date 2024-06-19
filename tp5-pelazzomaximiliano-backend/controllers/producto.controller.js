const Producto = require('../models/producto');
const productoCtrl = {}

//Dar de alta un Producto
productoCtrl.createProducto = async (req, res) => {
    var producto = new Producto(req.body);
    try {
        await producto.save();
        res.json({
            'status': '1',
            'msg': 'Producto guardado.'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

//Recuperar TODOS los productos
productoCtrl.getProductos = async (req, res) => {
    try {
        var productos = await Producto.find()
        res.json(productos);
    }
    catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion.'
        })
    }
}

// Eliminar un producto
productoCtrl.deleteProducto = async (req, res) => {
    try {
        await Producto.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Producto removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

// Modificar un producto
productoCtrl.editProducto = async (req, res) => {
    const vproducto = req.body;
    try {
        await Producto.updateOne({ _id: req.params.id }, vproducto);
        res.json({
            'status': '1',
            'msg': 'Producto updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion.'
        })
    }
}

// Recuperar los productos DESTACADOS
productoCtrl.getProductosDestacados = async (req, res) => {
    try {
        var productos = await Producto.find({ destacado: true })
        res.json(productos);
    }
    catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion.'
        })
    }
}


module.exports = productoCtrl;
