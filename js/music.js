// 1. Seed Songs Data (Shared for reference across pages)
const songsData = [
    {
        id: 1,
        name: "Escape Your Love",
        artist: "Fassounds",
        cover: "images/covers/retro_drive.jpg",
        audio: "audio/fassounds-escape-your-love-upbeat-fashion-pop-dance-412230.mp3",
        genre: "Pop",
        artistPhone: "7000000000",
        artistId: 1,
        bio: "Fassounds - upbeat pop production in the library."
    },
    {
        id: 2,
        name: "Acoustic Spring",
        artist: "Ikoliks AJ",
        cover: "images/covers/acoustic_whispers.jpg",
        audio: "audio/ikoliks_aj-acoustic-spring-mothers-day-music-320427.mp3",
        genre: "Acoustic",
        artistPhone: "7000000001",
        artistId: 2,
        bio: "Ikoliks AJ - gentle acoustic track in the library."
    },
    {
        id: 3,
        name: "Water",
        artist: "Kontraa",
        cover: "images/covers/nebula_dream.jpg",
        audio: "audio/kontraa-water-afro-pop-music-445661.mp3",
        genre: "Afro-Pop",
        artistPhone: "7000000002",
        artistId: 3,
        bio: "Kontraa - Afro-pop single in the library."
    }
];

// Save songs data to localStorage so other pages can read it
const songscapeDataVersion = 10;
const storedSongsVersion = parseInt(localStorage.getItem('songscape_songs_version'), 10);
if (storedSongsVersion !== songscapeDataVersion) {
    localStorage.setItem('songscape_songs', JSON.stringify(songsData));
    localStorage.setItem('songscape_songs_version', String(songscapeDataVersion));
}

document.addEventListener('DOMContentLoaded', () => {
    // 2. Global State variables
    let favorites = JSON.parse(localStorage.getItem('songscape_favorites')) || [];
    let currentSong = null;
    let activePlaylist = [...songsData];
    let isMuted = false;
    let prevVolume = 0.7;

    // 3. DOM Elements
    const songsGrid = document.getElementById('songs-grid');
    const searchInput = document.getElementById('search-input');
    const artistFilter = document.getElementById('artist-filter');
    const tabAll = document.getElementById('tab-all');
    const tabFavorites = document.getElementById('tab-favorites');

    // Audio Element
    const audio = document.getElementById('main-audio-element');

    // Player Elements
    const player = document.getElementById('floating-player');
    const playerImg = document.getElementById('player-img');
    const playerTitle = document.getElementById('player-title');
    const playerArtist = document.getElementById('player-artist');
    const playerPlayBtn = document.getElementById('player-play-btn');
    const playerPrevBtn = document.getElementById('player-prev-btn');
    const playerNextBtn = document.getElementById('player-next-btn');
    const playerTimeCurrent = document.getElementById('player-time-current');
    const playerTimeDuration = document.getElementById('player-time-duration');
    const playerProgress = document.getElementById('player-progress');
    const playerProgressFill = document.getElementById('player-slider-fill');
    const playerVolumeBtn = document.getElementById('player-volume-btn');
    const playerVolumeSlider = document.getElementById('player-volume-slider');
    const playerVolumeFill = document.getElementById('player-volume-fill');

    // Set Default Volume
    audio.volume = prevVolume;

    // 4. Initialize Functionality
    function init() {
        populateArtistDropdown();
        renderSongsGrid();
        setupEventListeners();
        checkUrlParams();
    }

    // Populate Artists Dropdown
    function populateArtistDropdown() {
        const artists = [...new Set(songsData.map(song => song.artist))];
        artists.forEach(artist => {
            const option = document.createElement('option');
            option.value = artist;
            option.textContent = artist;
            artistFilter.appendChild(option);
        });
    }

    // Render Song Cards to Grid
    function renderSongsGrid() {
        if (!songsGrid) return;
        
        const query = searchInput.value.toLowerCase().trim();
        const selectedArtist = artistFilter.value;
        const showFavoritesOnly = tabFavorites.classList.contains('active');

        // Filter Songs
        activePlaylist = songsData.filter(song => {
            const matchesSearch = song.name.toLowerCase().includes(query) || 
                                  song.artist.toLowerCase().includes(query);
            const matchesArtist = selectedArtist === "" || song.artist === selectedArtist;
            const matchesFavorites = !showFavoritesOnly || favorites.includes(song.id);
            
            return matchesSearch && matchesArtist && matchesFavorites;
        });

        // Clear Grid
        songsGrid.innerHTML = '';

        if (activePlaylist.length === 0) {
            songsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">
                    <i class="fas fa-music" style="font-size: 2.5rem; margin-bottom: 15px; color: var(--border-color);"></i>
                    <p>No songs found matching your search criteria.</p>
                </div>
            `;
            return;
        }

        // Render each song card
        activePlaylist.forEach(song => {
            const isCurrentPlaying = currentSong && currentSong.id === song.id && !audio.paused;
            const isFav = favorites.includes(song.id);

            const card = document.createElement('div');
            card.className = `song-card glass-card ${isCurrentPlaying ? 'playing' : ''}`;
            card.dataset.id = song.id;

            card.innerHTML = `
                <div class="song-img-container">
                    <img src="${song.cover}" alt="${song.name}" onerror="this.src='https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80'">
                    <div class="song-overlay">
                        <!-- Play/Pause Button inside Card -->
                        <button class="card-action-btn favorite-btn ${isFav ? 'active' : ''}" aria-label="Favorite song">
                            <i class="fas fa-heart"></i>
                        </button>
                        <button class="card-play-btn" aria-label="Play song">
                            <i class="fas ${isCurrentPlaying ? 'fa-pause' : 'fa-play'}"></i>
                        </button>
                        <button class="card-action-btn details-btn" aria-label="Artist details">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
                <div class="song-details">
                    <div class="song-title-row">
                        <h3 class="song-title">${song.name}</h3>
                        <div class="playing-wave-container">
                            <div class="wave-bar"></div>
                            <div class="wave-bar"></div>
                            <div class="wave-bar"></div>
                            <div class="wave-bar"></div>
                        </div>
                    </div>
                    <div class="song-artist">${song.artist}</div>
                    
                    <div class="song-meta">
                        <div class="song-meta-item">
                            <i class="fas fa-phone-alt"></i>
                            <a href="tel:${song.artistPhone}">+91 ${song.artistPhone}</a>
                        </div>
                        <div class="song-meta-item">
                            <i class="fas fa-compact-disc"></i>
                            <span>Genre: ${song.genre}</span>
                        </div>
                    </div>
                </div>
            `;

            // Card Event Bindings
            const playBtn = card.querySelector('.card-play-btn');
            const favBtn = card.querySelector('.favorite-btn');
            const detailsBtn = card.querySelector('.details-btn');

            playBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                playSong(song);
            });

            favBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                toggleFavorite(song.id, favBtn);
            });

            detailsBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                viewArtistDetails(song.artistId);
            });

            songsGrid.appendChild(card);
        });
    }

    // Play/Pause Song logic
    function playSong(song) {
        // If same song is clicked
        if (currentSong && currentSong.id === song.id) {
            if (audio.paused) {
                audio.play();
                window.showToast(`Playing ${song.name}`, 'success');
            } else {
                audio.pause();
                window.showToast(`Paused ${song.name}`, 'info');
            }
            updatePlayerPlayIcon();
            updateCardPlayingStates();
            return;
        }

        // Play new song
        currentSong = song;
        audio.src = song.audio;
        audio.load();
        
        // Show player
        player.classList.add('active');

        // Update player info
        playerImg.src = song.cover;
        playerTitle.textContent = song.name;
        playerArtist.textContent = song.artist;

        // Reset progress slider visual
        playerProgress.value = 0;
        playerProgressFill.style.width = '0%';
        playerTimeCurrent.textContent = "0:00";
        playerTimeDuration.textContent = "0:00";

        // Play the track
        audio.play().then(() => {
            window.showToast(`Playing ${song.name} by ${song.artist}`, 'success');
        }).catch(err => {
            console.error("Audio playback error:", err);
            window.showToast("Failed to load audio track", "error");
        });

        updatePlayerPlayIcon();
        updateCardPlayingStates();
    }

    // Toggle Play/Pause on persistent player controls
    function togglePlayPause() {
        if (!currentSong) {
            // If no song is loaded, play the first song in active list
            if (activePlaylist.length > 0) {
                playSong(activePlaylist[0]);
            }
            return;
        }

        if (audio.paused) {
            audio.play();
            window.showToast(`Playing ${currentSong.name}`, 'success');
        } else {
            audio.pause();
            window.showToast(`Paused ${currentSong.name}`, 'info');
        }
        updatePlayerPlayIcon();
        updateCardPlayingStates();
    }

    // Toggle Favorite Playlist item
    function toggleFavorite(songId, favBtnElement = null) {
        const index = favorites.indexOf(songId);
        let song = songsData.find(s => s.id === songId);

        if (index === -1) {
            favorites.push(songId);
            window.showToast(`Added "${song.name}" to favorites`, 'success');
            if (favBtnElement) favBtnElement.classList.add('active');
        } else {
            favorites.splice(index, 1);
            window.showToast(`Removed "${song.name}" from favorites`, 'info');
            if (favBtnElement) favBtnElement.classList.remove('active');
        }

        localStorage.setItem('songscape_favorites', JSON.stringify(favorites));

        // If currently viewing favorites tab, re-render is required to filter out removed item
        if (tabFavorites.classList.contains('active')) {
            renderSongsGrid();
        } else {
            // Update individual icon state
            const cards = document.querySelectorAll('.song-card');
            cards.forEach(card => {
                if (parseInt(card.dataset.id) === songId) {
                    const fav = card.querySelector('.favorite-btn');
                    if (fav) {
                        if (favorites.includes(songId)) {
                            fav.classList.add('active');
                        } else {
                            fav.classList.remove('active');
                        }
                    }
                }
            });
        }
    }

    // View Artist Details Page
    function viewArtistDetails(artistId) {
        localStorage.setItem('songscape_selected_artist', artistId);
        window.location.href = `artist.html?id=${artistId}`;
    }

    // Update the Play/Pause Icon in bottom Player controls
    function updatePlayerPlayIcon() {
        const icon = playerPlayBtn.querySelector('i');
        if (icon) {
            if (audio.paused) {
                icon.className = 'fas fa-play';
            } else {
                icon.className = 'fas fa-pause';
            }
        }
    }

    // Synchronize play icons on cards inside grid
    function updateCardPlayingStates() {
        const cards = document.querySelectorAll('.song-card');
        cards.forEach(card => {
            const cardId = parseInt(card.dataset.id);
            const playBtnIcon = card.querySelector('.card-play-btn i');
            
            if (currentSong && currentSong.id === cardId && !audio.paused) {
                card.classList.add('playing');
                if (playBtnIcon) playBtnIcon.className = 'fas fa-pause';
            } else {
                card.classList.remove('playing');
                if (playBtnIcon) playBtnIcon.className = 'fas fa-play';
            }
        });
    }

    // Next track trigger
    function nextTrack() {
        if (activePlaylist.length === 0) return;
        let index = activePlaylist.findIndex(song => song.id === (currentSong ? currentSong.id : -1));
        
        index++;
        if (index >= activePlaylist.length) {
            index = 0; // Wrap around to first track
        }
        playSong(activePlaylist[index]);
    }

    // Previous track trigger
    function prevTrack() {
        if (activePlaylist.length === 0) return;
        let index = activePlaylist.findIndex(song => song.id === (currentSong ? currentSong.id : -1));
        
        index--;
        if (index < 0) {
            index = activePlaylist.length - 1; // Wrap around to last track
        }
        playSong(activePlaylist[index]);
    }

    // Format seconds to clean minutes:seconds layout
    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Event listeners setup
    function setupEventListeners() {
        // Search filter trigger
        searchInput.addEventListener('input', () => {
            renderSongsGrid();
        });

        // Artist dropdown select trigger
        artistFilter.addEventListener('change', () => {
            renderSongsGrid();
        });

        // Playlist Tabs
        tabAll.addEventListener('click', () => {
            tabAll.classList.add('active');
            tabFavorites.classList.remove('active');
            renderSongsGrid();
        });

        tabFavorites.addEventListener('click', () => {
            tabFavorites.classList.add('active');
            tabAll.classList.remove('active');
            renderSongsGrid();
        });

        // Bottom Player controls click
        playerPlayBtn.addEventListener('click', togglePlayPause);
        playerNextBtn.addEventListener('click', nextTrack);
        playerPrevBtn.addEventListener('click', prevTrack);

        // Audio element metadata & updates
        audio.addEventListener('timeupdate', () => {
            if (audio.duration) {
                const percentage = (audio.currentTime / audio.duration) * 100;
                playerProgress.value = percentage;
                playerProgressFill.style.width = `${percentage}%`;
                playerTimeCurrent.textContent = formatTime(audio.currentTime);
            }
        });

        audio.addEventListener('loadedmetadata', () => {
            playerTimeDuration.textContent = formatTime(audio.duration);
        });

        audio.addEventListener('ended', () => {
            nextTrack(); // Auto-advance to next song
        });

        // Timeline Slider interactions
        playerProgress.addEventListener('input', () => {
            const newPercentage = playerProgress.value;
            playerProgressFill.style.width = `${newPercentage}%`;
        });

        playerProgress.addEventListener('change', () => {
            if (audio.duration) {
                const seekTo = (playerProgress.value / 100) * audio.duration;
                audio.currentTime = seekTo;
            }
        });

        // Volume control slider and toggle
        playerVolumeSlider.addEventListener('input', () => {
            const vol = playerVolumeSlider.value / 100;
            audio.volume = vol;
            playerVolumeFill.style.width = `${playerVolumeSlider.value}%`;
            isMuted = vol === 0;
            updateVolumeIcon(vol);
            if (vol > 0) prevVolume = vol;
        });

        playerVolumeBtn.addEventListener('click', () => {
            if (isMuted) {
                audio.volume = prevVolume;
                playerVolumeSlider.value = prevVolume * 100;
                playerVolumeFill.style.width = `${prevVolume * 100}%`;
                isMuted = false;
                updateVolumeIcon(prevVolume);
                window.showToast("Volume unmuted", "info");
            } else {
                prevVolume = audio.volume;
                audio.volume = 0;
                playerVolumeSlider.value = 0;
                playerVolumeFill.style.width = '0%';
                isMuted = true;
                updateVolumeIcon(0);
                window.showToast("Volume muted", "info");
            }
        });
    }

    function updateVolumeIcon(vol) {
        const icon = playerVolumeBtn.querySelector('i');
        if (!icon) return;

        if (vol === 0) {
            icon.className = 'fas fa-volume-mute';
        } else if (vol < 0.4) {
            icon.className = 'fas fa-volume-down';
        } else {
            icon.className = 'fas fa-volume-up';
        }
    }

    // Check query params to auto-play track (e.g. `music.html?play=1`)
    function checkUrlParams() {
        const params = new URLSearchParams(window.location.search);
        const playId = parseInt(params.get('play'));
        
        if (playId) {
            const targetSong = songsData.find(song => song.id === playId);
            if (targetSong) {
                // Short timeout to ensure page loads and browser parses media smoothly
                setTimeout(() => {
                    playSong(targetSong);
                }, 400);
            }
        }
    }

    // Run Initialization
    init();
});
