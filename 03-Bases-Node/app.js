const { generarTabla } = require('./helpers/multiplicar');
const argv = require('./config/yargs');


console.clear();
console.log(argv);
let base = argv.b;
let listar = argv.l;
let hasta = argv.h;

generarTabla(base, listar, hasta)
    .then(archivo => console.log(archivo))
    .catch(err => console.log(err));



//const [, , arg3 = 'base=1'] = process.argv;
//const [, base = 1] = arg3.split('=');
//console.log(base);
//let base = 7;
//generarTabla(base)
//    .then(archivo => console.log(archivo))
//    .catch(err => console.log(err));