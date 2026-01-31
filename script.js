// Data
let linksData = [
    { id: 1, icon: 'fab fa-instagram', url: 'https://instagram.com', text: 'Instagram' },
    { id: 2, icon: 'fab fa-youtube', url: 'https://youtube.com', text: 'YouTube' },
    { id: 3, icon: 'fab fa-tiktok', url: 'https://tiktok.com', text: 'TikTok' },
    { id: 4, icon: 'fab fa-github', url: 'https://github.com', text: 'GitHub' },
    { id: 5, icon: 'fas fa-envelope', url: 'mailto:example@email.com', text: 'Email' }
];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    renderLinks();
    setupEventListeners();
    updatePreview();
    updateExportCode();
});

// Tabs
function initializeTabs() {
    document.querySelectorAll('.nav-link').forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const tabId = this.dataset.tab;
            
            document.querySelectorAll('.nav-link').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });
}

// Render Links
function renderLinks() {
    const container = document.getElementById('linksContainer');
    container.innerHTML = '';
    
    linksData.forEach((link, index) => {
        const linkEl = document.createElement('div');
        linkEl.className = 'link-item';
        linkEl.innerHTML = `
            <select class="link-icon-select" onchange="updateLink(${link.id}, 'icon', this.value)">
                <option value="fab fa-instagram" ${link.icon === 'fab fa-instagram' ? 'selected' : ''}>Instagram</option>
                <option value="fab fa-youtube" ${link.icon === 'fab fa-youtube' ? 'selected' : ''}>YouTube</option>
                <option value="fab fa-tiktok" ${link.icon === 'fab fa-tiktok' ? 'selected' : ''}>TikTok</option>
                <option value="fab fa-twitter" ${link.icon === 'fab fa-twitter' ? 'selected' : ''}>Twitter</option>
                <option value="fab fa-github" ${link.icon === 'fab fa-github' ? 'selected' : ''}>GitHub</option>
                <option value="fas fa-envelope" ${link.icon === 'fas fa-envelope' ? 'selected' : ''}>Email</option>
                <option value="fas fa-globe" ${link.icon === 'fas fa-globe' ? 'selected' : ''}>Website</option>
            </select>
            <input type="text" class="link-url-input" value="${link.url}" 
                   placeholder="URL" 
                   oninput="updateLink(${link.id}, 'url', this.value)">
            <input type="text" class="link-text-input" value="${link.text}" 
                   placeholder="Text" 
                   oninput="updateLink(${link.id}, 'text', this.value)"
                   style="flex: 1; padding: 10px; background: var(--background); border: 1px solid var(--border); border-radius: 8px; color: var(--text);">
            <button class="btn-icon" onclick="removeLink(${link.id})">
                <i class="fas fa-trash"></i>
            </button>
        `;
        container.appendChild(linkEl);
    });
}

// Event Listeners
function setupEventListeners() {
    // Avatar Upload
    document.getElementById('avatarUpload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(event) {
                document.getElementById('avatarPreview').innerHTML = `<img src="${event.target.result}" alt="Avatar">`;
                updatePreview();
                updateExportCode();
            };
            reader.readAsDataURL(file);
        }
    });
    
    // Input Changes
    ['nameInput', 'taglineInput', 'bioInput', 'footerInput'].forEach(id => {
        document.getElementById(id).addEventListener('input', () => {
            updatePreview();
            updateExportCode();
        });
    });
    
    // Color Changes
    ['primaryColor', 'backgroundColor', 'textColor'].forEach(id => {
        document.getElementById(id).addEventListener('input', updateColors);
    });
    
    // VIP Mode
    document.getElementById('vipMode').addEventListener('click', toggleVIPMode);
}

// Update Link
function updateLink(id, field, value) {
    const link = linksData.find(l => l.id === id);
    if (link) {
        link[field] = value;
        updatePreview();
        updateExportCode();
    }
}

// Add Link
function addNewLink() {
    const newId = linksData.length > 0 ? Math.max(...linksData.map(l => l.id)) + 1 : 1;
    linksData.push({
        id: newId,
        icon: 'fas fa-link',
        url: 'https://example.com',
        text: 'New Link'
    });
    renderLinks();
    updatePreview();
    updateExportCode();
}

// Remove Link
function removeLink(id) {
    linksData = linksData.filter(link => link.id !== id);
    renderLinks();
    updatePreview();
    updateExportCode();
}

// Update Preview
function updatePreview() {
    const preview = document.getElementById('linktreePreview');
    if (!preview) return;
    
    const name = document.getElementById('nameInput').value || 'Rizada Amore';
    const tagline = document.getElementById('taglineInput').value || 'Digital Creator | Content Strategist';
    const bio = document.getElementById('bioInput').value || 'welcome!! This Developer Rizada Amore';
    const footer = document.getElementById('footerInput').value || 'Made with ❤️ using LinkCraft';
    
    // Avatar
    const avatarImg = document.querySelector('#avatarPreview img');
    const avatarHTML = avatarImg ? 
        `<img src="${avatarImg.src}" alt="${name}">` : 
        '<i class="fas fa-user-circle"></i>';
    
    // Links
    let linksHTML = '';
    linksData.forEach(link => {
        linksHTML += `
            <a href="${link.url}" class="linktree-link" target="_blank">
                <div class="link-icon">
                    <i class="${link.icon}"></i>
                </div>
                <div class="link-text">${link.text}</div>
                <div class="link-arrow">
                    <i class="fas fa-arrow-right"></i>
                </div>
            </a>
        `;
    });
    
    // Render
    preview.innerHTML = `
        <div class="linktree-avatar">
            ${avatarHTML}
        </div>
        <h1 class="linktree-name">${name}</h1>
        <p class="linktree-tagline">${tagline}</p>
        <p class="linktree-bio">${bio}</p>
        <div class="linktree-links">
            ${linksHTML}
        </div>
        <div class="linktree-footer">
            ${footer}
        </div>
    `;
    
    // Update full preview
    const fullPreview = document.getElementById('fullPreview');
    if (fullPreview) {
        fullPreview.innerHTML = `
            <div class="linktree-preview" style="height: 100%;">
                ${preview.innerHTML}
            </div>
        `;
    }
}

// Update Colors
function updateColors() {
    const primary = document.getElementById('primaryColor').value;
    const background = document.getElementById('backgroundColor').value;
    const text = document.getElementById('textColor').value;
    
    document.documentElement.style.setProperty('--primary', primary);
    document.documentElement.style.setProperty('--background', background);
    document.documentElement.style.setProperty('--text', text);
    
    updatePreview();
    updateExportCode();
}

// Apply Theme
function applyTheme(theme) {
    document.querySelectorAll('.preset').forEach(p => p.classList.remove('active'));
    event.target.classList.add('active');
    
    const themes = {
        dark: { primary: '#6366f1', background: '#0f172a', text: '#f1f5f9' },
        neon: { primary: '#00ff88', background: '#0f0c29', text: '#ffffff' },
        gradient: { primary: '#667eea', background: '#667eea', text: '#ffffff' },
        light: { primary: '#3b82f6', background: '#ffffff', text: '#1f2937' }
    };
    
    const t = themes[theme];
    document.documentElement.style.setProperty('--primary', t.primary);
    document.documentElement.style.setProperty('--background', t.background);
    document.documentElement.style.setProperty('--text', t.text);
    
    document.getElementById('primaryColor').value = t.primary;
    document.getElementById('backgroundColor').value = t.background;
    document.getElementById('textColor').value = t.text;
    
    updatePreview();
    updateExportCode();
}

// Generate Export HTML
function generateExportHTML() {
    const name = document.getElementById('nameInput').value || 'Rizada Amore';
    const tagline = document.getElementById('taglineInput').value || 'Digital Creator | Content Strategist';
    const bio = document.getElementById('bioInput').value || 'welcome!! This Developer Rizada Amore';
    const footer = document.getElementById('footerInput').value || 'Made with ❤️ using LinkCraft';
    const primary = document.getElementById('primaryColor').value;
    const background = document.getElementById('backgroundColor').value;
    const text = document.getElementById('textColor').value;
    
    const avatarImg = document.querySelector('#avatarPreview img');
    const avatarHTML = avatarImg ? 
        `<img src="${avatarImg.src}" alt="${name}">` : 
        '<i class="fas fa-user-circle"></i>';
    
    let linksHTML = '';
    linksData.forEach(link => {
        linksHTML += `
        <a href="${link.url}" class="linktree-link" target="_blank">
            <div class="link-icon">
                <i class="${link.icon}"></i>
            </div>
            <div class="link-text">${link.text}</div>
            <div class="link-arrow">
                <i class="fas fa-arrow-right"></i>
            </div>
        </a>`;
    });
    
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${name} | Linktree</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: ${background};
            color: ${text};
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px;
        }
        
        .linktree-container {
            width: 100%;
            max-width: 500px;
            text-align: center;
            padding: 40px 20px;
        }
        
        .linktree-avatar {
            width: 120px;
            height: 120px;
            border-radius: 50%;
            margin: 0 auto 25px;
            border: 4px solid ${primary};
            overflow: hidden;
            background: linear-gradient(135deg, ${primary}, #a855f7);
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 3.5rem;
            color: white;
        }
        
        .linktree-avatar img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        
        .linktree-name {
            font-size: 2.2rem;
            font-weight: 700;
            margin-bottom: 10px;
        }
        
        .linktree-tagline {
            color: ${primary};
            font-size: 1.1rem;
            margin-bottom: 15px;
            font-weight: 500;
        }
        
        .linktree-bio {
            margin-bottom: 30px;
            line-height: 1.6;
            opacity: 0.8;
        }
        
        .linktree-links {
            display: flex;
            flex-direction: column;
            gap: 15px;
            margin-bottom: 30px;
        }
        
        .linktree-link {
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 18px 25px;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 12px;
            text-decoration: none;
            color: ${text};
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .linktree-link:hover {
            background: ${primary};
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .link-icon {
            font-size: 1.3rem;
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
        }
        
        .link-text {
            flex: 1;
            font-weight: 500;
            text-align: left;
        }
        
        .link-arrow {
            opacity: 0.7;
        }
        
        .linktree-footer {
            opacity: 0.7;
            font-size: 0.9rem;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        @media (max-width: 480px) {
            .linktree-container {
                padding: 20px 15px;
            }
            
            .linktree-name {
                font-size: 1.8rem;
            }
            
            .linktree-link {
                padding: 15px 20px;
            }
        }
    </style>
</head>
<body>
    <div class="linktree-container">
        <div class="linktree-avatar">
            ${avatarHTML}
        </div>
        <h1 class="linktree-name">${name}</h1>
        <p class="linktree-tagline">${tagline}</p>
        <p class="linktree-bio">${bio}</p>
        <div class="linktree-links">
            ${linksHTML}
        </div>
        <div class="linktree-footer">
            ${footer}
        </div>
    </div>
</body>
</html>`;
}

// Update Export Code
function updateExportCode() {
    const codePreview = document.getElementById('codePreview');
    if (codePreview) {
        const html = generateExportHTML();
        codePreview.textContent = html;
        if (window.Prism) {
            Prism.highlightAll();
        }
    }
}

// Export as HTML
function exportAsHTML() {
    const html = generateExportHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `linktree-${document.getElementById('nameInput').value || 'profile'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert('HTML file downloaded successfully!');
}

// Copy Code
function copyCode() {
    const html = generateExportHTML();
    navigator.clipboard.writeText(html).then(() => {
        alert('Code copied to clipboard!');
    });
}

// Utility Functions
function generateRandomAvatar() {
    const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#10b981', '#f59e0b'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const avatar = document.getElementById('avatarPreview');
    avatar.style.background = `linear-gradient(135deg, ${randomColor}, ${randomColor}dd)`;
    avatar.innerHTML = '<i class="fas fa-user-astronaut"></i>';
    updatePreview();
    updateExportCode();
}

function refreshPreview() {
    updatePreview();
}

function toggleVIPMode() {
    const btn = document.getElementById('vipMode');
    const isVIP = btn.textContent.includes('ACTIVE');
    
    if (isVIP) {
        btn.innerHTML = '<i class="fas fa-crown"></i> VIP Mode';
        btn.style.background = 'linear-gradient(135deg, #f59e0b, #d97706)';
    } else {
        btn.innerHTML = '<i class="fas fa-crown"></i> VIP ACTIVE';
        btn.style.background = 'linear-gradient(135deg, #f59e0b, #d97706, #b45309)';
        alert('VIP Mode Activated! Premium features unlocked!');
    }
}
