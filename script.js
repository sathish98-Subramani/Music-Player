// Variables for the player
let currentAudio = new Audio();
const playBtn = document.getElementById('masterPlay');
const progressBar = document.getElementById('progressBar');
const songList = document.getElementById('song-list');

// 1. Function to Fetch Songs from Backend
async function loadSongs() {
    try {
        const response = await fetch('http://localhost:5000/api/songs');
        const songs = await response.json();
        
        // Clear the placeholder card and add real songs
        songList.innerHTML = ''; 
        
        songs.forEach(song => {
            const card = document.createElement('div');
            card.className = 'song-card glass';
            card.innerHTML = `
                <img src="${song.coverUrl}" alt="Cover">
                <h4>${song.title}</h4>
                <p>${song.artist}</p>
            `;
            // Make the card clickable
            card.onclick = () => playSong(song.audioUrl, song.title, song.artist, song.coverUrl);
            songList.appendChild(card);
        });
    } catch (err) {
        console.error("Could not load songs. Is your backend running?", err);
    }
}

// 2. Play Song Function
function playSong(url, title, artist, cover) {
    currentAudio.src = url;
    currentAudio.play();
    
    // Update UI
    document.getElementById('track-name').innerText = title;
    document.getElementById('track-artist').innerText = artist;
    document.getElementById('track-art').src = cover;
    
    playBtn.classList.replace('fa-play-circle', 'fa-pause-circle');
}

// 3. Play/Pause Toggle
playBtn.addEventListener('click', () => {
    if (currentAudio.paused || currentAudio.currentTime <= 0) {
        currentAudio.play();
        playBtn.classList.replace('fa-play-circle', 'fa-pause-circle');
    } else {
        currentAudio.pause();
        playBtn.classList.replace('fa-pause-circle', 'fa-play-circle');
    }
});

// 4. Update Progress Bar as song plays
currentAudio.addEventListener('timeupdate', () => {
    const progress = parseInt((currentAudio.currentTime / currentAudio.duration) * 100);
    progressBar.value = progress || 0;
});

// 5. Seek song when progress bar is moved
progressBar.addEventListener('change', () => {
    currentAudio.currentTime = (progressBar.value * currentAudio.duration) / 100;
});

// Run this when the page loads
loadSongs();