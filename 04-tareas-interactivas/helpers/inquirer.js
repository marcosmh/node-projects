const inquirer = require('inquirer');
require('colors')

const preguntas = [{
    type: 'list',
    message: 'Seleccione una opción.',
    name: 'opcion',
    choices: [{
            value: '1',
            name: `${'1.'.yellow} Crear tarea`
        },
        {
            value: '2',
            name: `${'2.'.yellow} Listar tareas`
        },
        {
            value: '3',
            name: `${'3.'.yellow} Listar tareas completadas`
        },
        {
            value: '4',
            name: `${'4.'.yellow} Listar tareas pendientes`
        },
        {
            value: '5',
            name: `${'5.'.yellow} Completar tarea(s)`
        },
        {
            value: '6',
            name: `${'6.'.yellow} Borrar tarea`
        },
        {
            value: '0',
            name: `${'0.'.yellow} Salir`
        },
    ]
}];

const inquirerMenu = async() => {
    console.clear();
    console.log('=========================='.green);
    console.log('  Seleccione una opción '.green);
    console.log('==========================\n'.green);
    const { opcion } = await inquirer.prompt(preguntas);
    return opcion;
}

const pausa = async() => {
    console.log('\n');
    const question = [{
        type: 'input',
        name: 'enter',
        message: `\
                        nPresione $ { 'ENTER'.green }
                        para continuar.\n `

    }];

    await inquirer.prompt(question);
}


const leerInput = async(message) => {
    const question = [{
        type: 'input',
        name: 'desc',
        message,
        validate(value) {
            if (value.length === 0) {
                return 'Por favor escribe una opción';
            }
            return true;
        }
    }];
    const { desc } = await inquirer.prompt(question);
    return desc;

}

const listadoTareasBorrar = async(tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: ` ${idx} ${tarea.desc}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const preguntas = [{
        type: 'list',
        name: 'id',
        message: 'Borrar',
        choices
    }]
    const { id } = await inquirer.prompt(preguntas);
    return id;

}

const confirmar = async(message) => {
    const question = [{
        type: 'confirm',
        name: 'ok',
        message
    }];
    const { ok } = await inquirer.prompt(question);
    return ok;
}

const mostrarListadoCheckList = async(tareas = []) => {
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}.`.green;
        return {
            value: tarea.id,
            name: ` ${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [{
        type: 'checkbox',
        name: 'ids',
        message: 'Selecciones',
        choices
    }]
    const { ids } = await inquirer.prompt(pregunta);
    return ids;

}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listadoTareasBorrar,
    confirmar,
    mostrarListadoCheckList
}