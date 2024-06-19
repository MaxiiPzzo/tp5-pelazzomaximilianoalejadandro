const mongoose = require('mongoose');
const { Schema } = mongoose;

const TicketSchema = new Schema({
    precioTicket: {
        type: Number,
        required: true
    },
    categoriaEspectador: {
        type: String,
        required: true
    },
    fechaCompra: {
        type: Date,
        default: new Date()
    },
    espectador: {
        type: Schema.Types.ObjectId,
        ref: 'Espectador',
        required: true
    },
    categoria: {
        type:Schema.Types.ObjectId,
        ref: 'Categoria',
    }
})

module.exports = mongoose.models.Ticket || mongoose.model('Ticket', TicketSchema);