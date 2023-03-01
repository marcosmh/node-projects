const http = require('http');

http.createServer((req, res) => {

        // console.log(res);
        // res.write('Hola Mundo');

        //res.writeHead(200, { 'Content-Type': 'application/json' });
        //res.setHeader('Content-Disposition', 'attachment; filename=lista.csv');
        //res.writeHead(200, { 'Content-Type': 'application/csv' });

        //res.write('id, nombre \n');
        //res.write('1, Marcos \n');
        //res.write('2, Fernando \n');
        //res.write('3, Hector \n');


        res.write('Hola Mundo');
        res.end();

    })
    .listen(8181);

console.log('Escuchando en el puerto 8181');