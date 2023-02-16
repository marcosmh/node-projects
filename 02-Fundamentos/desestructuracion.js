const deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneracion',
    getNombre() {
        return ` ${this.nombre} ${this.apellido} ${this.poder}`
    }
}


console.log(deadpool.getNombre());

//const nombre = deadpool.nombre;
//const apellido = deadpool.apellido;
///const poder = deadpool.poder;

const { nombre, apellido, poder, edad = 0 } = deadpool;

console.log(nombre, apellido, poder, edad);


function imprimeHeroe(heroe) {
    console.log("fn 1");
    const { nombre, apellido, poder, edad = 0 } = heroe;
    console.log(nombre, apellido, poder, edad);
}

function imprimeHeroe2({ nombre, apellido, poder, edad = 0 }) {
    console.log("fn 2");
    console.log(nombre, apellido, poder, edad);
}

imprimeHeroe(deadpool);

imprimeHeroe2(deadpool);

const heroes = ['Deadpool', 'Superman', 'Batman'];

//const h1 = heroes[0];
//const h2 = heroes[1];
//const h3 = heroes[2];

const [h1, h2, h3] = heroes;
const [, , hx] = heroes;
console.log(h1, h2, h3);
console.log(hx);