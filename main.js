require('./db/db');

const express = require('express');
const server = express();
const PORT = 3000;
const moviesRouter = require('./router/movies.router');
const cinemasRouter = require('./router/cinemas.router');

//Middlewares para entender los json bodies
server.use(express.json());
server.use(express.urlencoded({ extended: false }));
//Middleware de enrutado para /movies
server.use('/movies', moviesRouter);
//Middleware de enrutado para /cinemas
server.use('/cinemas', cinemasRouter);
//Middleware de enrutado para rutas no existentes
server.use('*', (req, res, next) => {
    const error = new Error('Ruta no encontrada');
    error.status = 404;
    next(error);
});
//Middleware/Manejador de errores
server.use((err, req, res, next) => {
    return res.status( err.status || 500).json( err.message || 'Ha ocurrido un error en el servidor');
});

server.listen(PORT, () => {
    console.log(`Servidor arrancado en puerto ${PORT}`);
});




