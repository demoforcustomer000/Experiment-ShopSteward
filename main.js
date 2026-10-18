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

    // 3. Hero Glass Card Submit Animation
    const submitBtn = document.querySelector('.submit-circle');
    const textArea = document.querySelector('.card-input-area textarea');
    if (submitBtn && textArea) {
        submitBtn.addEventListener('click', () => {
            if (textArea.value.trim() !== "") {
                submitBtn.innerHTML = '✓';
                submitBtn.style.background = 'var(--green-btn)';
                textArea.value = '';
                setTimeout(() => {
                    submitBtn.innerHTML = '→';
                    submitBtn.style.background = 'rgba(255,255,255,0.15)';
                }, 2000);
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
