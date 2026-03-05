let currentAudio = new Audio();
let isPlaying = false;

function playSong(url, title, artist, cover) {
    currentAudio.src = url;
    currentAudio.play();
    isPlaying = true;
    
    document.getElementById('current-title').innerText = title;
    document.getElementById('current-artist').innerText = artist;
    document.getElementById('current-cover').src = cover;
    document.getElementById('masterPlay').classList.replace('fa-play-circle', 'fa-pause-circle');
}

// Update Progress Bar
currentAudio.addEventListener('timeupdate', () => {
    const progress = (currentAudio.currentTime / currentAudio.duration) * 100;
    document.getElementById('progressBar').value = progress || 0;
});

// Seek Logic
document.getElementById('progressBar').addEventListener('change', (e) => {
    currentAudio.currentTime = (e.target.value * currentAudio.duration) / 100;
});