const mongoose = require("mongoose");
const Movie = require("../models/Movie");
const dbConnection = require("../db/db");

const movies = [
  {
    title: "The Matrix",
    director: "Hermanas Wachowski",
    year: 1999,
    genre: "Acción",
  },
  {
    title: "The Matrix Reloaded",
    director: "Hermanas Wachowski",
    year: 2003,
    genre: "Acción",
  },
  {
    title: "Buscando a Nemo",
    director: "Andrew Stanton",
    year: 2003,
    genre: "Animación",
  },
  {
    title: "Buscando a Dory",
    director: "Andrew Stanton",
    year: 2016,
    genre: "Animación",
  },
  {
    title: "Interestelar",
    director: "Christopher Nolan",
    year: 2014,
    genre: "Ciencia ficción",
  },
  {
    title: "50 primeras citas",
    director: "Peter Segal",
    year: 2004,
    genre: "Comedia romántica",
  },
];


const documentsMovies = movies.map((movie) => new Movie(movie));

dbConnection
.then( async() => {
  const allMovies = await Movie.find()  
  if(allMovies.length > 0){
    await Movie.collection.drop();
  }
})
.catch( err => console.error(`Error: ${err}`))
.then( async() => {
  await Movie.insertMany(documentsMovies);
})
.catch( err => console.error(`Error al insertar películas: ${err}`))
.finally( () => mongoose.disconnect());