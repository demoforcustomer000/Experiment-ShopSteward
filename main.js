document.addEventListener('DOMContentLoaded', () => {
    
    // 1. FAQ Accordion Logic
    document.querySelectorAll('.q button').forEach(button => {
        button.addEventListener('click', () => {
            const parent = button.parentElement;
            parent.classList.toggle('open');
        });
    });

    // 2. Glass Card Submit Animation
    const submitBtn = document.querySelector('.submit-circle');
    const textArea = document.querySelector('.card-input-area textarea');

    if (submitBtn && textArea) {
        submitBtn.addEventListener('click', () => {
            if (textArea.value.trim() !== "") {
                submitBtn.innerHTML = '✓';
                submitBtn.style.background = 'var(--green)';
                textArea.value = '';
                
                setTimeout(() => {
                    submitBtn.innerHTML = '→';
                    submitBtn.style.background = 'rgba(255,255,255,0.15)';
                }, 2000);
            }
        });
    }

    // 3. Reveal Sections on Scroll
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
});
