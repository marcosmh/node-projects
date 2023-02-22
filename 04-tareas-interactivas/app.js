require('colors');
const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');



console.clear();
const main = async() => {
    let opt = '';
    const tareas = new Tareas();
    const leerTareaDB = leerDB();

    if (leerTareaDB) {
        tareas.cargarTareasFromArray(leerTareaDB);
    }

    do {
        opt = await inquirerMenu();
        console.log({ opt });
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripción: ');
                tareas.crearTareas(desc);
                break;
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientesCompletadas(true);
                break;
            case '4':
                tareas.listarPendientesCompletadas(false);
                break;
            case '5':
                const ids = await mostrarListadoCheckList(tareas.listadoArr);
                console.log(ids);
                tareas.toggleCompletadas(ids);
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr);
                if (id !== '0') {
                    const ok = await confirmar('¿Esta seguro que desear borrar?');
                    if (ok) {
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada correctamente.')
                    }
                }
                break;
            case '0':
                break;


        }

        guardarDB(tareas.listadoArr);

        await pausa();
    } while (opt !== '0');
}


main();