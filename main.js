document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FAQ Accordion
    document.querySelectorAll('.q button').forEach(button => {
        button.addEventListener('click', () => {
            const parent = button.parentElement;
            parent.classList.toggle('open');
        });
    });

    // 2. Hero Glass Card Submit Animation
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

    // 3. Scroll Reveal Animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });

    // 4. Number Spinner Animation (Counter)
    const spinTargets = document.querySelectorAll('.spin-target');
    const spinObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.dataset.target);
                let current = 0;
                const duration = 1500; // ms
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
    
    // Copy credentials helper
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

// 5. Modal Logic
window.openModal = function(id) {
    const modalId = id === 'terms' ? 'termsModal' : (id === 'privacy' ? 'privacyModal' : 'refundModal');
    const modal = document.getElementById(modalId);
    if(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

window.closeModal = function(id) {
    const modal = document.getElementById(id);
    if(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }
}

// 6. Domain Modal Logic
window.openDomainModal = function(name, price) {
    const modal = document.getElementById('domainModal');
    document.getElementById('modalDomainName').textContent = name;
    document.getElementById('modalDomainPrice').textContent = price;
    
    // Generate WhatsApp link dynamically
    const waText = encodeURIComponent(`Hi, I want to order the ${name} for my shop. The price is ${price}. Please assist me with the setup.`);
    document.getElementById('modalWhatsappBtn').href = `https://wa.me/918637560557?text=${waText}`;
    
    // Generate Email link dynamically
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
