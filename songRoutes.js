// const express = require('express');
// const router = express.Router();
// const Song = require('../models/Song'); // This looks for your Song model

// // Route: Get all songs
// router.get('/', async (req, res) => {
//     try {
//         const songs = await Song.find();
//         res.json(songs);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// // Route: Get a single song by ID
// router.get('/:id', async (req, res) => {
//     try {
//         const song = await Song.findById(req.params.id);
//         if (!song) return res.status(404).json({ message: 'Song not found' });
//         res.json(song);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const Song = require('../models/Song');

// Setup Multer to use memory storage temporarily
const storage = multer.memoryStorage();
const upload = multer.fields([{ name: 'audio' }, { name: 'image' }]);

router.post('/upload', upload, async (req, res) => {
    try {
        // 1. Upload Audio to Cloudinary
        const audioRes = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: "video", folder: "songs" }, (err, result) => {
                if (err) reject(err); else resolve(result);
            }).end(req.files.audio[0].buffer);
        });

        // 2. Upload Image to Cloudinary
        const imageRes = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ folder: "covers" }, (err, result) => {
                if (err) reject(err); else resolve(result);
            }).end(req.files.image[0].buffer);
        });

        // 3. Save URLs to MongoDB
        const newSong = new Song({
            title: req.body.title,
            artist: req.body.artist,
            audioUrl: audioRes.secure_url,
            coverUrl: imageRes.secure_url
        });

        await newSong.save();
        res.status(200).json({ message: "Success!" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error during upload");
    }
});

// Keep your existing GET route below this
router.get('/', async (req, res) => {
    const songs = await Song.find();
    res.json(songs);
});

module.exports = router;