const colors = require('colors');
const argv = require('yargs')
    .options('b', {
        alias: 'base',
        type: 'number',
        demandOption: true,
        describe: 'Base para multiplicar'.blue
    })
    .check((argv, options) => {
        if (isNaN(argv.b)) {
            throw 'La base tiene que ser un número.'.red
        }
        return true;
    })
    .options('l', {
        alias: 'listar',
        type: 'boolean',
        demandOption: true,
        default: false,
        describe: 'Listar la multipicación'.blue
    })
    .options('h', {
        alias: 'hasta',
        type: 'number',
        demandOption: false,
        default: 10,
        describe: 'Número a multiplicar'.blue
    })
    .argv;

module.exports = argv;