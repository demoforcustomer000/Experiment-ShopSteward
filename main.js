document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FAQ Accordion
    document.querySelectorAll('.q button').forEach(button => {
        button.addEventListener('click', () => {
            const parent = button.parentElement;
            parent.classList.toggle('open');
        });
    });

    // 2. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // CRITICAL FIX: Remove transform after animation so it doesn't trap the card in a CSS stacking context
                setTimeout(() => {
                    entry.target.style.transform = 'none';
                }, 850); 

                revealObserver.unobserve(entry.target); 
            }
        });
    }, { threshold: 0.15 });

    revealElements.forEach(el => revealObserver.observe(el));

        // 3. Hero Glass Card WhatsApp Integration
    const submitBtn = document.getElementById('whatsappBtn');
    const textArea = document.getElementById('aiPrompt');
    
    if (submitBtn && textArea) {
        submitBtn.addEventListener('click', () => {
            const userThoughts = textArea.value.trim();
            
            if (userThoughts !== "") {
                // Encode the text so it can be safely put in a URL
                const encodedText = encodeURIComponent(`Hi ShopSteward, here are my thoughts for my shop plan:\n\n"${userThoughts}"`);
                const whatsappUrl = `https://wa.me/918637560557?text=${encodedText}`;
                
                // Visual feedback
                submitBtn.innerHTML = '✓';
                submitBtn.style.background = 'var(--green-btn)';
                
                // Redirect to WhatsApp after a tiny delay
                setTimeout(() => {
                    window.open(whatsappUrl, '_blank');
                    
                    // Reset button and text area
                    textArea.value = '';
                    submitBtn.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>`;
                    submitBtn.style.background = 'rgba(255,255,255,0.15)';
                }, 800);
            } else {
                // Shake the input if empty
                textArea.style.transform = 'translateX(-5px)';
                textArea.style.borderColor = '#ef4444';
                setTimeout(() => textArea.style.transform = 'translateX(5px)', 100);
                setTimeout(() => textArea.style.transform = 'translateX(0)', 200);
                setTimeout(() => textArea.style.borderColor = 'rgba(255,255,255,0.1)', 1000);
            }
        });
    }

    // 4. Number Spinner Animation
    const spinTargets = document.querySelectorAll('.spin-target');
    const spinObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                let current = 0;
                const duration = 1500;
                const stepTime = 30;
                const steps = duration / stepTime;
                const increment = target / steps;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        el.textContent = target;
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(current);
                    }
                }, stepTime);
                
                spinObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    spinTargets.forEach(el => spinObserver.observe(el));
    
    // 5. Copy credentials helper
    window.copyText = async function(id, btn) {
        const text = document.getElementById(id).textContent;
        try {
            await navigator.clipboard.writeText(text);
            const originalText = btn.textContent;
            btn.textContent = 'COPIED ✓';
            setTimeout(() => btn.textContent = originalText, 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };
});

// 6. Modal Logic
window.openModal = function(id) {
    const modalId = id === 'terms' ? 'termsModal' : (id === 'privacy' ? 'privacyModal' : 'refundModal');
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

window.openDomainModal = function(name, price) {
    const modal = document.getElementById('domainModal');
    document.getElementById('modalDomainName').textContent = name;
    document.getElementById('modalDomainPrice').textContent = price;
    
    const waText = encodeURIComponent(`Hi, I want to order the ${name} for my shop. The price is ${price}. Please assist me with the setup.`);
    document.getElementById('modalWhatsappBtn').href = `https://wa.me/918637560557?text=${waText}`;
    
    const mailSubject = encodeURIComponent(`Domain Order: ${name}`);
    const mailBody = encodeURIComponent(`Hi ShopSteward,\n\nI am interested in ordering the ${name} for my shop.\nDetails: ${price}\n\nPlease share the next steps.`);
    modal.querySelector('.btn-secondary').href = `mailto:shopsteward.in@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close modal on outside click
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.classList.remove('active');
        document.body.style.overflow = '';
    }
});
// ================= AI GUIDE BOT LOGIC =================
document.addEventListener('DOMContentLoaded', () => {
  const aiBot = document.getElementById('ai-guide-bot');
  const aiChatText = document.getElementById('aiChatText');

  // Debugging check
  if (!aiBot) {
    console.error("AI Bot HTML not found! Make sure the HTML block is in index.html");
    return;
  }

  // Check if user already dismissed it
  if (!localStorage.getItem('shopsteward_ai_dismissed')) {
    
    // 1. Show the chat bubble after 2 seconds
    setTimeout(() => {
      aiBot.classList.add('show-chat');
      console.log("AI Bot activated and chat shown.");
    }, 2000);

    // 2. Define the scroll zones (Make sure your HTML has these IDs!)
    const zones = [
      { 
        id: 'top', 
        message: 'Welcome to ShopSteward! Scroll down to see how we can help your shop.', 
        bottom: '100px', 
        right: '30px', 
        handClass: '' 
      },
      { 
        id: 'features', 
        message: 'Generic software doesn\'t fit your shop. We build it around YOUR rules.', 
        bottom: '200px', 
        left: '30px', 
        right: 'auto', 
        handClass: 'point-right' 
      },
      { 
        id: 'demo', 
        message: 'Try the actual app! No install required. Just click to open.', 
        bottom: '150px', 
        left: 'auto', 
        right: '30px', 
        handClass: 'point-left' 
      },
      { 
        id: 'pricing', 
        message: 'Simple, honest pricing. No hidden charges. Pick a plan that fits.', 
        bottom: '100px', 
        left: '30px', 
        right: 'auto', 
        handClass: 'point-right' 
      },
      { 
        id: 'contact', 
        message: 'Ready to start? Message me directly on WhatsApp. I reply fast!', 
        bottom: '150px', 
        left: 'auto', 
        right: '30px', 
        handClass: 'point-down' 
      }
    ];

    let currentZone = '';

    // 3. Setup the Intersection Observer
    const observerOptions = { threshold: 0.3 };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Find which zone matches the section currently on screen
          const zone = zones.find(z => z.id === entry.target.id || (z.id === 'top' && entry.target.tagName === 'SECTION' && !entry.target.id));
          
          if (zone && currentZone !== zone.id) {
            currentZone = zone.id;
            
            // Update Text
            aiChatText.textContent = zone.message;
            
            // Move Bot
            aiBot.style.bottom = zone.bottom;
            aiBot.style.left = zone.left || 'auto';
            aiBot.style.right = zone.right || 'auto';
            
            // Update Hand Direction
            aiBot.className = 'ai-guide-bot show-chat ' + zone.handClass;
            
            console.log("Bot moved to zone:", zone.id);
          }
        }
      });
    }, observerOptions);

    // 4. Observe sections (Make sure these IDs exist in your index.html)
    document.querySelectorAll('section, .nipe-strip, .steward-block').forEach(el => {
      observer.observe(el);
    });

  } else {
    // Hide the bot entirely if already dismissed in past
    aiBot.style.display = 'none';
  }
});

// 5. Dismiss Function (Attached to window so the inline onclick works)
window.dismissAIBot = function() {
  const aiBot = document.getElementById('ai-guide-bot');
  if (aiBot) {
    aiBot.style.display = 'none';
    localStorage.setItem('shopsteward_ai_dismissed', 'true');
  }
}
document.addEventListener('DOMContentLoaded', function() {
  var botWrapper = document.getElementById('bot-wrapper');
  var bot = document.getElementById('bot');
  var panel = document.getElementById('panel');
  var messages = document.getElementById('messages');
  var typingIndicator = document.getElementById('typing-indicator');
  var q = document.getElementById('q');

  if (!botWrapper) return; 

  // --- DRAG + TAP DETECTION ---
  var isDragging = false;
  var dragStartX = 0, dragStartY = 0;
  var startLeft = 0, startTop = 0;
  var hasMoved = false;
  var DRAG_THRESHOLD = 8;

  (function initPosition() {
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem('kb_bot_pos')); } catch(e) {}
    if (saved && typeof saved.left === 'number' && typeof saved.top === 'number') {
      var maxL = window.innerWidth - 70;
      var maxT = window.innerHeight - 70;
      botWrapper.style.left = Math.max(0, Math.min(maxL, saved.left)) + 'px';
      botWrapper.style.top = Math.max(0, Math.min(maxT, saved.top)) + 'px';
      botWrapper.style.right = 'auto';
      botWrapper.style.bottom = 'auto';
    } else {
      botWrapper.style.left = '30px';
      botWrapper.style.bottom = '30px';
      botWrapper.style.right = 'auto';
      botWrapper.style.top = 'auto';
    }
  })();

  function getPoint(e) {
    if (e.touches && e.touches.length) return { x: e.touches[0].clientX, y: e.touches[0].clientY };
    if (e.changedTouches && e.changedTouches.length) return { x: e.changedTouches[0].clientX, y: e.changedTouches[0].clientY };
    return { x: e.clientX, y: e.clientY };
  }

  function onDragStart(e) {
    if (isDragging || panel.contains(e.target)) return;
    var p = getPoint(e);
    dragStartX = p.x; dragStartY = p.y;
    var rect = botWrapper.getBoundingClientRect();
    startLeft = rect.left; startTop = rect.top;
    isDragging = true; hasMoved = false;

    document.addEventListener('pointermove', onDragMove, { passive: false });
    document.addEventListener('pointerup', onDragEnd);
    document.addEventListener('touchmove', onDragMove, { passive: false });
    document.addEventListener('touchend', onDragEnd);
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', onDragEnd);
  }

  function onDragMove(e) {
    if (!isDragging) return;
    var p = getPoint(e);
    var dx = p.x - dragStartX;
    var dy = p.y - dragStartY;

    if (!hasMoved && (Math.abs(dx) > DRAG_THRESHOLD || Math.abs(dy) > DRAG_THRESHOLD)) {
      hasMoved = true;
      botWrapper.classList.add('dragging');
    }
    if (!hasMoved) return;
    if (e.cancelable) e.preventDefault();

    var newLeft = startLeft + dx;
    var newTop = startTop + dy;
    var maxL = window.innerWidth - 70;
    var maxT = window.innerHeight - 70;

    botWrapper.style.left = Math.max(0, Math.min(maxL, newLeft)) + 'px';
    botWrapper.style.top = Math.max(0, Math.min(maxT, newTop)) + 'px';
    botWrapper.style.right = 'auto';
    botWrapper.style.bottom = 'auto';

    if (panel.classList.contains('open')) positionPanel();
  }

  function onDragEnd(e) {
    if (!isDragging) return;
    isDragging = false;
    botWrapper.classList.remove('dragging');

    document.removeEventListener('pointermove', onDragMove);
    document.removeEventListener('pointerup', onDragEnd);
    document.removeEventListener('touchmove', onDragMove);
    document.removeEventListener('touchend', onDragEnd);
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', onDragEnd);

    if (hasMoved) {
      var rect = botWrapper.getBoundingClientRect();
      try { localStorage.setItem('kb_bot_pos', JSON.stringify({ left: rect.left, top: rect.top })); } catch(err) {}
    } else {
      kbToggle();
    }
    hasMoved = false;
  }

  botWrapper.addEventListener('pointerdown', onDragStart);
  botWrapper.addEventListener('touchstart', onDragStart, { passive: true });
  botWrapper.addEventListener('mousedown', onDragStart);

  // --- PANEL POSITIONING ---
  function positionPanel() {
    var rect = botWrapper.getBoundingClientRect();
    var panelW = 320;
    var panelH = Math.min(400, window.innerHeight * 0.6);
    var margin = 20;

    var panelLeft = rect.left + 35;
    var panelTop = rect.top - panelH - margin;

    if (panelTop < margin) panelTop = rect.bottom + margin;
    if (panelLeft + panelW > window.innerWidth - margin) panelLeft = window.innerWidth - panelW - margin;
    if (panelTop + panelH > window.innerHeight - margin) panelTop = window.innerHeight - panelH - margin;
    if (panelLeft < margin) panelLeft = margin;

    panel.style.left = panelLeft + 'px';
    panel.style.top = panelTop + 'px';
    panel.style.right = 'auto';
    panel.style.bottom = 'auto';

    var originX = (rect.left + 35) - panelLeft;
    var originY = (rect.top + 35) - panelTop;
    panel.style.transformOrigin = originX + 'px ' + originY + 'px';
  }

  window.addEventListener('resize', function() {
    if (panel.classList.contains('open')) positionPanel();
  });

  // --- EMOTION CONTROLLER ---
  var emotionTimer = null;
  function setEmotion(name, duration) {
    if (duration === undefined) duration = 0;
    bot.className = '';
    if (name) bot.classList.add(name);
    if (emotionTimer) clearTimeout(emotionTimer);
    if (duration > 0) {
      emotionTimer = setTimeout(function() { bot.classList.remove(name); idleLoop(); }, duration);
    }
  }

  var idleTimer;
  function idleLoop() {
    clearTimeout(idleTimer);
    var wait = 2000 + Math.random() * 4000;
    idleTimer = setTimeout(function() {
      if (Math.random() < 0.5) blink();
      idleLoop();
    }, wait);
  }

  function blink() {
    if (bot.classList.contains('thinking') || bot.classList.contains('searching') || bot.classList.contains('happy')) return;
    setEmotion('blink', 150);
  }

  setInterval(function() {
    if (!bot.classList.contains('thinking') && !bot.classList.contains('searching') && !bot.classList.contains('blink')) blink();
  }, 3500);

  idleLoop();

  // --- EMOTION DETECTION ---
  function detectEmotion(text) {
    var t = text.toLowerCase();
    if (/\b(due|dues|unpaid|pending|overdue|owe|owed|debt|late|remaining|left|baki|bakaya|udhaar)\b/.test(t)) return { during: 'searching', after: 'sad' };
    if (/\b(hi|hello|hey|namaste|greetings|morning|evening)\b/.test(t)) return { during: 'listening', after: 'happy' };
    if (/\b(problem|error|issue|broken|wrong|fail|not working|stuck)\b/.test(t)) return { during: 'thinking', after: 'confused' };
    if (/\b(find|search|show|list|where|which|who|look up|display|tell me|dekhao|koto|kitna)\b/.test(t)) return { during: 'searching', after: 'happy' };
    if (/\b(sale|sales|sold|sell|profit|revenue|earned|income|money|cash|today|aaj|becha)\b/.test(t)) return { during: 'thinking', after: 'happy' };
    return { during: 'thinking', after: 'happy' };
  }

  // --- BOUNCE & TOGGLE ---
  function triggerBounce() {
    botWrapper.classList.remove('bounce');
    void botWrapper.offsetWidth;
    botWrapper.classList.add('bounce');
    setTimeout(function() { botWrapper.classList.remove('bounce'); }, 750);
  }

  function kbToggle() {
    var isOpening = !panel.classList.contains('open');
    if (isOpening) positionPanel();
    panel.classList.toggle('open');
    triggerBounce();
    if (isOpening) { setEmotion('listening', 800); }
  }

  // --- THINKING ANIMATION ---
  var thinkInterval = null;
  function startThinking(mode) {
    clearInterval(thinkInterval);
    if (mode === 'searching') {
      setEmotion('searching');
      thinkInterval = setInterval(function() { bot.classList.toggle('searching'); }, 500);
    } else if (mode === 'listening') {
      setEmotion('listening');
    } else {
      setEmotion('thinking');
      thinkInterval = setInterval(function() { bot.classList.toggle('searching'); }, 700);
    }
  }
  function stopThinking() {
    clearInterval(thinkInterval);
    bot.classList.remove('thinking', 'searching', 'listening');
  }

  function addMsg(text, type) {
    var d = document.createElement('div');
    d.className = 'msg ' + type;
    d.textContent = text;
    messages.appendChild(d);
    messages.scrollTop = messages.scrollHeight;
  }

  // --- SIMULATED AI RESPONSE (No Supabase) ---
  var isSending = false;
  window.kbSend = function(e) {
    if (e) { e.preventDefault(); e.stopPropagation(); }
    if (isSending) return;
    isSending = true;
    setTimeout(function() { isSending = false; }, 500);

    var text = q.value.trim();
    if (!text) return;

    addMsg(text, 'user');
    q.value = '';

    var emotion = detectEmotion(text);
    typingIndicator.style.display = 'flex';
    startThinking(emotion.during);

    // Simulate network delay
    setTimeout(function() {
      typingIndicator.style.display = 'none';
      stopThinking();
      setEmotion(emotion.after, 1800);
      
      // The mock response
      var mockResponse = "This is a demo response. To get real AI answers about your shop data, you need to connect the backend database.";
      
      // Add dynamic flavor based on the user's question
      if (emotion.after === 'sad') {
        mockResponse = "I see you are asking about pending dues. In the live version, I would pull exactly who owes you money from your database.";
      } else if (emotion.after === 'happy' && text.toLowerCase().includes('sale')) {
        mockResponse = "Your sales data looks great! In the live version, I would calculate your exact profit margins here.";
      }

      addMsg(mockResponse, 'bot');
      
      setEmotion('speaking', 900);
      setTimeout(idleLoop, 1000);
    }, 1500); // 1.5 second fake delay
  };

  q.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { e.preventDefault(); window.kbSend(e); }
  });
});
