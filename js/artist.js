// Default Fallback Seed Data
const defaultSongs = [
    {
        id: 1,
        name: "Escape Your Love",
        artist: "Fassounds",
        cover: "images/covers/retro_drive.jpg",
        audio: "audio/fassounds-escape-your-love-upbeat-fashion-pop-dance-412230.mp3",
        genre: "Pop",
        artistPhone: "7000000000",
        artistId: 1,
        duration: "0:25",
        bio: "Fassounds brings bright, upbeat pop energy to the library."
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
        duration: "0:20",
        bio: "Ikoliks AJ offers a warm acoustic melody inspired by springtime."
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
        duration: "0:30",
        bio: "Kontraa delivers rhythmic afro-pop grooves with a fresh, modern beat."
    }
];

const artistSongsVersion = 11;
const storedArtistSongsVersion = parseInt(localStorage.getItem('songscape_songs_version'), 10);
if (storedArtistSongsVersion !== artistSongsVersion) {
    localStorage.setItem('songscape_songs', JSON.stringify(defaultSongs));
    localStorage.setItem('songscape_songs_version', String(artistSongsVersion));
}

document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Songs Data
    const songs = JSON.parse(localStorage.getItem('songscape_songs')) || defaultSongs;

    const artists = Array.from(
        songs.reduce((map, song) => {
            if (!map.has(song.artistId)) {
                map.set(song.artistId, {
                    id: song.artistId,
                    name: song.artist,
                    genre: song.genre,
                    bio: song.bio,
                    phone: song.artistPhone,
                    avatar: `images/artists/${song.artistId === 1 ? 'luna_eclipse.jpg' : song.artistId === 2 ? 'kai_ryo.jpg' : 'cyber_punk.jpg'}`
                });
            }
            return map;
        }, new Map()).values()
    );

    // 2. Parse Query Params
    const urlParams = new URLSearchParams(window.location.search);
    const artistIdParam = parseInt(urlParams.get('id'));

    if (isNaN(artistIdParam)) {
        renderArtistList(artists);
        return;
    }

    const selectedArtist = artists.find(a => a.id === artistIdParam) || artists[0];
    const artistName = selectedArtist.name;
    const artistBio = selectedArtist.bio;
    const artistPhone = selectedArtist.phone;
    const artistGenre = selectedArtist.genre;
    const avatarPath = selectedArtist.avatar;
    const activeSong = songs.find(s => s.artistId === selectedArtist.id) || songs[0];

    // Set Page Title
    document.title = `Songscape - Artist Profile: ${artistName}`;

    const popularSongs = songs
        .filter(song => song.artistId === selectedArtist.id)
        .map(song => ({
            ...song,
            playable: true,
            duration: song.duration || '0:30'
        }));

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

    function renderArtistList(artists) {
        const detailsContainer = document.getElementById('artist-details-container');
        if (!detailsContainer) return;
        document.title = 'Songscape - Artists';

        detailsContainer.innerHTML = `
            <div class="artist-list-page">
                <div class="artist-list-header glass-card">
                    <h1>Meet the Artists</h1>
                    <p>Explore all Songscape artists and tap a profile to view their tracks, bio, and preview audio.</p>
                </div>
                <div class="artist-list-grid">
                    ${artists.map(artist => `
                        <a href="artist.html?id=${artist.id}" class="artist-card glass-card">
                            <div class="artist-card-image">
                                <img src="${artist.avatar}" alt="${artist.name}">
                            </div>
                            <div class="artist-card-content">
                                <h3>${artist.name}</h3>
                                <p>${artist.genre}</p>
                            </div>
                        </a>
                    `).join('')}
                </div>
            </div>
        `;
    }

    // Render popular tracks list
    function renderPopularTracks(tracks) {
        const tracksListElement = document.getElementById('popular-tracks-list');
        if (!tracksListElement) return;

        tracksListElement.innerHTML = '';

        tracks.forEach((track, index) => {
            const trackRow = document.createElement('div');
            trackRow.className = 'track-row';
            
            const isPlayable = track.playable !== false;
            let actionBtnHtml = `
                <button class="track-row-play-btn" data-track-idx="${index}" aria-label="Play song">
                    <i class="fas fa-play"></i>
                </button>
            `;

            // Cover photo path (playable track has activeCover, simulated track can fallback)
            const coverPath = track.cover || activeSong.cover;
            const durationText = track.duration || '0:30';

            trackRow.innerHTML = `
                <div class="track-left">
                    <span class="track-number">${index + 1}</span>
                    <img src="${coverPath}" alt="${track.name}" class="track-img" onerror="this.src='https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=500&q=80'">
                    <div class="track-info">
                        <div class="track-title">${track.name}</div>
                        <div class="track-duration">${durationText} ${isPlayable ? '(Demo Audio)' : '(Upcoming Album)'}</div>
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
