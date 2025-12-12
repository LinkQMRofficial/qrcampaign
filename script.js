// Enhanced interactions and tracking for El Pelón landing page

document.addEventListener('DOMContentLoaded', function() {
    // Initialize
    initializeParticles();
    trackSocialClicks();
    addTouchFeedback();
    preventImageDrag();
    
    // Add entrance animation on load
    animateOnLoad();
});

// Particle effect for background
function initializeParticles() {
    const background = document.querySelector('.background-animation');
    const particleCount = 15;
    
    for (let i = 0; i < particleCount; i++) {
        createParticle(background, i);
    }
}

function createParticle(container, index) {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 2 + 'px';
    particle.style.height = particle.style.width;
    particle.style.borderRadius = '50%';
    particle.style.backgroundColor = index % 2 === 0 ? 'var(--blue-primary)' : 'var(--orange-primary)';
    particle.style.opacity = Math.random() * 0.3 + 0.1;
    particle.style.top = Math.random() * 100 + '%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.pointerEvents = 'none';
    
    const animationDuration = Math.random() * 10 + 15 + 's';
    const animationDelay = Math.random() * 5 + 's';
    
    particle.style.animation = `particleFloat ${animationDuration} ${animationDelay} infinite ease-in-out`;
    
    container.appendChild(particle);
}

// Add particle animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes particleFloat {
        0%, 100% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(50px, -50px);
        }
        50% {
            transform: translate(-30px, -100px);
        }
        75% {
            transform: translate(30px, -50px);
        }
    }
`;
document.head.appendChild(style);

// Track social media clicks for analytics
function trackSocialClicks() {
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach(card => {
        card.addEventListener('click', function(e) {
            const platform = this.getAttribute('data-platform');
            const timestamp = new Date().toISOString();
            
            // Log to console (can be replaced with actual analytics service)
            console.log(`Social Click: ${platform} at ${timestamp}`);
            
            // Store in localStorage for basic tracking
            trackClick(platform);
            
            // Add success feedback
            addClickFeedback(this);
        });
    });
}

function trackClick(platform) {
    try {
        let clicks = JSON.parse(localStorage.getItem('socialClicks') || '{}');
        clicks[platform] = (clicks[platform] || 0) + 1;
        clicks.lastClick = new Date().toISOString();
        localStorage.setItem('socialClicks', JSON.stringify(clicks));
    } catch (e) {
        console.log('Tracking not available');
    }
}

function addClickFeedback(element) {
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.style.position = 'absolute';
    ripple.style.width = '20px';
    ripple.style.height = '20px';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.top = '50%';
    ripple.style.left = '50%';
    ripple.style.transform = 'translate(-50%, -50%) scale(0)';
    ripple.style.pointerEvents = 'none';
    ripple.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
    ripple.style.opacity = '1';
    ripple.style.zIndex = '10';
    
    element.style.position = 'relative';
    element.appendChild(ripple);
    
    // Trigger animation
    setTimeout(() => {
        ripple.style.transform = 'translate(-50%, -50%) scale(20)';
        ripple.style.opacity = '0';
    }, 10);
    
    // Remove after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add touch feedback for mobile
function addTouchFeedback() {
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach(card => {
        card.addEventListener('touchstart', function() {
            this.style.transform = 'translateY(-2px) scale(0.98)';
        });
        
        card.addEventListener('touchend', function() {
            this.style.transform = '';
        });
    });
}

// Prevent image drag
function preventImageDrag() {
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('dragstart', (e) => e.preventDefault());
    }
}

// Animate elements on load
function animateOnLoad() {
    // Add extra animation to logo on first load
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.style.animation = 'logoFloat 3s ease-in-out infinite, scaleIn 1s ease-out';
    }
}

// Parallax effect on scroll for mobile
let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            updateParallax();
            ticking = false;
        });
        ticking = true;
    }
});

function updateParallax() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.logo-container, .hero-section');
    
    parallaxElements.forEach(element => {
        const speed = 0.5;
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        const focused = document.activeElement;
        if (focused.classList.contains('social-card')) {
            e.preventDefault();
            focused.click();
        }
    }
});

// Check for visitor count (simple implementation)
function updateVisitorCount() {
    try {
        let visits = parseInt(localStorage.getItem('visits') || '0');
        visits++;
        localStorage.setItem('visits', visits.toString());
        console.log(`Total visits: ${visits}`);
    } catch (e) {
        console.log('Visit tracking not available');
    }
}

updateVisitorCount();

// Add hover sound effect (optional - uncomment to enable)
/*
function addHoverSound() {
    const hoverSound = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjqS2O+7bxwFN4nO7tiLNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjqS2O+7bxwFN4nO7tiLNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjqS2O+7bxwFN4nO7tiLNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjqS2O+7bxwFN4nO7tiLNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjqS2O+7bxwFN4nO7tiLNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjqS2O+7bxwFN4nO7tiLNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjqS2O+7bxwFN4nO7tiLNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjqS2O+7bxwFN4nO7tiLNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjqS2O+7bxwFN4nO7tiLNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjqS2O+7bxwFN4nO7tiLNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjqS2O+7bxwFN4nO7tiLNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjqS2O+7bxwFN4nO7tiLNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBjqS2O+7bxwFN4nO');
    
    document.querySelectorAll('.social-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            hoverSound.currentTime = 0;
            hoverSound.volume = 0.1;
            hoverSound.play().catch(() => {});
        });
    });
}
*/

// Export analytics data (for development/testing)
window.getAnalytics = function() {
    try {
        const clicks = JSON.parse(localStorage.getItem('socialClicks') || '{}');
        const visits = localStorage.getItem('visits');
        console.table({
            'Total Visits': visits,
            'Facebook Clicks': clicks.facebook || 0,
            'Instagram Clicks': clicks.instagram || 0,
            'TikTok Clicks': clicks.tiktok || 0,
            'Twitter Clicks': clicks.twitter || 0,
            'Last Click': clicks.lastClick || 'N/A'
        });
    } catch (e) {
        console.log('Analytics data not available');
    }
};

// Performance optimization
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Preload social media icons
        document.querySelectorAll('.social-card').forEach(card => {
            const link = new URL(card.href);
            const linkEl = document.createElement('link');
            linkEl.rel = 'dns-prefetch';
            linkEl.href = link.origin;
            document.head.appendChild(linkEl);
        });
    });
}

console.log('%c¡Bienvenido a la campaña de El Pelón! 🚀', 'font-size: 20px; font-weight: bold; color: #f79c1c;');
console.log('%cPara ver las estadísticas de clics, escribe: getAnalytics()', 'font-size: 12px; color: #00bef1;');
