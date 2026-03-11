/**
 * Buddy - The motivational companion
 */
const Buddy = {
  element: null,
  speechBubble: null,
  messages: {
    welcome: "Welcome buddy! Let's start our goals! 🌟",
    super: "Super! You're doing great! 🚀",
    good: "Ohh good! I've done this, you do this! 👍",
    sad: "Why buddy? What happened? Any reason? 🥺",
    encouraging: "Keep going! You're almost there! ✨",
    motivation: [
      "Small steps every day lead to big results!",
      "You've got this, buddy!",
      "Consistency is the key to success.",
      "Believe in yourself as much as I believe in you!",
    ]
  },

  init() {
    if (this.element) return;

    const container = document.createElement('div');
    container.id = 'buddy-container';
    container.innerHTML = `
      <div id="buddy-character">
        <div class="buddy-body">
          <div class="buddy-eyes">
            <div class="buddy-eye left"></div>
            <div class="buddy-eye right"></div>
          </div>
          <div class="buddy-smile"></div>
        </div>
        <div class="buddy-hands">
            <div class="buddy-hand left"></div>
            <div class="buddy-hand right"></div>
        </div>
      </div>
      <div id="buddy-bubble" class="hidden">Hello!</div>
    `;

    document.body.appendChild(container);
    this.element = document.getElementById('buddy-character');
    this.speechBubble = document.getElementById('buddy-bubble');

    this.addStyles();
    this.setupInteractions();

    // Auto-welcome if on home page
    if (window.location.pathname.includes('home.html')) {
      setTimeout(() => this.speak(this.messages.welcome), 1000);
    }
  },

  addStyles() {
    const style = document.createElement('style');
    style.innerHTML = `
      #buddy-container {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        pointer-events: none;
      }
      #buddy-character {
        width: 70px;
        height: 70px;
        background: radial-gradient(circle at 30% 30%, #FFEB3B, #F9A825);
        border-radius: 50%;
        position: relative;
        box-shadow: 0 10px 25px rgba(249, 168, 37, 0.4), inset -5px -5px 15px rgba(0,0,0,0.1);
        cursor: pointer;
        pointer-events: auto;
        animation: float 4s ease-in-out infinite;
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        border: 3px solid white;
      }
      #buddy-character:hover {
        transform: scale(1.1) rotate(5deg);
      }
      .buddy-eyes {
        position: absolute;
        top: 22px;
        left: 0;
        right: 0;
        display: flex;
        justify-content: center;
        gap: 14px;
      }
      .buddy-eye {
        width: 10px;
        height: 10px;
        background: #2c3e50;
        border-radius: 50%;
        animation: blink 5s infinite;
        position: relative;
      }
      .buddy-eye::after {
          content: "";
          position: absolute;
          top: 2px;
          left: 2px;
          width: 3px;
          height: 3px;
          background: white;
          border-radius: 50%;
      }
      .buddy-smile {
        position: absolute;
        bottom: 16px;
        left: 50%;
        transform: translateX(-50%);
        width: 24px;
        height: 12px;
        border-bottom: 4px solid #2c3e50;
        border-radius: 0 0 15px 15px;
      }
      .buddy-hand {
        position: absolute;
        width: 18px;
        height: 18px;
        background: #F9A825;
        border-radius: 50%;
        bottom: 8px;
        border: 2px solid white;
      }
      .buddy-hand.left { left: -8px; animation: wave 3s infinite ease-in-out; }
      .buddy-hand.right { right: -8px; }

      @keyframes wave {
          0%, 100% { transform: rotate(0); }
          50% { transform: translateY(-5px) rotate(-20deg); }
      }

      #buddy-bubble {
        position: absolute;
        bottom: 80px;
        right: 0;
        background: white;
        padding: 12px 18px;
        border-radius: 20px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        font-size: 14px;
        font-weight: 600;
        color: #333;
        max-width: 200px;
        min-width: 100px;
        text-align: center;
        opacity: 0;
        transform: translateY(10px);
        transition: all 0.3s ease;
        border-bottom-right-radius: 0;
      }
      #buddy-bubble.visible {
        opacity: 1;
        transform: translateY(0);
      }
      #buddy-bubble.hidden {
        display: none;
      }

      @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-10px); }
      }
      @keyframes blink {
        0%, 90%, 100% { transform: scaleY(1); }
        95% { transform: scaleY(0.1); }
      }
    `;
    document.head.appendChild(style);
  },

  setupInteractions() {
    this.element.addEventListener('click', () => {
      const randomMsg = this.messages.motivation[Math.floor(Math.random() * this.messages.motivation.length)];
      this.speak(randomMsg);
    });
  },

  speak(text, duration = 4000) {
    this.speechBubble.textContent = text;
    this.speechBubble.classList.remove('hidden');
    setTimeout(() => this.speechBubble.classList.add('visible'), 50);

    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.speechBubble.classList.remove('visible');
      setTimeout(() => this.speechBubble.classList.add('hidden'), 300);
    }, duration);
  },

  celebrate() {
    this.speak(this.messages.super);
    // Add a spin animation
    this.element.style.transition = "transform 0.5s ease";
    this.element.style.transform = "rotate(360deg) scale(1.2)";
    setTimeout(() => {
      this.element.style.transform = "rotate(0) scale(1)";
    }, 500);
  },

  askWhy() {
    this.speak(this.messages.sad);
  }
};

// Initialize on load
window.addEventListener('DOMContentLoaded', () => Buddy.init());
