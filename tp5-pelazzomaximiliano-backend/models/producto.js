const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductoSchema = new Schema({
  nombre: {
    type: String,
    required: true
  },
  descripcion: {
    type: String
  },
  imagen: {
    type: String,
    required: true
  },
  precio: {
    type: Number,
    default: 0,
  },
  stock: {
    type: Number,
    required: true
  },
  destacado: { type: Boolean,
    required: true
  }
});

module.exports = mongoose.models.Producto || mongoose.model('Producto', ProductoSchema);
