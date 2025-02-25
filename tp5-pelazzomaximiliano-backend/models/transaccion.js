const mongoose = require('mongoose');
const { Schema } = mongoose;

const TransaccionSchema = new Schema({
    monedaOrigen: {
        type: String,
        required: true
    },
    monedaDestino: {
        type: String,
        required: true
    },
    cantidadOrigen: {
        type: Number,
        required: true
    },
    cantidadDestino: {
        type: Number,
        required: true
    },
    emailCliente: {
        type: String,
        required: true
    },
    tasaConversion: {
        type: Number
    }
})

module.exports = mongoose.models.Transaccion || mongoose.model('Transaccion', TransaccionSchema);
