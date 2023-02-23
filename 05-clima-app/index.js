require('dotenv').config();

const {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares
} = require('./helpers/inquirer');
const Busquedas = require('./models/busquedas');

const main = async() => {

    let opt = 0;
    const busquedas = new Busquedas();

    do {
        opt = await inquirerMenu();
        console.log({ opt });
        switch (opt) {
            case 1:
                const termino = await leerInput('Ciudad: ');
                const lugares = await busquedas.ciudad(termino);
                const id = await listarLugares(lugares);

                if (id === '0') continue;

                const lugarSelec = lugares.find(l => l.id === id);

                busquedas.agregarHistorial(lugarSelec.nombre);

                const clima = busquedas.climaLugar(lugarSelec.lat, lugarSelec.lng);

                console.log('\nInformación de la Ciudad\n'.green);
                console.log('Ciudad:'.yellow, lugarSelec.nombre.toString().cyan);
                console.log('Lat:'.yellow, lugarSelec.lat.toString().cyan);
                console.log('Lng:'.yellow, lugarSelec.lng.toString().cyan);
                console.log('Temperatura:'.yellow, clima.temp.toString().cyan);
                console.log('Mínima:'.yellow, clima.min.toString().cyan);
                console.log('Máxima:'.yellow, clima.max.toString().cyan);
                console.log('El clima de hoy:'.yellow, clima.desc.toString().cyan);

                break;
            case 2:
                busquedas.historialCapilalizado.forEach((lugar, i) => {
                    const idx = `${i + 1}.`.green;
                    console.log(`${idx} ${lugar}`);
                });
                break;
            case 0:
                break;
        }

        if (opt !== 0) await pausa();
    } while (opt !== 0);
}

main();