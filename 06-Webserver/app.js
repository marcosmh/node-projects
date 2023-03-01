require('dotenv').config();
const express = require('express')
const hbs = require('hbs');


const app = express()
const port = process.env.PORT;


// Handlebar
app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');

app.use(express.static('public'));

const data = {
    nombre: 'Marcos Magaña',
    titulo: 'Curso Node'
};


app.get('/', (req, res) => {
    res.render('home', data);
});


app.get('/generic', (req, res) => {
    //res.sendFile(__dirname + '/public/generic.html');
    res.render('generic', data);

});


app.get('/elements', (req, res) => {
    //res.sendFile(__dirname + '/public/elements.html');
    res.render('elements', data);
});



app.get('*', (req, res) => {
    res.sendFile(__dirname + '/public/404.html');
});


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});