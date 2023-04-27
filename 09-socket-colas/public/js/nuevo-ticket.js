// Referencias HTML
lblNuevoTicket = document.getElementById('lblNuevoTicket');
btnNvoTicket = document.getElementById('btnNvoTicket');

const socket = io();

socket.on('connect', () => {
    btnNvoTicket.disable = false;
});

socket.on('disconnect', () => {
    btnNvoTicket.disable = true;    
});

socket.on('ultimo-ticket', (ultimo) => {
    lblNuevoTicket.innerText = 'Ticket ' + ultimo;
});

btnNvoTicket.addEventListener( 'click', () => {
    socket.emit( 'siguente-ticket', null, ( ticket ) => {
        lblNuevoTicket.innerText = ticket;
    });
});