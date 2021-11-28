const express = require("express");
const router = express.Router();
const Movie = require("../models/Movie");

// GET todas las películas
router.get("/", (req, res, next) => {
  Movie.find()
    .then((movies) => res.json(movies))
    .catch((error) => {
      console.error("Error en GET /");
      return next(new Error());
    });
});

//GET película por id
router.get("/:id", (req, res, next) => {
  const movieId = req.params.id;
  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        const error = new Error("Película no encontrada");
        error.status = 404;
        return next(error);
      }
      return res.json(movie);
    })
    .catch((error) => {
      console.error("Error en GET/id");
      return next(new Error());
    });
});

//GET película por título
router.get("/title/:title", (req, res, next) => {
  const movieTitle = req.params.title;
  return Movie.find({ title: movieTitle })
    .then((movie) => res.json(movie))
    .catch((error) => {
      console.error("Error en GET /title");
      return next(new Error());
    });
});

// GET películas por género
router.get("/genre/:genre", (req, res, next) => {
  const movieGenre = req.params.genre;
  return Movie.find({ genre: movieGenre })
    .then((movies) => res.json(movies))
    .catch((error) => {
      console.error("Error en GET /:id");
      return next(new Error());
    });
});

//GET películas de años posteriores al indicado
router.get("/newerthan/:year", (req, res, next) => {
  const movieYear = req.params.year;
  return Movie.find({ year: { $gt: movieYear } })
    .then((movies) => res.json(movies))
    .catch((error) => {
      console.error("Error en GET /:id");
      return next(new Error());
    });
});

//POST crear nueva película
router.post("/", (req, res, next) => {
  const nuevaMovie = new Movie({
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    genre: req.body.genre,
  });
  nuevaMovie.save()
    .then(() => {
      return res.status(201).json(nuevaMovie);
    })
    .catch((error) => {
      console.error("Error al añadir la nueva película");
      return next(error);
    });
});

//PUT modificar película
router.put("/:id", (req, res, next) => {
  const movieId = req.params.id;
  const nuevaMovie = new Movie(req.body);
  nuevaMovie._id = movieId;
  Movie.findByIdAndUpdate(movieId, nuevaMovie, {new: true})
    .then((updatedMovie) => {
      return res.status(200).json(updatedMovie);
    })
    .catch((error) => {
      console.error("Error al actualizar la película");
      return next(error);
    });
});

//DELETE eliminar película
router.delete("/:id", (req, res, next) => {
  const movieId = req.params.id;
  Movie.findByIdAndDelete(movieId)
  .then( () => {
    return res.status(200).json(`Usuario con id ${movieId} eliminado`);
  })
  .catch( error => {
    return next(error);
  })
})







module.exports = router;
