/*
  Script: Core Interactions & Animations
  Theme: Dark Cinematic Premium
*/

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    animateOnScroll();

    // Page specific initializers
    if (document.querySelector('.countdown')) {
        initCountdown();
        initShuffle();
    }
    if (document.querySelector('.song-grid')) initMusicPlayer();
    if (document.querySelector('.pop-area')) initPopEffects();
    if (document.querySelector('#heartbeat')) initSurprise();
});

/* --- Global Particles --- */
function initParticles() {
    const bg = document.getElementById('bg-particles');
    if (!bg) return;

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        createParticle(bg);
    }
}

function createParticle(container) {
    const p = document.createElement('div');
    p.classList.add('particle');

    const size = Math.random() * 3 + 1;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;

    p.style.left = `${Math.random() * 100}%`;
    p.style.top = `${Math.random() * 100}%`;

    const duration = Math.random() * 20 + 10;
    p.style.animationDuration = `${duration}s`;
    p.style.animationDelay = `-${Math.random() * 20}s`;

    container.appendChild(p);
}

/* --- Scroll Animations --- */
function animateOnScroll() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.classList.remove('hidden');

                // Specific logic for reasons list items
                if (entry.target.classList.contains('reason-card')) {
                    entry.target.classList.add('revealed');
                }
            }
        });
    }, { threshold: 0.1 });

    // Observe all hidden elements and specific cards
    document.querySelectorAll('.hidden, .reason-card').forEach(el => observer.observe(el));
}

/* --- Moments: Shuffle --- */
function initShuffle() {
    const btn = document.getElementById('shuffle-btn');
    const gallery = document.querySelector('.gallery-container');

    if (!btn || !gallery) return;

    btn.addEventListener('click', () => {
        const cards = Array.from(gallery.children);

        // Shuffle array
        for (let i = cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [cards[i], cards[j]] = [cards[j], cards[i]];
        }

        // Re-append with new random rotations
        cards.forEach(card => {
            const rot = (Math.random() * 10) - 5; // -5 to +5 deg
            card.style.transform = `rotate(${rot}deg)`;
            gallery.appendChild(card);
        });
    });
}

/* --- Moments: Countdown --- */
function initCountdown() {
    // START DATE: April 4, 2023
    const startDate = new Date('2023-04-04T00:00:00');

    function updateTimer() {
        const now = new Date();
        const diff = now - startDate;

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        document.getElementById('days').innerText = days;
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    }

    setInterval(updateTimer, 1000);
    updateTimer();
}

/* --- Music Player --- */
let currentAudio = null;

function initMusicPlayer() {
    const cards = document.querySelectorAll('.song-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const songPath = card.dataset.src;

            // Stop current if playing
            if (currentAudio && !currentAudio.paused) {
                currentAudio.pause();
                document.querySelectorAll('.song-card').forEach(c => c.classList.remove('active'));

                // If clicking same song, just pause
                if (currentAudio.src.includes(songPath)) {
                    currentAudio = null;
                    return;
                }
            }

            // Play new
            currentAudio = new Audio(songPath);
            currentAudio.play();
            card.classList.add('active');

            currentAudio.onended = () => {
                card.classList.remove('active');
                currentAudio = null;
            };
        });
    });
}

/* --- Pop Page --- */
const messages = [
    "You are my everything",
    "I choose you always",
    "You feel like home",
    "Forever starts with you",
    "My heart belongs to you",
    "Life is better with you",
    "I love your smile",
    "You are my dream come true"
];

function initPopEffects() {
    const area = document.querySelector('.pop-area');

    area.addEventListener('click', (e) => {
        const msg = document.createElement('div');
        msg.classList.add('pop-msg');
        msg.innerText = messages[Math.floor(Math.random() * messages.length)];

        msg.style.left = `${e.clientX}px`;
        msg.style.top = `${e.clientY}px`;

        area.appendChild(msg);

        setTimeout(() => {
            msg.remove();
        }, 2000);
    });
}

/* --- Surprise Page --- */
function initSurprise() {
    const heart = document.getElementById('heartbeat');
    const finalMsg = document.getElementById('final-msg');

    heart.addEventListener('click', () => {
        heart.style.animation = 'none'; // Stop heartbeat
        heart.style.transform = 'scale(50)'; // Explode fill
        heart.style.opacity = '0';
        heart.style.transition = 'all 1s ease';

        setTimeout(() => {
            finalMsg.classList.remove('hidden');
            finalMsg.classList.add('visible');
            document.body.style.background = '#200'; // Slight red tint shift
        }, 800);
    });
}
