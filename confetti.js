// Advanced Confetti System
class ConfettiSystem {
    constructor() {
        this.particles = [];
        this.canvas = document.getElementById('confetti-canvas');
        
        if (!this.canvas) {
            this.createCanvas();
        }
        
        this.ctx = this.canvas.getContext('2d');
        this.setupCanvas();
        this.animate();
    }
    
    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'confetti-canvas';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9998;
        `;
        document.body.appendChild(this.canvas);
    }
    
    setupCanvas() {
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());
    }
    
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticle(options = {}) {
        const particle = {
            x: options.x || Math.random() * this.canvas.width,
            y: options.y || -20,
            size: options.size || Math.random() * 10 + 5,
            speedX: options.speedX || Math.random() * 6 - 3,
            speedY: options.speedY || Math.random() * 3 + 2,
            color: options.color || this.getRandomColor(),
            shape: options.shape || this.getRandomShape(),
            rotation: options.rotation || Math.random() * 360,
            rotationSpeed: options.rotationSpeed || Math.random() * 10 - 5,
            gravity: options.gravity || 0.1,
            wind: options.wind || 0.05,
            opacity: options.opacity || 1,
            life: options.life || 200
        };
        
        this.particles.push(particle);
        return particle;
    }
    
    getRandomColor() {
        const colors = [
            '#ff6bcb', // Pink
            '#6bcbff', // Blue
            '#ffde59', // Yellow
            '#b56bff', // Purple
            '#5bff6b', // Green
            '#ff6b6b', // Red
            '#ff9a6b', // Orange
            '#6bffcb'  // Teal
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
    
    getRandomShape() {
        const shapes = ['circle', 'square', 'triangle', 'star'];
        return shapes[Math.floor(Math.random() * shapes.length)];
    }
    
    burst(options = {}) {
        const count = options.count || 100;
        const x = options.x || this.canvas.width / 2;
        const y = options.y || this.canvas.height / 2;
        
        for (let i = 0; i < count; i++) {
            this.createParticle({
                x: x + (Math.random() - 0.5) * 100,
                y: y + (Math.random() - 0.5) * 100,
                speedX: (Math.random() - 0.5) * 10,
                speedY: (Math.random() - 0.5) * 10,
                life: 150
            });
        }
    }
    
    shower(options = {}) {
        const count = options.count || 50;
        
        for (let i = 0; i < count; i++) {
            this.createParticle({
                x: Math.random() * this.canvas.width,
                y: -20,
                speedX: (Math.random() - 0.5) * 2,
                speedY: Math.random() * 3 + 2,
                life: 300
            });
        }
    }
    
    spiral(options = {}) {
        const centerX = options.x || this.canvas.width / 2;
        const centerY = options.y || this.canvas.height / 2;
        const count = options.count || 50;
        const radius = options.radius || 100;
        
        for (let i = 0; i < count; i++) {
            const angle = (i / count) * Math.PI * 2;
            this.createParticle({
                x: centerX + Math.cos(angle) * radius,
                y: centerY + Math.sin(angle) * radius,
                speedX: Math.cos(angle) * 2,
                speedY: Math.sin(angle) * 2,
                life: 200
            });
        }
    }
    
    heart(options = {}) {
        const centerX = options.x || this.canvas.width / 2;
        const centerY = options.y || this.canvas.height / 2;
        const count = options.count || 100;
        
        for (let i = 0; i < count; i++) {
            const t = i / count * Math.PI * 2;
            const x = 16 * Math.pow(Math.sin(t), 3);
            const y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            
            this.createParticle({
                x: centerX + x * 5,
                y: centerY + y * 5,
                speedX: (Math.random() - 0.5) * 3,
                speedY: -Math.random() * 5 - 2,
                color: '#ff6bcb',
                life: 250
            });
        }
    }
    
    updateParticles() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            // Update position
            p.x += p.speedX;
            p.y += p.speedY;
            
            // Apply forces
            p.speedY += p.gravity;
            p.speedX += p.wind;
            
            // Update rotation
            p.rotation += p.rotationSpeed;
            
            // Update life
            p.life--;
            p.opacity = p.life / 200;
            
            // Remove dead particles
            if (p.life <= 0 || p.y > this.canvas.height + 100) {
                this.particles.splice(i, 1);
            }
        }
    }
    
    drawParticles() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(p => {
            this.ctx.save();
            this.ctx.translate(p.x, p.y);
            this.ctx.rotate(p.rotation * Math.PI / 180);
            this.ctx.globalAlpha = p.opacity;
            this.ctx.fillStyle = p.color;
            
            switch(p.shape) {
                case 'circle':
                    this.ctx.beginPath();
                    this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
                    this.ctx.fill();
                    break;
                    
                case 'square':
                    this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                    break;
                    
                case 'triangle':
                    this.ctx.beginPath();
                    this.ctx.moveTo(0, -p.size / 2);
                    this.ctx.lineTo(p.size / 2, p.size / 2);
                    this.ctx.lineTo(-p.size / 2, p.size / 2);
                    this.ctx.closePath();
                    this.ctx.fill();
                    break;
                    
                case 'star':
                    this.drawStar(0, 0, p.size / 2, p.size / 4, 5);
                    this.ctx.fill();
                    break;
            }
            
            this.ctx.restore();
        });
    }
    
    drawStar(cx, cy, spikes, outerRadius, innerRadius) {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spikes;
        
        this.ctx.beginPath();
        this.ctx.moveTo(cx, cy - outerRadius);
        
        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius;
            y = cy + Math.sin(rot) * outerRadius;
            this.ctx.lineTo(x, y);
            rot += step;
            
            x = cx + Math.cos(rot) * innerRadius;
            y = cy + Math.sin(rot) * innerRadius;
            this.ctx.lineTo(x, y);
            rot += step;
        }
        
        this.ctx.lineTo(cx, cy - outerRadius);
        this.ctx.closePath();
    }
    
    animate() {
        this.updateParticles();
        this.drawParticles();
        requestAnimationFrame(() => this.animate());
    }
    
    // Public API
    static createBurst(count = 100, x, y) {
        if (!window.confettiSystem) {
            window.confettiSystem = new ConfettiSystem();
        }
        window.confettiSystem.burst({ count, x, y });
    }
    
    static createShower(count = 50) {
        if (!window.confettiSystem) {
            window.confettiSystem = new ConfettiSystem();
        }
        window.confettiSystem.shower({ count });
    }
    
    static createSpiral(count = 50, x, y) {
        if (!window.confettiSystem) {
            window.confettiSystem = new ConfettiSystem();
        }
        window.confettiSystem.spiral({ count, x, y });
    }
    
    static createHeart(count = 100, x, y) {
        if (!window.confettiSystem) {
            window.confettiSystem = new ConfettiSystem();
        }
        window.confettiSystem.heart({ count, x, y });
    }
    
    static clear() {
        if (window.confettiSystem) {
            window.confettiSystem.particles = [];
        }
    }
}

// Initialize confetti system when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.confettiSystem = new ConfettiSystem();
    });
} else {
    window.confettiSystem = new ConfettiSystem();
}

// Export to global scope
window.createConfetti = (count = 100, type = 'burst', x, y) => {
    switch(type) {
        case 'burst':
            ConfettiSystem.createBurst(count, x, y);
            break;
        case 'shower':
            ConfettiSystem.createShower(count);
            break;
        case 'spiral':
            ConfettiSystem.createSpiral(count, x, y);
            break;
        case 'heart':
            ConfettiSystem.createHeart(count, x, y);
            break;
    }
};

// Auto-create confetti on special events
document.addEventListener('click', function(e) {
    // Random chance to create confetti on click
    if (Math.random() < 0.05) {
        ConfettiSystem.createBurst(10, e.clientX, e.clientY);
    }
});
