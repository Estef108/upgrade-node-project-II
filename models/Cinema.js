const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cinemaSchema = (
    {
        name: { type: String, required: true },
        location: { type: String, required: true },
        //Definimos la propiedad movies como un array de ids de Movie
        //creando un enlace entre ambas colecciones
        movies: [{ type: mongoose.Types.ObjectId, ref: 'Movie' }]
    }
)

const Cinema = mongoose.model('Cinema', cinemaSchema);

module.exports = Cinema;