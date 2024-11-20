const genres = require('../models/genre.models.js');

const findAllGenres = async (req, res) => {
    try {
        const gnrs = await genres.find();
        res.status(200).json({
            message: 'Genre details fetched successfully',
            data: gnrs,
        });
    }
    catch (error) {
        console.error('Error fetching genre details:', error);
        res.status(500).json({
            message: 'Failed to fetch Genre details',
            error: error.message,
        });
    }
}

module.exports = {findAllGenres};