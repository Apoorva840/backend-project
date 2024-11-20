const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    artistid: { type: Number, required: [true, 'artist id is required'], unique: true },
    first_name: { type: String, required: [true, 'First name is required'] },
    last_name: { type: String, required: [true, 'Last name is required'] },
    wiki_url: { type: String, required: [true, 'First name is required'] },
    profile_url: { type: String, required: [true, 'First name is required'] },
    movies: { type: [String], default: [] },
});

module.exports = mongoose.model('artists', artistSchema);