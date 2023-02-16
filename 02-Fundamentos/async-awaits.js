const empleados = [{
        id: 1,
        nombre: 'Marcos'
    },
    {
        id: 2,
        nombre: 'Fermin'
    },
    {
        id: 3,
        nombre: 'Karen'
    }
];


const salarios = [{
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        nombre: 2000
    }
];



const getEmpleado = (id) => {
    return new Promise((resolve, reject) => {
        const empleado = empleados.find(e => e.id === id);
        (empleado) ?
        resolve(empleado): reject(`No existe el empleado con id ${id}`);
    });
}

const getSalario = (id) => {
    return new Promise((resolve, reject) => {
        const idemp = empleados.find(e => e.id === id);
        const salario = salarios.find(s => s.id === idemp.id);
        (salario) ?
        resolve(salario.salario): reject(`No existe salario para el empleado con id ${id}`);
    });
}

const id = 3;
/*
const getInfoUsuario = async() => {
    return "hola mundo";
}

getInfoUsuario()
    .then(msg => console.log(msg));
*/

const getInfoUsuario = async(id) => {
    try {
        const empleado = await getEmpleado(id);
        const salario = await getSalario(id);
        return `El empleado: ${empleado.nombre} tiene un salario de $${salario}`;
    } catch (error) {
        return error;
    }

}


getInfoUsuario(id)
    .then(msg => console.log(msg))
    .catch(err => console.log(err));