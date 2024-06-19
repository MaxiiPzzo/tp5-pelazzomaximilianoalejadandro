const Ticket = require('../models/ticket')
const Espectador = require('../models/espectador')
const ticketCtrl = {}

// Dar de alta un ticket, enviar el espectador como propiedad
ticketCtrl.createTicker = async (req, res) => {
    const { precioTicket, categoriaEspectador, espectador } = req.body

    try {
        var ticket 
        if((typeof espectador) == "object"){
            //Añadir validaciones de DNI
            const nuevoEspectador = new Espectador(espectador)
            const espectadorGuardado = await nuevoEspectador.save();
            ticket = new Ticket({
            precioTicket,
            categoriaEspectador,
            espectador: espectadorGuardado._id
        })
        }
        else{
            ticket = new Ticket(req.body)
        }
        await ticket.save()
        res.json({
            'status': '1',
            'msg': 'Ticket guardado.'
        })
    }
    catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando operacion.'
        })
    }
}

// Recuperar TODOS los ticket, incluyendo la información de los espectadores
ticketCtrl.getTickets = async (req, res) => {
    try {
        var tickets = await Ticket.find().populate('espectador').populate('categoria').exec()
        res.json(tickets)
    }
    catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion.'
        })
    }
}

ticketCtrl.getTicketByCategoria = async (req, res) => {
    try {
        var tickets = await Ticket.find({ categoria: req.params.cat }).populate('espectador').populate('categoria').exec()
        res.json(tickets)
    }
    catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion.'
        })
    }
}

ticketCtrl.getTicketById = async (req, res) => {
    try {
        var tickets = await Ticket.findById({ _id: req.params.id })
        res.json(tickets)
    }
    catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion.'
        })
    }
}

// Eliminar un ticket
ticketCtrl.deleteTicket = async (req, res) => {
    try {
        await Ticket.deleteOne({ _id: req.params.id });
        res.json({
            status: '1',
            msg: 'Ticket removed'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion'
        })
    }
}

// Modificar un ticket
ticketCtrl.editTicket = async (req, res) => {
    const vticket = new Ticket(req.body);
    try {
        await Ticket.updateOne({ _id: req.body._id }, vticket);
        res.json({
            'status': '1',
            'msg': 'Ticket updated'
        })
    } catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion.'
        })
    }
}

// Recuperar SOLO los espectadores que tienen una determinada categoría de espectador
ticketCtrl.getTicketsByCategoriaEspectador = async (req, res) => {
    try {
        const categoria = req.query.categoria
        var tickets = await Ticket.find( { categoriaEspectador : categoria } ).populate('espectador').exec()
        res.json(tickets)
    }
    catch (error) {
        res.status(400).json({
            'status': '0',
            'msg': 'Error procesando la operacion.'
        })
    }
}


module.exports = ticketCtrl
