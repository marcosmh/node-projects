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

const id = 1;

const getEmpleado = (id, callback) => {
    const empleado = empleados.find(e => e.id === id);
    if (empleado) {
        return callback(null, empleado);
    } else {
        return callback(`El empleado con id= ${id} no existe.`);
    }
}
const getSalario = (id, callback) => {
    const idemp = empleados.find(e => e.id === id);
    const salario = salarios.find(s => s.id === idemp.id);
    //console.log(idemp.id + ' ' + idemp.nombre + ' ' + salario.salario);
    if (salario) {
        return callback(null, salario.salario);
    } else {
        return callback(`El salario del empleado con id= ${id} no existe.`);
    }

}


getEmpleado(id, (err, empleado) => {
    if (err) {
        console.log('Error!')
        return console.log(err);
    }
    //console.log('Empleado Existe!')
    // console.log(empleado);

    getSalario(id, (err, salario) => {
        if (err) {
            console.log('Error!');
            return console.log(err);
        }
        //console.log("Salario Existe!")
        //console.log(salario);
        console.log('El empleado:', empleado.nombre, 'tiene un salario de: $', salario);

    });




});