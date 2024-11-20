const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieid: { type: Number, required: [true, 'Movie id is required'], unique: true },
    title: { type: String, required: [true, 'Title is required'] },
    published: { type: Boolean, default: false },
    released: { type: Boolean, default: false },
    poster_url: { type: String },
    release_date: { type: Date },
    publish_date: { type: Date },
    artists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'artists', required: true }],
    genres: [{ type: String }],
    duration: { type: Number },
    critic_rating: { type: Number, min: 0, max: 5 },
    trailer_url: { type: String },
    wiki_url: { type: String },
    story_line: { type: String },
    shows: [
        {
            id: { type: Number },
            theatre: {
                name: { type: String, required: true },
                city: { type: String, required: true },
            },
            language: { type: String },
            show_timing: { type: Date },
            available_seats: { type: Number },
            unit_price: { type: Number },
        },
    ],
});

module.exports = mongoose.model('movies', movieSchema);
