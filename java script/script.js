// Dark mode functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') { 
    body.classList.add('dark-mode');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

// Theme toggle event listener
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// Mobile Menu Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
    mobileToggle.innerHTML = navMenu.classList.contains('show') ? 
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Create Resume Button (if needed)
const createResumeBtn = document.getElementById('createResumeBtn');
if (createResumeBtn) {
    createResumeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        window.open('form/Template1.html', '_blank');
    });
}

// Video Player Functionality
document.addEventListener('DOMContentLoaded', function() {
    const videoPlaceholder = document.getElementById('videoPlaceholder');
    const video = document.getElementById('demoVideo');
    const playButton = document.getElementById('playButton');
    const loadingIndicator = document.getElementById('loadingIndicator');
    const videoError = document.getElementById('videoError');
    
    // Check if video elements exist
    if (!videoPlaceholder || !video || !playButton || !loadingIndicator || !videoError) {
        console.warn('Video elements not found');
        return;
    }
    
    let videoLoaded = false;
    let playAttempted = false;

    // Preload video metadata
    video.load();

    // Handle video loading events
    video.addEventListener('loadedmetadata', function() {
        videoLoaded = true;
        console.log('Video metadata loaded');
        if (playAttempted) {
            playVideo();
        }
    });

    video.addEventListener('error', function(e) {
        console.error('Video error:', e);
        showError();
    });

    video.addEventListener('loadstart', function() {
        console.log('Video loading started');
        if (playAttempted) {
            showLoading();
        }
    });

    video.addEventListener('canplay', function() {
        console.log('Video can play');
        hideLoading();
        if (playAttempted) {
            playVideo();
        }
    });

    video.addEventListener('loadeddata', function() {
        console.log('Video data loaded');
        videoLoaded = true;
    });

    // Click event for video placeholder
    videoPlaceholder.addEventListener('click', function() {
        console.log('Video placeholder clicked');
        
        if (videoError.style.display === 'block') {
            // Reset and try again
            resetVideo();
            video.load();
        }
        
        playAttempted = true;
        
        if (videoLoaded) {
            playVideo();
        } else {
            showLoading();
            // Force load the video
            video.load();
        }
    });

    function playVideo() {
        console.log('Attempting to play video');
        hideError();
        hideLoading();
        playButton.style.display = 'none';
        video.style.display = 'block';
        
        // Set video attributes for better compatibility
        video.muted = false; // Changed from true to false - video will now have audio
        video.playsInline = true;
        video.controls = true;
        
        // Attempt to play
        const playPromise = video.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    console.log('Video playing successfully with audio');
                })
                .catch(error => {
                    console.error('Video play failed:', error);
                    // If unmuted playback fails, try muted as fallback
                    console.log('Attempting fallback to muted playback');
                    video.muted = true;
                    video.play().catch(fallbackError => {
                        console.error('Muted fallback also failed:', fallbackError);
                        showError();
                    });
                });
        }
    }

    function showLoading() {
        console.log('Showing loading indicator');
        playButton.style.display = 'none';
        loadingIndicator.style.display = 'block';
        hideError();
    }

    function hideLoading() {
        loadingIndicator.style.display = 'none';
    }

    function showError() {
        console.log('Showing error message');
        hideLoading();
        playButton.style.display = 'none';
        video.style.display = 'none';
        videoError.style.display = 'block';
    }

    function hideError() {
        videoError.style.display = 'none';
    }

    function resetVideo() {
        console.log('Resetting video');
        video.style.display = 'none';
        hideError();
        hideLoading();
        playButton.style.display = 'block';
        playAttempted = false;
        videoLoaded = false;
    }

    // Handle video end
    video.addEventListener('ended', function() {
        console.log('Video ended');
        video.style.display = 'none';
        playButton.style.display = 'block';
        playAttempted = false;
    });

    // Handle video pause
    video.addEventListener('pause', function() {
        console.log('Video paused');
    });

    // Handle video play
    video.addEventListener('play', function() {
        console.log('Video started playing');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Animation on scroll for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Template card hover effects
document.querySelectorAll('.template-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// Console log for debugging
console.log('ResumeCraft JavaScript loaded successfully');
