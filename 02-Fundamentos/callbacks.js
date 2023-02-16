//setTimeout(function() {
//    console.log('Hola mundo');
//}, 1000);

//setTimeout(() => {
//    console.log('Hola mundo2');
//}, 2000);

const getUsuarioById = (id, callback) => {
    const usuario = {
        id,
        nombre: 'Marcos'
    }

    setTimeout(() => {
        callback(usuario);
    }, 1600);
}

getUsuarioById(10, ((usuario) => {
    console.log(usuario.id);
    console.log(usuario.nombre.toUpperCase());
}));