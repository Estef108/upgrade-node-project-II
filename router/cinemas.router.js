const express = require("express");
const router = express.Router();
const Cinema = require("../models/Cinema");

//GET todos los cines
router.get("/", (req, res, next) => {
  Cinema.find().populate('movies')
    .then((cinemas) => {
      return res.json(cinemas);
    })
    .catch((error) => {
      next(error);
    });
});

//POST añadir nuevo cine
router.post("/", (req, res, next) => {
  const nuevoCine = new Cinema({
    name: req.body.name,
    location: req.body.location,
  });
  nuevoCine
    .save()
    .then(() => {
      return res.status(201).json(nuevoCine);
    })
    .catch((error) => {
      console.error("Error al añadir el nuevo cine");
      return next(error);
    });
});

//PUT modificar datos cine
router.put("/:id", (req, res, next) => {
  const cinemaId = req.params.id;
  const nuevoCine = new Cinema(req.body);
  nuevoCine._id = cinemaId;
  Cinema.findByIdAndUpdate(cinemaId, nuevoCine, { new: true }) //Ponemos {new:true} para que al devolver el .json nos lo dé ya actualizado
    .then((updatedCinema) => {
      return res.status(200).json(updatedCinema);
    })
    .catch((error) => {
      return next(error);
    });
});

//DELETE eliminar cine
router.delete("/:id", (req, res, next) => {
  const cinemaId = req.params.id;
  Cinema.findByIdAndDelete(cinemaId)
    .then(() => {
      return res.status(200).json(`Usuario con id ${cinemaId} eliminado`);
    })
    .catch((error) => {
      return next(error);
    });
});

//PUT añadir película a cine
router.put("/:id/movies", (req, res, next) => {
    const cinemaId = req.params.id;
    const movieId = req.body.movieToAdd;
    Cinema.findByIdAndUpdate(
        cinemaId, 
        { $push: { movies: movieId } },
        { new: true}
        )
        .then( updatedCinema => {
            res.status(200).json(updatedCinema);
        })
        .catch(error => {
            next(error);
        })
})






module.exports = router;
