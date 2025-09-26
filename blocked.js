// Cyber Guardian blocked page functionality
console.log('🚀 Cyber Guardian blocked page script loaded');

// Create animated particles (simplified)
function createParticles() {
  try {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 15;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.width = Math.random() * 4 + 2 + 'px';
      particle.style.height = particle.style.width;
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 6 + 's';
      particle.style.animationDuration = (Math.random() * 4 + 4) + 's';
      particlesContainer.appendChild(particle);
    }
  } catch (err) {
    console.log('Particles creation failed:', err);
  }
}

// Create matrix rain effect (simplified)
function createMatrix() {
  try {
    const matrixContainer = document.getElementById('matrix');
    if (!matrixContainer) return;
    
    const characters = '01010110';
    const columnCount = Math.min(Math.floor(window.innerWidth / 20), 30);
    
    for (let i = 0; i < columnCount; i++) {
      const column = document.createElement('div');
      column.className = 'matrix-column';
      column.style.left = i * 20 + 'px';
      column.style.animationDelay = Math.random() * 8 + 's';
      column.style.animationDuration = (Math.random() * 4 + 6) + 's';
      
      let text = '';
      for (let j = 0; j < 30; j++) {
        text += characters[Math.floor(Math.random() * characters.length)] + '<br>';
      }
      column.innerHTML = text;
      matrixContainer.appendChild(column);
    }
  } catch (err) {
    console.log('Matrix creation failed:', err);
  }
}

// Simple button handlers that definitely work
function setupButtons() {
  console.log('Setting up buttons...');
  
  // Settings button - try chrome.runtime first, then fallback to alert
  const settingsBtn = document.getElementById('openOptions');
  if (settingsBtn) {
    settingsBtn.onclick = function() {
      console.log('Settings button clicked');
      
      // Try to open extension options page
      try {
        if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.openOptionsPage) {
          chrome.runtime.openOptionsPage();
          return;
        }
      } catch (err) {
        console.log('Chrome API not available, showing manual instructions');
      }
      
      // Fallback to manual instructions
      alert('🛠️ To access settings:\n\n1. Click the extension icon in Chrome toolbar\n2. Click "Open Full Settings"\n\nOR\n\n1. Go to chrome://extensions/\n2. Find "Cyber Guardian"\n3. Click "Details" then "Extension options"');
    };
    console.log('Settings button configured');
  }
  
  // Back button - simple onclick
  const backBtn = document.getElementById('goBack');
  if (backBtn) {
    backBtn.onclick = function() {
      console.log('Back button clicked');
      try {
        if (window.history.length > 1) {
          window.history.back();
        } else {
          window.location.href = 'https://www.google.com';
        }
      } catch (err) {
        console.log('Navigation failed, going to Google');
        window.location.href = 'https://www.google.com';
      }
    };
    console.log('Back button configured');
  }
  

}

// Add simple visual feedback
function addVisualFeedback() {
  try {
    document.querySelectorAll('.cyber-button').forEach(button => {
      button.addEventListener('mousedown', function() {
        this.style.transform = 'scale(0.95)';
      });
      button.addEventListener('mouseup', function() {
        this.style.transform = '';
      });
    });
  } catch (err) {
    console.log('Visual feedback setup failed:', err);
  }
}

// Initialize everything
function initAll() {
  console.log('🎯 Initializing Cyber Guardian blocked page...');
  
  // Setup buttons first (most important)
  setupButtons();
  
  // Add visual effects
  createParticles();
  createMatrix();
  addVisualFeedback();
  
  console.log('✅ Cyber Guardian blocked page ready!');
}

// Start when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}

// Debug info
console.log('🚀 Cyber Guardian blocked page script loaded successfully!');
console.log('Page URL:', window.location.href);

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', (e) => {
  konamiCode.push(e.code);
  if (konamiCode.length > konamiSequence.length) {
    konamiCode.shift();
  }
  
  if (JSON.stringify(konamiCode) === JSON.stringify(konamiSequence)) {
    document.body.style.filter = 'hue-rotate(180deg)';
    setTimeout(() => {
      document.body.style.filter = '';
    }, 3000);
  }
});