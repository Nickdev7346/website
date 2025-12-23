// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Copy to clipboard function
function copyToClipboard(text, button) {
    // Fallback for browsers that don't support clipboard API
    if (!navigator.clipboard) {
        // Fallback method
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showCopyFeedback(button);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            alert('Failed to copy. Please copy manually: ' + text);
        }
        document.body.removeChild(textArea);
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
        showCopyFeedback(button);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        // Fallback method
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
            document.execCommand('copy');
            showCopyFeedback(button);
        } catch (err2) {
            alert('Failed to copy. Please copy manually: ' + text);
        }
        document.body.removeChild(textArea);
    });
}

// Show copy feedback
function showCopyFeedback(button) {
    if (!button) return;
    const originalText = button.textContent;
    button.textContent = 'Copied!';
    button.style.background = '#3fb950';
    
    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 2000);
}

// Fetch real player count from FiveM server
async function updatePlayerCount() {
    const playerCountElement = document.getElementById('player-count');
    if (!playerCountElement) return;

    try {
        // Using FiveM server browser API endpoint
        const response = await fetch('https://servers-frontend.fivem.net/api/servers/single/bj3858', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            const currentPlayers = data.Data?.clients || data.clients || 0;
            const maxPlayers = data.Data?.sv_maxclients || data.sv_maxclients || 128;
            playerCountElement.textContent = `${currentPlayers}/${maxPlayers}`;
        } else {
            // Fallback if API call fails
            playerCountElement.textContent = 'N/A';
        }
    } catch (error) {
        console.error('Error fetching player count:', error);
        // Fallback display on error
        playerCountElement.textContent = 'N/A';
    }
}

// Update player count every 30 seconds
setInterval(updatePlayerCount, 30000);
updatePlayerCount(); // Initial update

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = 'none';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
    }
    
    lastScroll = currentScroll;
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards and rule categories
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .rule-link-card, .staff-card, .update-card, .link-card, .join-media');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Active navigation highlighting based on scroll position
let sectionObserver = null;

function setActiveNavLink(linkHref) {
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        // Match exact href
        if (href === linkHref) {
            link.classList.add('active');
            return;
        }
        
        // If linkHref is a section ID (like 'features'), match:
        // - #features
        // - home.html#features
        // - Any href ending with #features
        if (linkHref && !linkHref.includes('.')) {
            if (href === `#${linkHref}` || href.endsWith(`#${linkHref}`)) {
                link.classList.add('active');
            }
        }
        
        // If linkHref is a page (like 'rules.html'), match:
        // - rules.html
        // - Any href containing rules.html
        if (linkHref && linkHref.includes('.')) {
            if (href === linkHref || href.includes(linkHref)) {
                link.classList.add('active');
            }
        }
    });
}

function updateActiveNav() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash.replace('#', '');
    const currentPage = currentPath.split('/').pop() || 'index.html';
    
    // Handle page-based active states
    if (currentPage === 'rules.html' || currentPage.includes('rules.html')) {
        setActiveNavLink('rules.html');
        return;
    }
    
    if (currentPage === 'staff.html' || currentPage.includes('staff.html')) {
        setActiveNavLink('staff.html');
        return;
    }
    
    if (currentPage === 'index.html' || currentPage === '') {
        setActiveNavLink('index.html');
        return;
    }
    
    // For home.html, use Intersection Observer to track sections
    if (currentPage === 'home.html' || document.querySelector('section[id]')) {
        const sections = document.querySelectorAll('section[id]');
        
        if (sections.length > 0 && !sectionObserver) {
            const sectionObserverOptions = {
                threshold: [0.1, 0.3, 0.5],
                rootMargin: '-100px 0px -50% 0px'
            };
            
            sectionObserver = new IntersectionObserver((entries) => {
                // Find the section that's most visible in the viewport
                let mostVisible = null;
                let maxRatio = 0;
                
                entries.forEach(entry => {
                    if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
                        maxRatio = entry.intersectionRatio;
                        mostVisible = entry.target;
                    }
                });
                
                if (mostVisible && maxRatio > 0.1) {
                    const id = mostVisible.getAttribute('id');
                    setActiveNavLink(id);
                }
            }, sectionObserverOptions);
            
            // Observe all sections with IDs
            sections.forEach(section => {
                sectionObserver.observe(section);
            });
        }
        
        // Handle hash on initial load
        if (currentHash) {
            const targetSection = document.querySelector(`#${currentHash}`);
            if (targetSection) {
                setActiveNavLink(currentHash);
            }
        }
    }
}

// Initialize active navigation on page load
document.addEventListener('DOMContentLoaded', () => {
    updateActiveNav();
});

// Update on hash change
window.addEventListener('hashchange', () => {
    updateActiveNav();
});

