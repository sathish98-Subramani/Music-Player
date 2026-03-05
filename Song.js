const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: String,
    audioUrl: { type: String, required: true }, // URL from Cloudinary
    coverUrl: { type: String, required: true },
    duration: String,
    category: String, // e.g., Pop, Rock, Relax
    plays: { type: Number, default: 0 }
});

module.exports = mongoose.model('Song', songSchema);