const path = require('path');
const fs = require('fs');

class Ticket {

    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }
}

class TicketControl {

    constructor() {
        console.log('soy el constructor TicketControl');

        this.ultimo   = 0;
        this.hoy      = new Date().getDate();
        this.tickets  = [];
        this.ultimos4 =[];
        this.init();
    }

    get toJson() {
        return {
            "ultimo": this.ultimo, 
            "hoy": this.hoy,
            "tickets": this.tickets,
            "ultimos4": this.ultimos4
        }
    }


    init() {
        console.log('init');
        const { hoy, ultimo, tickets, ultimos4 } = require('../db/data.json');

        console.log(" hoy= "+hoy+'  ultimo= '+ultimo+' tickets= '+tickets+' ultimos4= '+ultimos4);

        
        if(hoy == this.hoy) {
            console.log('Día Actual');
            this.ultimo = ultimo;
            this.ultimos4 = ultimos4;

        } else {
            console.log('Es otro dìa');
            this.guardarDB();
        }

    }

    guardarDB() {
       console.log('Guardando en la base de datos ....')
       const dbPath = path.join(__dirname, '../db/data.json');
       fs.writeFileSync( dbPath, JSON.stringify(this.toJson )) ;
       console.log('Datos guardados en la base de datos ....')
    }

    siguiente() {
        console.log('Siguiente => ');
        this.ultimo += 1;
        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push( ticket );

        this.guardarDB();

        return 'Ticket ' +  ticket.numero;
    }

    atenderTicket(escritorio) {
        console.log('atenderTicket => ');
        
        if( this.tickets.length === 0) {
            return null;
        }

        const ticket =  this.tickets.shift(); //this.tickets[0];
        ticket.escritorio = escritorio;
        this.ultimos4.unshift(ticket);

        if(this.ultimos4.length > 4) {
            this.ultimos4.splice(-1,1);
        }

        this.guardarDB();

        return ticket;

    }


}



module.exports = TicketControl;
