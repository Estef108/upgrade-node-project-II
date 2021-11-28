const mongoose = require("mongoose");
const Cinema = require("../models/Cinema");
const dbConnection = require("../db/db");

const cinemas = [
  {
    name: "Yelmo",
    location: "Leganés",
  },
  {
    name: "Callao",
    location: "Madrid",
  },
  {
    name: "Cinesa",
    location: "Getafe",
  },
  {
    name: "Ideal",
    location: "Madrid",
  },
];

const documentsCinemas = cinemas.map((cinema) => new Cinema(cinema));

dbConnection
  .then(async () => {
    const allCinemas = await Cinema.find();
    if (allCinemas.length > 0) {
      await Cinema.collection.drop();
    }
  })
  .catch((err) => console.error(`Error: ${err}`))
  .then(async () => {
    await Cinema.insertMany(documentsCinemas);
  })
  .catch((err) => console.error(`Error al insertar cines: ${err}`))
  .finally(() => mongoose.disconnect());
