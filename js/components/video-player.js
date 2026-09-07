function formatVideoTime({ seconds }) {
    if (!Number.isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainder = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${remainder}`;
}

function initVideoPlayer({ player }) {
    const video = player.querySelector('video');
    const toggles = player.querySelectorAll('[data-video-toggle]');
    const mute = player.querySelector('[data-video-mute]');
    const fullscreen = player.querySelector('[data-video-fullscreen]');
    const progress = player.querySelector('[data-video-progress]');
    const current = player.querySelector('[data-video-current]');
    const duration = player.querySelector('[data-video-duration]');
    let animationFrame;

    const syncPlayback = () => {
        player.toggleAttribute('data-playing', !video.paused);
        toggles.forEach((toggle) => {
            toggle.setAttribute('aria-label', video.paused ? 'Play video' : 'Pause video');
        });
        cancelAnimationFrame(animationFrame);
        if (!video.paused) animationFrame = requestAnimationFrame(animateProgress);
    };
    const syncTime = () => {
        current.textContent = formatVideoTime({ seconds: video.currentTime });
        duration.textContent = formatVideoTime({ seconds: video.duration });
        progress.value = video.duration ? video.currentTime / video.duration * 100 : 0;
        progress.style.setProperty('--video-progress', `${progress.value}%`);
    };
    const syncMuted = () => {
        player.toggleAttribute('data-muted', video.muted);
        mute.setAttribute('aria-label', video.muted ? 'Unmute video' : 'Mute video');
    };
    const animateProgress = () => {
        syncTime();
        if (!video.paused) animationFrame = requestAnimationFrame(animateProgress);
    };
    const togglePlayback = () => {
        if (video.paused) video.play();
        else video.pause();
    };

    toggles.forEach((toggle) => toggle.addEventListener('click', togglePlayback));
    video.addEventListener('click', togglePlayback);
    mute.addEventListener('click', () => {
        video.muted = !video.muted;
    });
    progress.addEventListener('input', () => {
        if (!video.duration) return;
        video.currentTime = Number(progress.value) / 100 * video.duration;
        progress.style.setProperty('--video-progress', `${progress.value}%`);
    });
    fullscreen.addEventListener('click', () => {
        if (document.fullscreenElement) document.exitFullscreen();
        else player.requestFullscreen();
    });
    document.addEventListener('fullscreenchange', () => {
        fullscreen.setAttribute(
            'aria-label',
            document.fullscreenElement ? 'Exit fullscreen' : 'Enter fullscreen',
        );
    });
    video.addEventListener('play', syncPlayback);
    video.addEventListener('pause', syncPlayback);
    video.addEventListener('timeupdate', syncTime);
    video.addEventListener('loadedmetadata', syncTime);
    video.addEventListener('volumechange', syncMuted);
    video.muted = video.defaultMuted;
    syncPlayback();
    syncTime();
    syncMuted();
    if (video.autoplay) video.play().catch(syncPlayback);
}

document
    .querySelectorAll('[data-video-player]')
    .forEach((player) => initVideoPlayer({ player }));
