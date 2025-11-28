// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all elements with fade-in class
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Add stagger effect to elements
const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach((element, index) => {
    element.style.animationDelay = `${index * 0.15}s`;
});

// Quiz functionality
let quizScore = 0;
let currentQuestion = 0;

const quizQuestions = [
    {
        question: "Which traditional British dish is often called 'the ultimate comfort food'?",
        options: ["Fish and Chips", "Shepherd's Pie", "Full English Breakfast", "Apple Pie"],
        correct: 1
    },
    {
        question: "When did fish and chips shops first appear in Britain?",
        options: ["1600s", "1700s", "1800s", "1900s"],
        correct: 2
    },
    {
        question: "Which meat is traditionally used in Shepherd's Pie?",
        options: ["Beef", "Pork", "Chicken", "Lamb"],
        correct: 3
    },
    {
        question: "What is traditionally served with British Apple Pie?",
        options: ["Ice Cream", "Cream", "Custard", "All of the above"],
        correct: 3
    }
];

// Initialize quiz on page load
window.addEventListener('DOMContentLoaded', function() {
    const quizOptions = document.querySelectorAll('.quiz-option');
    if (quizOptions.length > 0) {
        quizOptions.forEach((option, index) => {
            option.onclick = function() {
                checkAnswer(this, index === quizQuestions[currentQuestion].correct);
            };
        });
    }
});

function checkAnswer(element, isCorrect) {
    const options = element.parentElement.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.style.pointerEvents = 'none';
        option.style.opacity = '0.6';
    });
    
    if (isCorrect) {
        element.classList.add('correct');
        quizScore++;
        showFeedback("Excellent! You're absolutely right! 🎉", true);
    } else {
        element.classList.add('wrong');
        showFeedback("Not quite right. Shepherd's Pie is indeed called 'the ultimate comfort food'! 🤔", false);
    }
    
    setTimeout(() => {
        nextQuestion();
    }, 2500);
}

function showFeedback(message, isCorrect) {
    const feedback = document.getElementById('quiz-feedback');
    feedback.textContent = message;
    feedback.style.color = isCorrect ? '#28A745' : '#DC3545';
    feedback.style.animation = 'fadeInUp 0.5s ease';
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizQuestions.length) {
        const question = quizQuestions[currentQuestion];
        document.querySelector('.quiz-question').textContent = question.question;
        
        const options = document.querySelectorAll('.quiz-option');
        options.forEach((option, index) => {
            option.textContent = question.options[index];
            option.className = 'quiz-option';
            option.style.pointerEvents = 'auto';
            option.style.opacity = '1';
            option.onclick = function() { 
                checkAnswer(this, index === question.correct); 
            };
        });
        
        document.getElementById('quiz-feedback').textContent = '';
    } else {
        showQuizResults();
    }
}

function showQuizResults() {
    const percentage = Math.round((quizScore / quizQuestions.length) * 100);
    let message = '';
    
    if (percentage === 100) {
        message = `Perfect! ${quizScore}/${quizQuestions.length} - You're a true British cuisine expert! 🏆`;
    } else if (percentage >= 75) {
        message = `Great job! ${quizScore}/${quizQuestions.length} - You know your British dishes well! 🌟`;
    } else if (percentage >= 50) {
        message = `Good effort! ${quizScore}/${quizQuestions.length} - You're on your way to becoming a British food expert! 👍`;
    } else {
        message = `${quizScore}/${quizQuestions.length} - Keep exploring British cuisine, you'll get there! 📚`;
    }
    
    const quizContainer = document.querySelector('.quiz-container');
    quizContainer.innerHTML = `
        <h3 style="text-align: center; color: var(--primary-green); margin-bottom: 1rem;">Quiz Complete!</h3>
        <p style="text-align: center; font-size: 1.2rem; margin-bottom: 2rem;">${message}</p>
        <button onclick="resetQuiz()" style="display: block; margin: 0 auto; padding: 1rem 2rem; background: var(--primary-green); color: white; border: none; border-radius: 25px; font-size: 1.1rem; cursor: pointer;">Try Again</button>
    `;
}

function resetQuiz() {
    currentQuestion = 0;
    quizScore = 0;
    location.reload(); // Simple reset - reload the page
}

// Navbar background change on scroll
let lastScroll = 0;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        nav.style.background = 'rgba(45, 80, 22, 0.98)';
        nav.style.boxShadow = '0 4px 25px rgba(0, 0, 0, 0.2)';
    } else {
        nav.style.background = 'rgba(45, 80, 22, 0.95)';
        nav.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Enhanced dish card interactions
const dishCards = document.querySelectorAll('.dish-card');
dishCards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function(e) {
        this.style.transform = 'translateY(0) scale(1)';
    });
    
    card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 25;
        const rotateY = (centerX - x) / 25;
        
        this.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });
});

// Animate hero statistics
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
};

// Observe hero stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const number = entry.target.querySelector('.stat-number');
            const text = number.textContent;
            
            if (text.includes('100+')) {
                animateCounter(number, 100, 1500);
                setTimeout(() => { number.textContent = '100+'; }, 1500);
            } else {
                const targetValue = parseInt(text);
                number.textContent = '0';
                animateCounter(number, targetValue, 1500);
            }
            
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// Progress bar animations
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            const progressFill = entry.target.querySelector('.progress-fill');
            const targetWidth = progressFill.style.width;
            progressFill.style.width = '0%';
            
            setTimeout(() => {
                progressFill.style.width = targetWidth;
            }, 200);
            
            entry.target.classList.add('animated');
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.progress-item').forEach(item => {
    progressObserver.observe(item);
});

// Team member hover effects
const teamMembers = document.querySelectorAll('.team-member');
teamMembers.forEach(member => {
    member.addEventListener('mouseenter', function() {
        this.querySelector('.member-avatar').style.transform = 'scale(1.1) rotate(5deg)';
    });
    
    member.addEventListener('mouseleave', function() {
        this.querySelector('.member-avatar').style.transform = 'scale(1) rotate(0deg)';
    });
});

// Gallery hover effects
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(2deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Timeline animations
const timelineItems = document.querySelectorAll('.timeline-item');
timelineItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`;
});

// Click animations for CTA buttons
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', function(e) {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
});

// Easter egg: Konami code for a fun surprise
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 3s infinite';
        document.body.style.background = 'linear-gradient(45deg, #FF6B6B, #4ECDC4, #45B7D1, #96CEB4, #FFEAA7)';
        
        setTimeout(() => {
            document.body.style.animation = '';
            document.body.style.background = '';
        }, 5000);
        
        // Add floating emojis
        createFloatingEmojis();
    }
});

// Create floating emojis effect
function createFloatingEmojis() {
    const emojis = ['🍳', '🐟', '🥧', '🍎', '🇬🇧', '🍽️'];
    
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.cssText = `
                position: fixed;
                font-size: 2rem;
                left: ${Math.random() * 100}vw;
                top: 100vh;
                z-index: 10000;
                pointer-events: none;
                animation: floatUp 3s ease-out forwards;
            `;
            document.body.appendChild(emoji);
            
            setTimeout(() => emoji.remove(), 3000);
        }, i * 100);
    }
}

// Add CSS for floating animation
const floatStyle = document.createElement('style');
floatStyle.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
    
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(floatStyle);

// Add typing effect to hero title
const heroTitle = document.querySelector('.hero h1');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    let i = 0;
    
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 80);
        }
    };
    
    setTimeout(typeWriter, 500);
}

console.log('🍽️ British Kitchen website loaded successfully!');
console.log('🎮 Easter egg: Try the Konami code for a surprise! ↑↑↓↓←→←→BA');
console.log('📊 Take our quiz to test your British cuisine knowledge!');
// 3D Dish Card Interactions
document.addEventListener('DOMContentLoaded', function() {
    const dish3DContainers = document.querySelectorAll('.dish-3d-container');
    
    dish3DContainers.forEach(container => {
        let isDragging = false;
        let startX, startY;
        let currentRotationX = 0;
        let currentRotationY = 0;
        
        const model = container.querySelector('.dish-3d-model');
        if (!model) return;
        
        container.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            container.style.cursor = 'grabbing';
        });
        
        container.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            currentRotationY += deltaX * 0.5;
            currentRotationX -= deltaY * 0.5;
            
            // Limit rotation
            currentRotationX = Math.max(-30, Math.min(30, currentRotationX));
            
            model.style.transform = `rotateX(${currentRotationX}deg) rotateY(${currentRotationY}deg)`;
            
            startX = e.clientX;
            startY = e.clientY;
        });
        
        container.addEventListener('mouseup', () => {
            isDragging = false;
            container.style.cursor = 'grab';
        });
        
        container.addEventListener('mouseleave', () => {
            isDragging = false;
            container.style.cursor = 'grab';
        });
        
        // Reset on double click
        container.addEventListener('dblclick', () => {
            currentRotationX = 0;
            currentRotationY = 0;
            model.style.transform = 'rotateX(0deg) rotateY(0deg)';
        });
    });
});
