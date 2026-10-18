// Wait for the DOM to load
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Handle the Submit Arrow Button in the Glass Card
    const submitBtn = document.querySelector('.submit-circle');
    const textArea = document.querySelector('.card-input-area textarea');

    if (submitBtn && textArea) {
        submitBtn.addEventListener('click', () => {
            if (textArea.value.trim() !== "") {
                // Animate the button
                submitBtn.innerHTML = '✓';
                submitBtn.style.background = 'var(--muddy-green)';
                
                // Clear the text area
                textArea.value = '';
                
                // Reset after 2 seconds
                setTimeout(() => {
                    submitBtn.innerHTML = '→';
                    submitBtn.style.background = 'rgba(255,255,255,0.2)';
                }, 2000);
            } else {
                // Shake the input if empty
                textArea.style.transform = 'translateX(-5px)';
                setTimeout(() => textArea.style.transform = 'translateX(5px)', 100);
                setTimeout(() => textArea.style.transform = 'translateX(0)', 200);
            }
        });
    }

    // 2. Smooth Scrolling for Nav Links
    document.querySelectorAll('.nav-links a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
