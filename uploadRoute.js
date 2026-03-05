const express = require('express');
const router = express.Router();
const Song = require('./models/Song');

// Simple logic: Send song data from Frontend to Database
router.post('/upload', async (req, res) => {
    try {
        const newSong = new Song(req.body);
        await newSong.save();
        res.status(201).json({ message: "Song added successfully!" });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;