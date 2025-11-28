// Animated Spinning Dishes with Hover Effect
document.addEventListener('DOMContentLoaded', function() {
    const dishCards = document.querySelectorAll('.dish-card');
    
    dishCards.forEach(card => {
        const spinner = card.querySelector('.dish-spinner');
        if (!spinner) return;
        
        // Pause animation on hover
        card.addEventListener('mouseenter', () => {
            spinner.style.animationPlayState = 'paused';
        });
        
        // Resume animation on mouse leave
        card.addEventListener('mouseleave', () => {
            spinner.style.animationPlayState = 'running';
        });
        
        // Click to flip
        card.addEventListener('click', (e) => {
            // Don't trigger if clicking on the link
            if (e.target.classList.contains('dish-link') || e.target.closest('.dish-link')) {
                return;
            }
            
            spinner.style.transform = spinner.style.transform === 'rotateY(180deg)' ? 'rotateY(0deg)' : 'rotateY(180deg)';
        });
    });
});
