const { Socket } = require("socket.io");
const { comprobarJwt } = require("../helpers");
const { ChatMensajes } = require('../models');

const chatMensajes = new ChatMensajes();

const socketController = async( socket = new Socket(), io ) => {
    console.log('socketController...');
    
    //const token = socket.handshake.headers['x-token'];
    //console.log(token);
    //const usuario = await comprobarJwt(token);

    const usuario = await comprobarJwt(socket.handshake.headers['x-token']);
    if(!usuario ) {
        console.log('No existe el usuario...');
        return socket.disconnect();
    }

    // Agregar el usuario conectado
    chatMensajes.conectarUsuario( usuario);
    io.emit('usuarios-activos', chatMensajes.usuariosArr );

    // Limpiar cuando se desconectan
    socket.on('disconnect', () => {
        chatMensajes.desconectarUsuario( usuario.id );
        io.emit('usuarios-activos', chatMensajes.usuariosArr );
    });


}


module.exports = {
    socketController
}