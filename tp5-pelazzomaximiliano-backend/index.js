const express = require('express')
const cors = require('cors')
const { mongoose } = require('./database')
var app = express()

app.use(express.json())
app.use(cors({ origin: 'http://localhost:4200' }))

app.use('/api/producto', require('./routes/producto.route.js'));
app.use('/api/transaccion', require('./routes/transaccion.route.js'))
app.use('/api/espectador', require('./routes/espectador.route.js'))
app.use('/api/ticket', require('./routes/ticket.route.js'));
app.use('/api/categoria', require('./routes/categoria.route.js'));

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
    console.log(`Server started on port`, app.get('port'))
})
