const express = require('express');
const server = express();
server.use(express.json());

// Query params = ?nome=NodeJS
// Route params = /cursos/2
// Request body = { nome: 'NODEJS', tipo: 'Backend' }

const cursos = ['Node JS', 'JavaScript', 'React Native'];

// Middleware Global
server.use((req,res, next) => {
    console.log(`URL CHAMADA: ${req.url}`);
    return next();
});

function checkIndexCurso(req, res, next) {
    const curso = cursos[req.params.index];
    if (!curso) {
        return res.status(400).json({ error: 'O curso não existe.' });
    }
    req.curso = curso;
    return next();
}

function checkCurso(req, res, next) {
    if (!req.body.name) {
        return res.status(400).json({ error: 'Nome do curso é obrigatório.' });
    }

    return next();
}

server.get('/cursos', (req, res) => {
    return res.json(cursos);
});

// localhost:3000/curso
server.get('/cursos/:index', checkIndexCurso, (req, res) => {
    // return res.send('Hello, world!');
    return res.json(req.curso);

});

server.post('/cursos', checkCurso, (req, res, next) => {
    const { name } = req.body;
    cursos.push(name);

    return res.json(cursos);
});

server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;
    cursos[index] = name;

    return res.json(cursos);
});

server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
    const { index } = req.params;
    cursos.splice(index, 1);

    return res.json(cursos);
});


server.listen(3000);







