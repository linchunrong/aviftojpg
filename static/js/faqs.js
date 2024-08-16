document.addEventListener('DOMContentLoaded', (event) => {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const toggle = item.querySelector('.faq-toggle');
        const answer = item.querySelector('.faq-answer');
        const verticalLine = toggle.querySelector('.vertical-line');
        
        toggle.addEventListener('click', () => {
            answer.classList.toggle('hidden');
            verticalLine.classList.toggle('hidden');
        });
    });
});