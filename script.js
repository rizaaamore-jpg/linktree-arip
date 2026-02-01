// ===== GLOBAL FUNCTIONS =====

// Fungsi navigasi antar halaman
function goToPage(pageUrl) {
    // Tambahkan efek transisi sebelum pindah
    document.body.style.opacity = '0.7';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        window.location.href = pageUrl;
    }, 300);
}

// Fungsi untuk membuat confetti
function createConfetti(count = 100) {
    const colors = ['#ff6bcb', '#6bcbff', '#ffde59', '#b56bff', '#5bff6b'];
    
    for (let i = 0; i < count; i++) {
        createConfettiPiece(colors);
    }
}

function createConfettiPiece(colors) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti-piece';
    confetti.style.cssText = `
        position: fixed;
        width: ${Math.random() * 10 + 5}px;
        height: ${Math.random() * 10 + 5}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        top: -20px;
        left: ${Math.random() * 100}vw;
        opacity: 0;
        z-index: 9999;
        pointer-events: none;
    `;
    
    document.body.appendChild(confetti);
    
    // Animasi confetti
    const duration = Math.random() * 3000 + 2000;
    const horizontal = Math.random() * 200 - 100;
    
    confetti.animate([
        {
            transform: 'translateY(0) rotate(0deg)',
            opacity: 0
        },
        {
            transform: `translateY(20px) rotate(180deg)`,
            opacity: 1
        },
        {
            transform: `translateY(${window.innerHeight}px) translateX(${horizontal}px) rotate(360deg)`,
            opacity: 0
        }
    ], {
        duration: duration,
        easing: 'cubic-bezier(0.215, 0.610, 0.355, 1)'
    });
    
    // Hapus confetti setelah animasi selesai
    setTimeout(() => {
        confetti.remove();
    }, duration);
}

// Fungsi untuk menampilkan notifikasi
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        </div>
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : '#ff6b6b'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 9999;
        transform: translateX(150%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Animasi masuk
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Animasi keluar setelah 3 detik
    setTimeout(() => {
        notification.style.transform = 'translateX(150%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Fungsi untuk memainkan efek suara
function playSoundEffect(type) {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        switch(type) {
            case 'click':
                playClickSound(audioContext);
                break;
            case 'success':
                playSuccessSound(audioContext);
                break;
            case 'confetti':
                playConfettiSound(audioContext);
                break;
        }
    } catch (e) {
        console.log('Audio context not supported');
    }
}

function playClickSound(audioContext) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}

function playSuccessSound(audioContext) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

function playConfettiSound(audioContext) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            oscillator.frequency.value = 600 + Math.random() * 400;
            oscillator.type = 'triangle';
            
            gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        }, i * 50);
    }
}

// Fungsi untuk mencegah zoom
function preventZoom() {
    // Prevent pinch zoom
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
        document.body.style.zoom = 0.99;
    });

    document.addEventListener('gesturechange', function(e) {
        e.preventDefault();
        document.body.style.zoom = 0.99;
    });

    document.addEventListener('gestureend', function(e) {
        e.preventDefault();
        document.body.style.zoom = 1;
    });

    // Prevent double tap zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function(event) {
        const now = Date.now();
        if (now - lastTouchEnd <= 300) {
            event.preventDefault();
        }
        lastTouchEnd = now;
    }, false);

    // Prevent mouse wheel zoom
    document.addEventListener('wheel', function(e) {
        if (e.ctrlKey) {
            e.preventDefault();
        }
    }, { passive: false });
}

// Fungsi untuk mengatur ukuran elemen berdasarkan viewport
function setupResponsiveElements() {
    function updateSizes() {
        const vh = window.innerHeight * 0.01;
        const vw = window.innerWidth * 0.01;
        
        document.documentElement.style.setProperty('--vh', `${vh}px`);
        document.documentElement.style.setProperty('--vw', `${vw}px`);
        
        // Adjust font sizes for mobile
        if (window.innerWidth < 768) {
            document.documentElement.style.fontSize = '14px';
        } else {
            document.documentElement.style.fontSize = '16px';
        }
    }
    
    window.addEventListener('resize', updateSizes);
    updateSizes();
}

// ===== INITIALIZATION =====

// Jalankan ketika halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Cegah zoom
    preventZoom();
    
    // Setup responsive elements
    setupResponsiveElements();
    
    // Tambahkan efek klik pada semua tombol
    document.querySelectorAll('button, .clickable').forEach(button => {
        button.addEventListener('click', function(e) {
            // Efek ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.7);
                transform: scale(0);
                animation: ripple 0.6s linear;
                width: ${size}px;
                height: ${size}px;
                top: ${y}px;
                left: ${x}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Hapus ripple setelah animasi
            setTimeout(() => ripple.remove(), 600);
            
            // Mainkan efek suara klik
            playSoundEffect('click');
        });
    });
    
    // Tambahkan CSS untuk ripple effect
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .confetti-piece {
            animation: confettiFall 3s ease-in forwards;
        }
        
        @keyframes confettiFall {
            0% {
                transform: translateY(-20px) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            100% {
                transform: translateY(100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    console.log('🎂 Birthday Website Loaded Successfully!');
});

// ===== PAGE SPECIFIC FUNCTIONS =====

// Fungsi untuk halaman wishes.html
function submitWish() {
    const name = document.getElementById('wisherName')?.value;
    const message = document.getElementById('wishMessage')?.value;
    
    if (!name || !message) {
        showNotification('Harap isi semua form!', 'error');
        return false;
    }
    
    // Simpan wish ke localStorage
    const wish = {
        name: name,
        message: message,
        timestamp: new Date().toISOString(),
        id: Date.now()
    };
    
    let wishes = JSON.parse(localStorage.getItem('birthdayWishes') || '[]');
    wishes.push(wish);
    localStorage.setItem('birthdayWishes', JSON.stringify(wishes));
    
    // Tampilkan confetti
    createConfetti(200);
    
    // Lanjutan script.js

// Tampilkan notifikasi
showNotification('Ucapanmu berhasil dikirim! 🎉', 'success');

// Reset form
document.getElementById('wisherName').value = '';
document.getElementById('wishMessage').value = '';
document.getElementById('charCount').textContent = '0';

return false;
}

// Fungsi untuk menghitung karakter
function updateCharCount() {
const textarea = document.getElementById('wishMessage');
const charCount = document.getElementById('charCount');
if (textarea && charCount) {
    charCount.textContent = textarea.value.length;
    
    // Change color based on length
    if (textarea.value.length > 250) {
        charCount.style.color = '#ff6b6b';
    } else if (textarea.value.length > 200) {
        charCount.style.color = '#ffde59';
    } else {
        charCount.style.color = '#666';
    }
}
}

// Fungsi untuk halaman gallery.html
function loadGalleryPhotos() {
// Sample photos - replace with actual photos
const photos = [
    { src: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', caption: 'Birthday Celebration! 🎉' },
    { src: 'https://images.unsplash.com/photo-1531259683007-016a7b628fc3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', caption: 'Cake Time! 🎂' },
    { src: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', caption: 'Fun Moments 😄' },
    { src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', caption: 'Gifts Galore! 🎁' },
    { src: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', caption: 'Party Time! 🥳' },
    { src: 'https://images.unsplash.com/photo-1533912352517-92e6a1e4d3a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80', caption: 'Memories ❤️' }
];

const galleryGrid = document.querySelector('.gallery-grid');
if (galleryGrid) {
    galleryGrid.innerHTML = '';
    photos.forEach((photo, index) => {
        const photoElement = document.createElement('div');
        photoElement.className = 'gallery-photo';
        photoElement.innerHTML = `
            <div class="photo-frame">
                <img src="${photo.src}" alt="${photo.caption}" 
                     onerror="this.src='https://via.placeholder.com/500x300/ff6bcb/ffffff?text=Birthday+Photo'">
                <div class="photo-caption">${photo.caption}</div>
                <div class="photo-overlay">
                    <button class="view-photo-btn" onclick="viewPhoto(${index})">
                        <i class="fas fa-expand"></i>
                    </button>
                </div>
            </div>
        `;
        galleryGrid.appendChild(photoElement);
    });
}

// Load timeline
loadTimeline();
}

function loadTimeline() {
const timelineData = [
    { year: '2019', title: 'Pertama Bertemu', description: 'Momen pertama kita bertemu dan menjadi teman' },
    { year: '2020', title: 'Kenangan Liburan', description: 'Liburan bersama yang penuh tawa' },
    { year: '2021', title: 'Pesta Ulang Tahun', description: 'Celebration yang tak terlupakan' },
    { year: '2022', title: 'Momen Spesial', description: 'Hari-hari berharga bersama' },
    { year: '2023', title: 'Pencapaian Bersama', description: 'Mencapai goals bersama-sama' },
    { year: '2024', title: 'Birthday Ini!', description: 'Hari spesialmu yang ke-21!' }
];

const timelineContent = document.querySelector('.timeline-content');
if (timelineContent) {
    timelineContent.innerHTML = '';
    timelineData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.style.animationDelay = `${index * 0.1}s`;
        timelineItem.innerHTML = `
            <div class="timeline-year">${item.year}</div>
            <div class="timeline-dot"></div>
            <div class="timeline-content">
                <h4>${item.title}</h4>
                <p>${item.description}</p>
            </div>
        `;
        timelineContent.appendChild(timelineItem);
    });
}
}

function viewPhoto(index) {
// Implement photo viewer modal
showNotification('Fitur pembesaran foto akan segera hadir! 👀', 'success');
}

// Fungsi untuk halaman party.html
function setupPartyPage() {
// Load avatars
const avatars = ['😊', '😄', '🥳', '🎉', '🎂', '🎁', '✨', '❤️', '🤗', '😎'];
const avatarsGrid = document.querySelector('.avatars-grid');
if (avatarsGrid) {
    avatarsGrid.innerHTML = '';
    avatars.forEach(avatar => {
        const avatarElement = document.createElement('div');
        avatarElement.className = 'avatar';
        avatarElement.textContent = avatar;
        avatarElement.style.animationDelay = `${Math.random() * 2}s`;
        avatarsGrid.appendChild(avatarElement);
    });
}

// Setup cake cutting
const cutCakeBtn = document.getElementById('cutCakeBtn');
if (cutCakeBtn) {
    cutCakeBtn.addEventListener('click', cutVirtualCake);
}

// Setup join party button
const joinPartyBtn = document.getElementById('joinPartyBtn');
if (joinPartyBtn) {
    joinPartyBtn.addEventListener('click', joinVirtualParty);
}
}

function cutVirtualCake() {
const cake = document.querySelector('.virtual-cake-img');
const knife = document.querySelector('.knife');
const btn = document.getElementById('cutCakeBtn');

// Animation
cake.style.transform = 'scale(1.1)';
knife.style.transform = 'translateX(50px) rotate(45deg)';

// Disable button during animation
btn.disabled = true;
btn.innerHTML = '<i class="fas fa-check"></i> Kue Terpotong!';

// Confetti
createConfetti(300);

// Play sound
playSoundEffect('success');

// Show message
setTimeout(() => {
    showNotification('🎂 Kue berhasil dipotong! Selamat menikmati!', 'success');
    
    // Reset after 3 seconds
    setTimeout(() => {
        cake.style.transform = 'scale(1)';
        knife.style.transform = 'translateX(0) rotate(0deg)';
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-utensils"></i> Potong Kue Virtual!';
    }, 3000);
}, 1000);
}

function joinVirtualParty() {
const modal = document.createElement('div');
modal.className = 'party-modal';
modal.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
            <h3><i class="fas fa-video"></i> Join Virtual Party</h3>
            <button class="close-btn" onclick="this.parentElement.parentElement.remove()">&times;</button>
        </div>
        <div class="modal-body">
            <div class="party-info-card">
                <div class="info-item">
                    <i class="fas fa-link"></i>
                    <div>
                        <strong>Meeting Link:</strong>
                        <p>zoom.us/j/1234567890?pwd=EXAMPLE</p>
                    </div>
                </div>
                <div class="info-item">
                    <i class="fas fa-key"></i>
                    <div>
                        <strong>Password:</strong>
                        <p>HappyBirthday2024</p>
                    </div>
                </div>
                <div class="info-item">
                    <i class="fas fa-clock"></i>
                    <div>
                        <strong>Waktu:</strong>
                        <p>15 Desember 2024, 19:00 WIB</p>
                    </div>
                </div>
            </div>
            <div class="action-buttons">
                <button class="copy-btn" onclick="copyToClipboard('zoom.us/j/1234567890?pwd=EXAMPLE')">
                    <i class="fas fa-copy"></i> Copy Link
                </button>
                <button class="join-btn" onclick="openZoomLink()">
                    <i class="fas fa-external-link-alt"></i> Buka di Zoom
                </button>
            </div>
        </div>
    </div>
`;

document.body.appendChild(modal);

// Add modal styles
const style = document.createElement('style');
style.textContent = `
    .party-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2000;
        animation: fadeIn 0.3s ease;
    }
    .party-modal .modal-content {
        background: white;
        border-radius: 20px;
        width: 90%;
        max-width: 500px;
        animation: bounce 0.5s ease;
    }
    .party-modal .modal-header {
        padding: 20px;
        border-bottom: 2px solid #f0f0f0;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .party-modal .modal-header h3 {
        color: #ff6bcb;
    }
    .party-modal .close-btn {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
    }
    .party-modal .modal-body {
        padding: 20px;
    }
    .party-info-card {
        background: #f8f9fa;
        border-radius: 10px;
        padding: 15px;
        margin-bottom: 20px;
    }
    .info-item {
        display: flex;
        align-items: center;
        gap: 15px;
        margin-bottom: 15px;
        padding-bottom: 15px;
        border-bottom: 1px solid #e9ecef;
    }
    .info-item:last-child {
        margin-bottom: 0;
        padding-bottom: 0;
        border-bottom: none;
    }
    .info-item i {
        font-size: 1.2rem;
        color: #6bcbff;
        width: 30px;
    }
    .action-buttons {
        display: flex;
        gap: 10px;
    }
    .copy-btn, .join-btn {
        flex: 1;
        padding: 12px;
        border: none;
        border-radius: 10px;
        font-weight: 600;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }
    .copy-btn {
        background: #6bcbff;
        color: white;
    }
    .join-btn {
        background: #ff6bcb;
        color: white;
    }
`;
document.head.appendChild(style);
}

function copyToClipboard(text) {
navigator.clipboard.writeText(text).then(() => {
    showNotification('Link berhasil disalin! 📋', 'success');
});
}

function openZoomLink() {
showNotification('Membuka Zoom... (simulasi)', 'success');
// In real implementation: window.open('zoommtg://zoom.us/join?confno=1234567890');
}

// ===== PAGE SPECIFIC INITIALIZATION =====

// Check current page and run specific functions
function initPage() {
const currentPage = window.location.pathname.split('/').pop();
    
switch(currentPage) {
    case 'home.html':
        // Home page specific initialization
        break;
    case 'surprise.html':
        // Surprise page already has its own initialization
        break;
    case 'wishes.html':
        // Setup character counter
        const wishMessage = document.getElementById('wishMessage');
        if (wishMessage) {
            wishMessage.addEventListener('input', updateCharCount);
            updateCharCount();
        }
        
        // Load existing wishes
        loadWishes();
        break;
    case 'gallery.html':
        loadGalleryPhotos();
        break;
    case 'party.html':
        setupPartyPage();
        break;
}
}

// Load wishes from localStorage
function loadWishes() {
const wishesList = document.getElementById('wishesList');
const totalWishes = document.getElementById('totalWishes');
    
if (wishesList && totalWishes) {
    const wishes = JSON.parse(localStorage.getItem('birthdayWishes') || '[]');
    totalWishes.textContent = wishes.length;
    
    wishesList.innerHTML = '';
    wishes.slice(-5).reverse().forEach(wish => {
        const wishElement = document.createElement('div');
        wishElement.className = 'wish-item';
        wishElement.innerHTML = `
            <div class="wish-header">
                <div class="wisher-name">${wish.name}</div>
                <div class="wish-time">${new Date(wish.timestamp).toLocaleDateString()}</div>
            </div>
            <div class="wish-message">${wish.message}</div>
        `;
        wishesList.appendChild(wishElement);
    });
    
    if (wishes.length === 0) {
        wishesList.innerHTML = `
            <div class="no-wishes">
                <i class="fas fa-heart"></i>
                <p>Belum ada ucapan. Jadilah yang pertama!</p>
            </div>
        `;
    }
}
}

// ===== TOUCH AND GESTURE HANDLING =====

// Handle swipe gestures for page navigation
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', e => {
touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
touchEndX = e.changedTouches[0].screenX;
handleSwipe();
});

function handleSwipe() {
const swipeThreshold = 50;
const swipeDistance = touchEndX - touchStartX;

if (Math.abs(swipeDistance) > swipeThreshold) {
    if (swipeDistance > 0) {
        // Swipe right - go to previous page
        navigateToPreviousPage();
    } else {
        // Swipe left - go to next page
        navigateToNextPage();
    }
}
}

function navigateToPreviousPage() {
const pages = ['home.html', 'surprise.html', 'wishes.html', 'gallery.html', 'party.html'];
const currentPage = window.location.pathname.split('/').pop();
const currentIndex = pages.indexOf(currentPage);
    
if (currentIndex > 0) {
    goToPage(pages[currentIndex - 1]);
}
}

function navigateToNextPage() {
const pages = ['home.html', 'surprise.html', 'wishes.html', 'gallery.html', 'party.html'];
const currentPage = window.location.pathname.split('/').pop();
const currentIndex = pages.indexOf(currentPage);
    
if (currentIndex < pages.length - 1) {
    goToPage(pages[currentIndex + 1]);
}
}

// ===== INITIALIZE EVERYTHING =====

// Run when page loads
window.onload = function() {
initPage();
    
// Add loading animation to all pages
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
    
setTimeout(() => {
    document.body.style.opacity = '1';
}, 100);
    
// Add some random confetti on load
setTimeout(() => {
    createConfetti(20);
}, 1000);
};

// ===== UTILITY FUNCTIONS =====

// Debounce function for resize events
function debounce(func, wait) {
let timeout;
return function executedFunction(...args) {
    const later = () => {
        clearTimeout(timeout);
        func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
};
}

// Throttle function for scroll events
function throttle(func, limit) {
let inThrottle;
return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
    }
};
}

// Format date
function formatDate(date) {
return new Date(date).toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
}

// Get time until birthday
function getTimeUntilBirthday() {
const now = new Date();
const birthday = new Date(now.getFullYear(), 11, 15); // December 15
    
if (now > birthday) {
    birthday.setFullYear(birthday.getFullYear() + 1);
}
    
const diff = birthday - now;
const days = Math.floor(diff / (1000 * 60 * 60 * 24));
const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    
return { days, hours, minutes, seconds };
}

// Export functions for use in HTML
window.goToPage = goToPage;
window.createConfetti = createConfetti;
window.submitWish = submitWish;
window.updateCharCount = updateCharCount;
window.loadGalleryPhotos = loadGalleryPhotos;
window.viewPhoto = viewPhoto;
window.cutVirtualCake = cutVirtualCake;
window.joinVirtualParty = joinVirtualParty;
window.copyToClipboard = copyToClipboard;
window.openZoomLink = openZoomLink;
