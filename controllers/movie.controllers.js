const movies = require('../models/movie.models.js');

const findAllMovies = async (req, res) => {
    try {
        const { status } = req.query;

        let filter = {};
        if (status === 'PUBLISHED') {
            filter.published = true;
        } else if (status === 'RELEASED') {
            filter.released = true;
        }

        const mvs = await movies.find(filter).populate('artists');

        res.status(200).json({
            message: 'Movies fetched successfully',
            data: mvs,
        });
    } 
    catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({
            message: 'Failed to fetch movies',
            error: error.message,
        });
    }
};

const findOne = async (req, res) => {
    try {
        const { movieId } = req.params;
        const mv = await movies.findOne({ movieid: movieId });

        if (!mv) {
            return res.status(404).json({
                message: `Movie with ID ${movieId} not found`,
            });
        }

        res.status(200).json({
            message: 'Movie details fetched successfully',
            data: mv,
        });
    }
    catch (error) {
        console.error('Error fetching movie details:', error);
        res.status(500).json({
            message: 'Failed to fetch movie details',
            error: error.message,
        });
    }
};

const findShows = async (req, res) => {
    const movieId = req.params.movieId;
    try {
        const mv = await movies.findOne({ movieid: movieId });

        if (!mv) {
            return res.status(404).json({ message: 'Movie not found' });
        }

        if (!mv.shows || mv.shows.length === 0) {
            return res.status(404).json({ message: 'No shows found for this movie' });
        }
        res.status(200).json(mv.shows);
    }
    catch (error) {
        console.error('Error fetching shows:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getMovies = async (req, res) => {
    try {
        const { status, title, genres, artists, start_date, end_date } = req.query;
        let query = {};

        if (status) {
            if (status === 'RELEASED') {
                query.released = true;
            } else if (status === 'PUBLISHED') {
                query.published = true;
            }
        }

        if (title) {
            query.title = { $regex: title, $options: 'i' };
        }

        if (genres) {
            query.genres = { $in: genres.split(',') };
        }

        if (artists) {
            query.artists = { $in: artists.split(',').map(id => mongoose.Types.ObjectId(id)) };
        }

        if (start_date && end_date) {
            
            query.release_date = {
                $gte: new Date(start_date),  // greater than or equal to start_date
                $lte: new Date(end_date)     // less than or equal to end_date
            };
        }
        const mv = await movies.find(query);

        if (mv.length === 0) {
            return res.status(404).json({ message: 'No movies found matching the criteria' });
        }
        res.status(200).json(mv);
    } 
    catch (error) {
        console.error('Error fetching movies:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { findAllMovies, findOne, findShows, getMovies };