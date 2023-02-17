const fs = require('fs');

let base = 3;
console.clear();
console.log('=================');
console.log(`Tabla del ${base}`);
console.log('=================');


let salida = '';


const generarTabla = () => {
    for (let i = 1; i <= 10; i++) {
        salida += ` ${base} * ${i} = ${base * i} \n`;
    }
    return salida;
}

salida = generarTabla();
console.log(salida);

fs.writeFile(`tabla-${base}.txt`, salida, (err) => {
    if (err) throw err;
    console.log(`Archivo creado. [tabla-${base}.txt]`);
});