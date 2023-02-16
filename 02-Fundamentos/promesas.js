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



id = 3;

/*
getEmpleado(id)
    .then(empleado => console.log(empleado.nombre))
    .catch(err => console.log(err));

getSalario(id)
    .then(salario => console.log(salario))
    .catch(err => console.log(err));
*/

getEmpleado(id)
    .then(empleado => {
        getSalario(id)
            .then(salario => {
                console.log('El empleado:', empleado.nombre, 'tiene un salario de $', salario);
            })
            .catch(err => console.log(err));
    }).catch(err => console.log(err));