const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    genreid: { type: Number, required: [true, 'Genre id is required'], unique: true },
    genre: { type: String, required: [true, 'Genre is required'] },
    
});

module.exports = mongoose.model('genres', genreSchema);