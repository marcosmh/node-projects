const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    console.log('Cliente Conectado.',socket.id);

    socket.emit('ultimo-ticket',ticketControl.ultimo);
    socket.emit('estado-actual',ticketControl.ultimos4);
    socket.emit('tickets-pendientes',ticketControl.tickets.length);
    

    socket.on('disconnect', () => {
        console.log('Cliente Desconectado.',socket.id);
    });

    socket.on('siguente-ticket', (payload, callback) => {
        
        const siguente = ticketControl.siguiente();
        callback( siguente );

        
        socket.broadcast.emit('tickets-pendientes',ticketControl.tickets.length);
        
    });

    socket.on('atender-ticket',({ escritorio }, callback) =>{
        
        console.log(escritorio);
        
        if(!escritorio) {
            return callback({
                ok: false,
                msg: 'El  escritorio es obligatorio'
            });
        }

        const ticket = ticketControl.atenderTicket( escritorio );

    
        socket.broadcast.emit('estado-actual',ticketControl.ultimos4);
        socket.emit('tickets-pendientes',ticketControl.tickets.length);
        socket.broadcast.emit('tickets-pendientes',ticketControl.tickets.length);

        if(!ticket) {
            callback({
                ok: false,
                msg: 'Ya no hay tickets pendientes.'
            });
        } else {
            callback({
                ok: false,
                ticket
            });
        }

    });

}


module.exports = {
    socketController
}