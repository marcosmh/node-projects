const fs = require('fs');
const colors = require('colors');

/*
const generarTabla = (base = 1) => {
    console.log('=================');
    console.log(`Tabla del ${base}`);
    console.log('=================');

    let salida = '';
    for (let i = 1; i <= 10; i++) {
        salida += ` ${base} * ${i} = ${base * i} \n`;
    }

    console.log(salida)

    try {
        fs.writeFileSync(`tabla-${base}.txt`, salida);
        console.log(`Archivo creado. [tabla-${base}.txt]`);
    } catch (err) {
        return err;
    }

}*/

/*
const generarTabla = (base = 1) => {
    return new Promise((resolve, reject) => {
        console.log('=================');
        console.log(`Tabla del ${base}`);
        console.log('=================');

        let salida = '';
        for (let i = 1; i <= 10; i++) {
            salida += ` ${base} * ${i} = ${base * i} \n`;
        }

        console.log(salida);

        try {
            fs.writeFileSync(`tabla-${base}.txt`, salida);
            resolve(`Archivo creado. [tabla-${base}.txt]`);
        } catch (err) {
            reject('Error al crear el archivo');
        }
    });
    

}*/

const generarTabla = async(base = 1, listar = false, hasta = 10) => {
    let salida = '';
    for (let i = 1; i <= hasta; i++) {
        salida += ` ${base} * ${i} = ${base * i} \n`;
    }

    if (listar) {
        console.log('================='.yellow);
        console.log(`Tabla del ${base}`.yellow);
        console.log('================='.yellow);
        console.log(salida.green)
    }

    try {
        fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);
        return `Archivo creado. [tabla-${base}.txt]`.cyan;
    } catch (err) {
        return `Error al crear archivo: ${errr}`.red;
    }

}

module.exports = {
    generarTabla
}