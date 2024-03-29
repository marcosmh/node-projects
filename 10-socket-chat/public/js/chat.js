const url = ( window.location.hostname.includes('localhost') )
            ? 'http://localhost:8080/api/auth/'
            : 'https://restserver-curso-fher.herokuapp.com/api/auth/';


let usuario = null;
let socket = null;

//referencias html
const txtUid     = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuario  = document.querySelector('#ulUsuario');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir   = document.querySelector('#btnSalir');



const validarJWT = async() => {
    const token = localStorage.getItem('token') || '';

    if(token <= 10) {
        window.location = 'index.html';
        throw new Error('No hay token en el servidor.');
    }

    const resp = await fetch( url, {
        headers: { 'x-token': token }
    });

    const { usuario: user, token: tokenn } = await resp.json();
    localStorage.setItem('token',tokenn);
    usuario = user;
    document.title = usuario.nombre;
    
    await conectarSocket();
}

const conectarSocket = () => {
    socket = io({
        'extraHeaders': {
            'x-token': localStorage.getItem('token')
        }
    });

    socket.on('connect', () => {
        console.log('Sockets Online.');
    });

    socket.on('disconnect', () => {
        console.log('Sockets Offline.');
    });
    
    socket.on('recibir-mensaje', () => {

    });

    socket.on('usuarios-activos', dibujarUsuarios );


    socket.on('mensaje-privado', () => {

    });

}


const dibujarUsuarios = ( usuarios = [] )=> {
    let usersHtml = '';
    usuarios.forEach( ( { nombre, uid } ) =>{       
        usersHtml = `
            <li>
                <p>
                    <h5 class="text-success"> ${ nombre } </h5>
                    <span class="fs-6 text-muted"> ${ uid } </span>
                </p>
            </li>
        `;
        
    });
    ulUsuario.innerHTML = usersHtml;

};


const main = async() => {

    await validarJWT();

}


