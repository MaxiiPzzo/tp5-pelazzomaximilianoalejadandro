const productoCtrl = require('./../controllers/producto.controller')

const express = require('express')
const router = express.Router()

router.post('/', productoCtrl.createProducto)
router.get('/', productoCtrl.getProductos)
router.delete('/:id', productoCtrl.deleteProducto)
router.put('/:id', productoCtrl.editProducto)
router.get('/destacados', productoCtrl.getProductosDestacados)

module.exports = router