const artists = require('../models/artist.models.js');

const findAllArtists = async (req, res) => {
    try {
        const ats = await artists.find();
        res.status(200).json({
            message: 'Artist details fetched successfully',
            data: ats,
        });
    }
    catch (error) {
        console.error('Error fetching Artist details:', error);
        res.status(500).json({
            message: 'Failed to fetch Artist details',
            error: error.message,
        });
    }
}

module.exports = {findAllArtists};