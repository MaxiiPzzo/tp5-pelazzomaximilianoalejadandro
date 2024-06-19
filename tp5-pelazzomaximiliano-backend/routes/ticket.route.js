const ticketCtrl = require('./../controllers/ticket.controller')

const express = require('express')
const router = express.Router()

router.post('/', ticketCtrl.createTicker)
router.put('/:id', ticketCtrl.editTicket)
router.get('/', ticketCtrl.getTickets)
router.get('/categoria', ticketCtrl.getTicketsByCategoriaEspectador)
router.get('/categoria/:cat', ticketCtrl.getTicketByCategoria)
router.get('/:id',ticketCtrl.getTicketById)
router.delete('/:id',ticketCtrl.deleteTicket)

module.exports = router