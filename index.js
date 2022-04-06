const express = require('express');
const server = express();
server.use(express.json());

// Query params = ?nome=NodeJS
// Route params = /cursos/2
// Request body = { nome: 'NODEJS', tipo: 'Backend' }

const cursos = ['Node JS', 'JavaScript', 'React Native'];


server.get('/cursos', (req, res) => {
    return res.json(cursos);
});

// localhost:3000/curso
server.get('/cursos/:index', (req, res) => {
    // const nome = req.query.nome;
    const { index } = req.params;
    
    // return res.send('Hello, world!');
    return res.json(cursos[index]);

});

server.post('/cursos', (req, res) => {
    const { name } = req.body;
    cursos.push(name);

    return res.json(cursos);
});

server.put('/cursos/:index', (req, res) => {
    const { index } = req.params;
    const { name } = req.body;
    cursos[index] = name;

    return res.json(cursos);
});

server.delete('/cursos/:index', (req, res) => {
    const { index } = req.params;
    cursos.splice(index, 1);

    return res.json(cursos);
});


server.listen(3000);







