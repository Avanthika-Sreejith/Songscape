// Default Fallback Seed Data
const defaultSongs = [
    {
        id: 1,
        name: "Midnight Glow",
        artist: "Luna Eclipse",
        cover: "images/covers/midnight_glow.jpg",
        audio: "audio/tracks/midnight_glow.mp3",
        genre: "Ambient",
        artistPhone: "9876543210",
        artistId: 1,
        bio: "Luna Eclipse is an ambient electronic music producer based in Seattle. Known for creating lush soundscapes and deep dreamlike atmospheres, her work blends organic textures with vintage synthesizers."
    },
    {
        id: 2,
        name: "Ocean Breeze",
        artist: "Kai Ryo",
        cover: "images/covers/ocean_breeze.jpg",
        audio: "audio/tracks/ocean_breeze.mp3",
        genre: "Acoustic",
        artistPhone: "8765432109",
        artistId: 2,
        bio: "Kai Ryo is an acoustic folk singer-songwriter. Inspired by the waves and coastal winds, his music is characterized by warm acoustic guitars, intimate vocals, and rich storytelling."
    },
    {
        id: 3,
        name: "Neon Horizon",
        artist: "Cyber Punk",
        cover: "images/covers/neon_horizon.jpg",
        audio: "audio/tracks/neon_horizon.mp3",
        genre: "Synthwave",
        artistPhone: "7654321098",
        artistId: 3,
        bio: "Cyber Punk is an electronic project dedicated to high-energy 80s synthwave. Mixing heavy basslines, retro synths, and neon cyberpunk aesthetics, his tracks feel like a drive through a future metropolis."
    },
    {
        id: 4,
        name: "Starlit Nights",
        artist: "Luna Eclipse",
        cover: "images/covers/starlit_nights.jpg",
        audio: "audio/tracks/starlit_nights.mp3",
        genre: "Ambient",
        artistPhone: "9876543210",
        artistId: 1,
        bio: "Luna Eclipse is an ambient electronic music producer based in Seattle. Known for creating lush soundscapes and deep dreamlike atmospheres, her work blends organic textures with vintage synthesizers."
    },
    {
        id: 5,
        name: "Nebula Dream",
        artist: "Luna Eclipse",
        cover: "images/covers/nebula_dream.jpg",
        audio: "audio/tracks/nebula_dream.mp3",
        genre: "Ambient",
        artistPhone: "9876543210",
        artistId: 1,
        bio: "Luna Eclipse is an ambient electronic music producer based in Seattle. Known for creating lush soundscapes and deep dreamlike atmospheres, her work blends organic textures with vintage synthesizers."
    },
    {
        id: 6,
        name: "Sunset Song",
        artist: "Kai Ryo",
        cover: "images/covers/sunset_song.jpg",
        audio: "audio/tracks/sunset_song.mp3",
        genre: "Acoustic",
        artistPhone: "8765432109",
        artistId: 2,
        bio: "Kai Ryo is an acoustic folk singer-songwriter. Inspired by the waves and coastal winds, his music is characterized by warm acoustic guitars, intimate vocals, and rich storytelling."
    },
    {
        id: 7,
        name: "Acoustic Whispers",
        artist: "Kai Ryo",
        cover: "images/covers/acoustic_whispers.jpg",
        audio: "audio/tracks/acoustic_whispers.mp3",
        genre: "Acoustic",
        artistPhone: "8765432109",
        artistId: 2,
        bio: "Kai Ryo is an acoustic folk singer-songwriter. Inspired by the waves and coastal winds, his music is characterized by warm acoustic guitars, intimate vocals, and rich storytelling."
    },
    {
        id: 8,
        name: "Retro Drive",
        artist: "Cyber Punk",
        cover: "images/covers/retro_drive.jpg",
        audio: "audio/tracks/retro_drive.mp3",
        genre: "Synthwave",
        artistPhone: "7654321098",
        artistId: 3,
        bio: "Cyber Punk is an electronic project dedicated to high-energy 80s synthwave. Mixing heavy basslines, retro synths, and neon cyberpunk aesthetics, his tracks feel like a drive through a future metropolis."
    },
    {
        id: 9,
        name: "Laser Run",
        artist: "Cyber Punk",
        cover: "images/covers/laser_run.jpg",
        audio: "audio/tracks/laser_run.mp3",
        genre: "Synthwave",
        artistPhone: "7654321098",
        artistId: 3,
        bio: "Cyber Punk is an electronic project dedicated to high-energy 80s synthwave. Mixing heavy basslines, retro synths, and neon cyberpunk aesthetics, his tracks feel like a drive through a future metropolis."
    }
];

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Songs Data
    const songs = JSON.parse(localStorage.getItem('songscape_songs')) || defaultSongs;

    // 2. Parse Query Params
    const urlParams = new URLSearchParams(window.location.search);
    let artistId = parseInt(urlParams.get('id'));

    // Fallback: Check localStorage selection or default to 1
    if (isNaN(artistId)) {
        artistId = parseInt(localStorage.getItem('songscape_selected_artist')) || 1;
    }

    // 3. Find Artist details
    const activeSong = songs.find(s => s.artistId === artistId) || songs[0];
    const artistName = activeSong.artist;
    const artistBio = activeSong.bio;
    const artistPhone = activeSong.artistPhone;
    const artistGenre = activeSong.genre;
    
    // Set Page Title
    document.title = `Songscape - Artist Profile: ${artistName}`;

    // Define Artist Avatar image paths mapping
    let avatarPath = "images/artists/luna_eclipse.jpg";
    if (artistId === 2) avatarPath = "images/artists/kai_ryo.jpg";
    if (artistId === 3) avatarPath = "images/artists/cyber_punk.jpg";

    // Define simulated popular songs for the artist
    let popularSongs = [];
    if (artistId === 1) {
        popularSongs = [
            { id: 1, name: "Midnight Glow", duration: "0:25", playable: true, audio: "audio/tracks/midnight_glow.mp3", cover: "images/covers/midnight_glow.jpg" },
            { id: 4, name: "Starlit Nights", duration: "0:25", playable: true, audio: "audio/tracks/starlit_nights.mp3", cover: "images/covers/starlit_nights.jpg" },
            { id: 5, name: "Nebula Dream", duration: "0:25", playable: true, audio: "audio/tracks/nebula_dream.mp3", cover: "images/covers/nebula_dream.jpg" }
        ];
    } else if (artistId === 2) {
        popularSongs = [
            { id: 2, name: "Ocean Breeze", duration: "0:20", playable: true, audio: "audio/tracks/ocean_breeze.mp3", cover: "images/covers/ocean_breeze.jpg" },
            { id: 6, name: "Sunset Song", duration: "0:20", playable: true, audio: "audio/tracks/sunset_song.mp3", cover: "images/covers/sunset_song.jpg" },
            { id: 7, name: "Acoustic Whispers", duration: "0:20", playable: true, audio: "audio/tracks/acoustic_whispers.mp3", cover: "images/covers/acoustic_whispers.jpg" }
        ];
    } else {
        popularSongs = [
            { id: 3, name: "Neon Horizon", duration: "0:15", playable: true, audio: "audio/tracks/neon_horizon.mp3", cover: "images/covers/neon_horizon.jpg" },
            { id: 8, name: "Retro Drive", duration: "0:15", playable: true, audio: "audio/tracks/retro_drive.mp3", cover: "images/covers/retro_drive.jpg" },
            { id: 9, name: "Laser Run", duration: "0:15", playable: true, audio: "audio/tracks/laser_run.mp3", cover: "images/covers/laser_run.jpg" }
        ];
    }

    // 4. Render Layout
    const detailsContainer = document.getElementById('artist-details-container');
    if (detailsContainer) {
        detailsContainer.innerHTML = `
            <!-- Profile Banner -->
            <div class="artist-hero">
                <div class="artist-banner-bg">
                    <img src="images/background/hero_bg.jpg" alt="Banner Background" onerror="this.src='https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&q=80'">
                </div>
                <div class="artist-banner-overlay">
                    <div class="artist-profile-header">
                        <div class="artist-avatar">
                            <img src="${avatarPath}" alt="${artistName}" onerror="this.src='https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80'">
                        </div>
                        <div class="artist-meta-info">
                            <span class="artist-genre-tag">${artistGenre} Artist</span>
                            <h1 class="artist-name-title">${artistName}</h1>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Grid Layout -->
            <div class="artist-content-grid">
                <!-- Left: Bio & Songs -->
                <div class="artist-main-section">
                    <!-- Biography Card -->
                    <div class="artist-bio-card glass-card">
                        <h2>Biography</h2>
                        <p>${artistBio}</p>
                    </div>

                    <!-- Popular Songs List -->
                    <div class="glass-card" style="padding: 30px;">
                        <h2>Popular Songs</h2>
                        <div class="popular-songs-list" id="popular-tracks-list">
                            <!-- Songs populated below -->
                        </div>
                    </div>
                </div>

                <!-- Right: Contact & Sidebar controls -->
                <div class="artist-sidebar">
                    <!-- Contact Details Card -->
                    <div class="sidebar-card glass-card">
                        <h3>Contact Info</h3>
                        <ul class="contact-links-list">
                            <li>
                                <i class="fas fa-phone-alt"></i>
                                <div>
                                    <span class="contact-label">Phone Number</span>
                                    <span class="contact-value">
                                        <a href="tel:${artistPhone}">+91 ${artistPhone}</a>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <i class="fas fa-envelope"></i>
                                <div>
                                    <span class="contact-label">Email Address</span>
                                    <span class="contact-value">
                                        <a href="mailto:${artistName.toLowerCase().replace(' ', '')}@songscape.com">${artistName.toLowerCase().replace(' ', '')}@songscape.com</a>
                                    </span>
                                </div>
                            </li>
                            <li>
                                <i class="fas fa-globe"></i>
                                <div>
                                    <span class="contact-label">Official Website</span>
                                    <span class="contact-value">
                                        <a href="#" onclick="event.preventDefault(); window.showToast('Artist website link simulated', 'info')">www.${artistName.toLowerCase().replace(' ', '')}.com</a>
                                    </span>
                                </div>
                            </li>
                        </ul>
                    </div>

                    <!-- Social Networks -->
                    <div class="sidebar-card glass-card">
                        <h3>Social Networks</h3>
                        <div class="social-badges-grid">
                            <a href="#" onclick="event.preventDefault(); window.showToast('Connecting to Spotify...', 'info')" class="social-badge">
                                <i class="fab fa-spotify"></i>
                                <span>Spotify</span>
                            </a>
                            <a href="#" onclick="event.preventDefault(); window.showToast('Connecting to YouTube...', 'info')" class="social-badge">
                                <i class="fab fa-youtube"></i>
                                <span>YouTube</span>
                            </a>
                            <a href="#" onclick="event.preventDefault(); window.showToast('Connecting to SoundCloud...', 'info')" class="social-badge">
                                <i class="fab fa-soundcloud"></i>
                                <span>SoundCloud</span>
                            </a>
                            <a href="#" onclick="event.preventDefault(); window.showToast('Connecting to Instagram...', 'info')" class="social-badge">
                                <i class="fab fa-instagram"></i>
                                <span>Instagram</span>
                            </a>
                            <a href="#" onclick="event.preventDefault(); window.showToast('Connecting to Twitter...', 'info')" class="social-badge">
                                <i class="fab fa-twitter"></i>
                                <span>Twitter</span>
                            </a>
                            <a href="#" onclick="event.preventDefault(); window.showToast('Connecting to Apple Music...', 'info')" class="social-badge">
                                <i class="fab fa-apple"></i>
                                <span>Apple</span>
                            </a>
                        </div>
                    </div>

                    <!-- Mini Sidebar Player for active playable song -->
                    <div id="sidebar-player-card" class="sidebar-card glass-card artist-player-card" style="display: none;">
                        <h3>Preview Track</h3>
                        <div class="artist-player-track-info">
                            <div class="artist-player-track-title" id="side-player-title">Track Title</div>
                            <div class="artist-player-track-artist">${artistName}</div>
                        </div>
                        <div class="artist-audio-controls">
                            <button id="side-play-btn" class="btn btn-primary" style="width: 50px; height: 50px; border-radius: 50%; padding: 0;">
                                <i class="fas fa-play"></i>
                            </button>
                            <span id="side-player-time" style="font-size: 0.9rem; color: var(--text-secondary);">0:00 / 0:00</span>
                        </div>
                    </div>
                </div>
            </div>
        `;

        renderPopularTracks(popularSongs);
    }

    // Render popular tracks list
    function renderPopularTracks(tracks) {
        const tracksListElement = document.getElementById('popular-tracks-list');
        if (!tracksListElement) return;

        tracksListElement.innerHTML = '';

        tracks.forEach((track, index) => {
            const trackRow = document.createElement('div');
            trackRow.className = 'track-row';
            
            let actionBtnHtml = '';
            if (track.playable) {
                actionBtnHtml = `
                    <button class="track-row-play-btn" data-track-idx="${index}" aria-label="Play song">
                        <i class="fas fa-play"></i>
                    </button>
                `;
            } else {
                actionBtnHtml = `
                    <button class="track-row-play-btn" style="background: var(--bg-primary); border: 1px solid var(--border-color); color: var(--text-secondary); cursor: not-allowed; box-shadow: none;" onclick="window.showToast('Demo preview not available for this track', 'info')" aria-label="Preview not available">
                        <i class="fas fa-lock"></i>
                    </button>
                `;
            }

            // Cover photo path (playable track has activeCover, simulated track can fallback)
            const coverPath = track.cover || activeSong.cover;

            trackRow.innerHTML = `
                <div class="track-left">
                    <span class="track-number">${index + 1}</span>
                    <img src="${coverPath}" alt="${track.name}" class="track-img" onerror="this.src='https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80'">
                    <div class="track-info">
                        <div class="track-title">${track.name}</div>
                        <div class="track-duration">${track.duration} ${track.playable ? '(Demo Audio)' : '(Upcoming Album)'}</div>
                    </div>
                </div>
                <div class="track-right">
                    ${actionBtnHtml}
                </div>
            `;

            tracksListElement.appendChild(trackRow);
        });

        // Add Play functionality to track rows
        const playButtons = tracksListElement.querySelectorAll('.track-row-play-btn[data-track-idx]');
        const audio = document.getElementById('artist-audio-element');
        const sidebarPlayerCard = document.getElementById('sidebar-player-card');
        const sidePlayBtn = document.getElementById('side-play-btn');
        const sidePlayerTitle = document.getElementById('side-player-title');
        const sidePlayerTime = document.getElementById('side-player-time');

        let playingTrackIndex = -1;

        playButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const trackIdx = parseInt(btn.getAttribute('data-track-idx'));
                const track = tracks[trackIdx];

                if (playingTrackIndex === trackIdx) {
                    // Toggle play/pause
                    if (audio.paused) {
                        audio.play();
                    } else {
                        audio.pause();
                    }
                    updateArtistPlayBtnIcons();
                    return;
                }

                // Play new track
                playingTrackIndex = trackIdx;
                audio.src = track.audio;
                audio.load();

                // Show mini sidebar player
                sidebarPlayerCard.style.display = 'block';
                sidePlayerTitle.textContent = track.name;

                audio.play().then(() => {
                    window.showToast(`Playing preview: ${track.name}`, 'success');
                }).catch(err => {
                    console.error("Audio playback error:", err);
                    window.showToast("Failed to load preview track", "error");
                });

                updateArtistPlayBtnIcons();
            });
        });

        if (sidePlayBtn && audio) {
            sidePlayBtn.addEventListener('click', () => {
                if (audio.paused) {
                    audio.play();
                } else {
                    audio.pause();
                }
                updateArtistPlayBtnIcons();
            });

            audio.addEventListener('timeupdate', () => {
                const cur = formatTime(audio.currentTime);
                const dur = formatTime(audio.duration || 0);
                sidePlayerTime.textContent = `${cur} / ${dur}`;
            });

            audio.addEventListener('ended', () => {
                playingTrackIndex = -1;
                updateArtistPlayBtnIcons();
                sidebarPlayerCard.style.display = 'none';
            });
        }

        function updateArtistPlayBtnIcons() {
            // Update row button
            playButtons.forEach(btn => {
                const trackIdx = parseInt(btn.getAttribute('data-track-idx'));
                const icon = btn.querySelector('i');
                if (icon) {
                    if (playingTrackIndex === trackIdx && !audio.paused) {
                        icon.className = 'fas fa-pause';
                    } else {
                        icon.className = 'fas fa-play';
                    }
                }
            });

            // Update sidebar button
            if (sidePlayBtn) {
                const sideIcon = sidePlayBtn.querySelector('i');
                if (sideIcon) {
                    if (audio && !audio.paused) {
                        sideIcon.className = 'fas fa-pause';
                    } else {
                        sideIcon.className = 'fas fa-play';
                    }
                }
            }
        }
    }

    // Helper: Format seconds to clean minutes:seconds layout
    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
});
