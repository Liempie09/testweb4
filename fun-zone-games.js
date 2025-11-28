// Memory Match Game
const memoryEmojis = ['🍳', '🥓', '🐟', '🍟', '🥧', '🍎', '🌭', '🍄'];
let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;

function initMemoryGame() {
    const gameGrid = document.getElementById('memoryGame');
    if (!gameGrid) return;
    
    // Create pairs and shuffle
    memoryCards = [...memoryEmojis, ...memoryEmojis]
        .sort(() => Math.random() - 0.5)
        .map((emoji, index) => ({
            id: index,
            emoji: emoji,
            flipped: false,
            matched: false
        }));
    
    gameGrid.innerHTML = '';
    memoryCards.forEach((card, index) => {
        const cardElement = document.createElement('div');
        cardElement.className = 'memory-card';
        cardElement.dataset.index = index;
        cardElement.textContent = '?';
        cardElement.addEventListener('click', () => flipCard(index));
        gameGrid.appendChild(cardElement);
    });
    
    moves = 0;
    matchedPairs = 0;
    flippedCards = [];
    updateMemoryStats();
}

function flipCard(index) {
    if (flippedCards.length >= 2) return;
    if (memoryCards[index].flipped || memoryCards[index].matched) return;
    
    const cardElement = document.querySelector(`[data-index="${index}"]`);
    cardElement.textContent = memoryCards[index].emoji;
    cardElement.classList.add('flipped');
    memoryCards[index].flipped = true;
    flippedCards.push(index);
    
    if (flippedCards.length === 2) {
        moves++;
        updateMemoryStats();
        checkMatch();
    }
}

function checkMatch() {
    const [first, second] = flippedCards;
    
    if (memoryCards[first].emoji === memoryCards[second].emoji) {
        // Match found!
        memoryCards[first].matched = true;
        memoryCards[second].matched = true;
        document.querySelector(`[data-index="${first}"]`).classList.add('matched');
        document.querySelector(`[data-index="${second}"]`).classList.add('matched');
        matchedPairs++;
        flippedCards = [];
        updateMemoryStats();
        
        if (matchedPairs === memoryEmojis.length) {
            setTimeout(() => alert(`🎉 Congratulations! You won in ${moves} moves!`), 500);
        }
    } else {
        // No match
        setTimeout(() => {
            memoryCards[first].flipped = false;
            memoryCards[second].flipped = false;
            document.querySelector(`[data-index="${first}"]`).textContent = '?';
            document.querySelector(`[data-index="${second}"]`).textContent = '?';
            document.querySelector(`[data-index="${first}"]`).classList.remove('flipped');
            document.querySelector(`[data-index="${second}"]`).classList.remove('flipped');
            flippedCards = [];
        }, 1000);
    }
}

function updateMemoryStats() {
    document.getElementById('memoryMoves').textContent = moves;
    document.getElementById('memoryMatches').textContent = matchedPairs;
}

function resetMemoryGame() {
    initMemoryGame();
}

// Quiz Game
const quizQuestions = [
    {
        question: "What is the traditional accompaniment to British Apple Pie?",
        options: ["Ice Cream", "Custard", "Whipped Cream", "Chocolate Sauce"],
        correct: 1
    },
    {
        question: "Which fish is traditionally used in Fish and Chips?",
        options: ["Salmon", "Tuna", "Cod or Haddock", "Mackerel"],
        correct: 2
    },
    {
        question: "What makes Shepherd's Pie different from Cottage Pie?",
        options: ["The topping", "Shepherd's Pie uses lamb", "The cooking method", "The vegetables"],
        correct: 1
    },
    {
        question: "When did the first fish and chip shops appear in Britain?",
        options: ["1760s", "1860s", "1960s", "1660s"],
        correct: 1
    },
    {
        question: "What is NOT typically part of a Full English Breakfast?",
        options: ["Bacon", "Croissant", "Baked Beans", "Sausages"],
        correct: 1
    },
    {
        question: "Which potato variety is best for making chips?",
        options: ["New Potatoes", "Sweet Potatoes", "Maris Piper", "Red Potatoes"],
        correct: 2
    },
    {
        question: "What era did the Full English Breakfast become popular?",
        options: ["Medieval", "Tudor", "Victorian", "Modern"],
        correct: 2
    },
    {
        question: "What is the oldest recorded British dish in our collection?",
        options: ["Fish and Chips", "Apple Pie", "Shepherd's Pie", "Full English Breakfast"],
        correct: 1
    }
];

let currentQuizQuestion = 0;
let quizScore = 0;
let quizAnswered = false;

function initQuiz() {
    currentQuizQuestion = 0;
    quizScore = 0;
    quizAnswered = false;
    loadQuizQuestion();
}

function loadQuizQuestion() {
    if (currentQuizQuestion >= quizQuestions.length) {
        document.getElementById('quizQuestion').textContent = `Quiz Complete! Final Score: ${quizScore}/${quizQuestions.length}`;
        document.getElementById('quizOptions').innerHTML = '<p style="text-align: center; color: var(--primary-green); font-weight: bold;">Great job! Click "Next Question" to restart.</p>';
        currentQuizQuestion = 0;
        quizScore = 0;
        return;
    }
    
    const question = quizQuestions[currentQuizQuestion];
    document.getElementById('quizQuestion').textContent = question.question;
    
    const optionsContainer = document.getElementById('quizOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.textContent = option;
        optionElement.addEventListener('click', () => checkQuizAnswer(index));
        optionsContainer.appendChild(optionElement);
    });
    
    quizAnswered = false;
    updateQuizScore();
}

function checkQuizAnswer(selectedIndex) {
    if (quizAnswered) return;
    
    quizAnswered = true;
    const question = quizQuestions[currentQuizQuestion];
    const options = document.querySelectorAll('.quiz-option');
    
    if (selectedIndex === question.correct) {
        options[selectedIndex].classList.add('correct');
        quizScore++;
    } else {
        options[selectedIndex].classList.add('wrong');
        options[question.correct].classList.add('correct');
    }
    
    updateQuizScore();
}

function updateQuizScore() {
    document.getElementById('quizScore').textContent = `Score: ${quizScore}/${currentQuizQuestion + (quizAnswered ? 1 : 0)}`;
}

function nextQuizQuestion() {
    if (quizAnswered || currentQuizQuestion === 0) {
        currentQuizQuestion++;
        loadQuizQuestion();
    }
}

// Word Scramble Game
const scrambleWords = [
    { word: "BREAKFAST", hint: "Morning meal" },
    { word: "SAUSAGE", hint: "Meat in a casing" },
    { word: "SHEPHERD", hint: "Type of pie with lamb" },
    { word: "CUSTARD", hint: "Yellow dessert sauce" },
    { word: "BATTER", hint: "Coating for fish" },
    { word: "CHIPS", hint: "British fries" },
    { word: "BACON", hint: "Crispy breakfast meat" },
    { word: "MUSHROOM", hint: "Fungus food" },
    { word: "TOMATO", hint: "Red fruit/vegetable" },
    { word: "APPLE", hint: "Fruit in a pie" }
];

let currentScramble = null;
let scrambleScore = 0;
let scrambleStreak = 0;

function initScramble() {
    scrambleScore = 0;
    scrambleStreak = 0;
    updateScrambleStats();
    loadNewScramble();
}

function loadNewScramble() {
    currentScramble = scrambleWords[Math.floor(Math.random() * scrambleWords.length)];
    const scrambled = currentScramble.word.split('').sort(() => Math.random() - 0.5).join('');
    document.getElementById('scrambledWord').textContent = scrambled;
    document.getElementById('scrambleHint').textContent = `Hint: ${currentScramble.hint}`;
    document.getElementById('scrambleInput').value = '';
}

function checkScramble() {
    const input = document.getElementById('scrambleInput').value.toUpperCase();
    
    if (input === currentScramble.word) {
        scrambleScore++;
        scrambleStreak++;
        alert('🎉 Correct!');
        updateScrambleStats();
        loadNewScramble();
    } else {
        scrambleStreak = 0;
        alert('❌ Try again!');
        updateScrambleStats();
    }
}

function skipScramble() {
    scrambleStreak = 0;
    updateScrambleStats();
    loadNewScramble();
}

function updateScrambleStats() {
    document.getElementById('scrambleScore').textContent = scrambleScore;
    document.getElementById('scrambleStreak').textContent = scrambleStreak;
}

// Enter key support for scramble
document.addEventListener('DOMContentLoaded', () => {
    const scrambleInput = document.getElementById('scrambleInput');
    if (scrambleInput) {
        scrambleInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkScramble();
            }
        });
    }
});

// Drag and Drop Game
const dragDropAnswers = {
    'breakfast': 'england',
    'fish': 'london',
    'pie': 'scotland',
    'apple': 'medieval'
};

function initDragDrop() {
    const dragItems = document.querySelectorAll('.drag-item');
    const dropZones = document.querySelectorAll('.drop-zone');
    
    dragItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });
    
    dropZones.forEach(zone => {
        zone.addEventListener('dragover', handleDragOver);
        zone.addEventListener('drop', handleDrop);
        zone.addEventListener('dragleave', handleDragLeave);
    });
}

let draggedElement = null;

function handleDragStart(e) {
    draggedElement = this;
    this.style.opacity = '0.5';
}

function handleDragEnd(e) {
    this.style.opacity = '1';
}

function handleDragOver(e) {
    e.preventDefault();
    this.classList.add('drag-over');
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    e.preventDefault();
    this.classList.remove('drag-over');
    
    if (draggedElement) {
        const dish = draggedElement.dataset.dish;
        const origin = this.dataset.origin;
        
        if (dragDropAnswers[dish] === origin) {
            this.classList.add('correct');
            this.textContent = draggedElement.textContent;
            draggedElement.style.display = 'none';
            
            // Check if all correct
            const allCorrect = Array.from(document.querySelectorAll('.drop-zone')).every(zone => zone.classList.contains('correct'));
            if (allCorrect) {
                setTimeout(() => alert('🎉 Perfect! You matched all dishes correctly!'), 500);
            }
        } else {
            alert('❌ Not quite! Try again.');
        }
    }
}

function resetDragDrop() {
    document.querySelectorAll('.drop-zone').forEach(zone => {
        zone.classList.remove('correct');
        zone.textContent = zone.dataset.origin === 'england' ? '🏴󠁧󠁢󠁥󠁮󠁧󠁿 England' :
                          zone.dataset.origin === 'london' ? '🏙️ London' :
                          zone.dataset.origin === 'scotland' ? '🏴󠁧󠁢󠁳󠁣󠁴󠁿 Scotland' :
                          '🏰 Medieval England';
    });
    
    document.querySelectorAll('.drag-item').forEach(item => {
        item.style.display = 'block';
    });
}

// Fun Facts Carousel
const funFacts = [
    {
        icon: "🎯",
        text: "The British consume approximately 382 million portions of fish and chips every year - that's about 6 servings per person!"
    },
    {
        icon: "⏰",
        text: "A proper Full English Breakfast can take up to 30 minutes to prepare correctly, with each component cooked to perfection."
    },
    {
        icon: "🏆",
        text: "Shepherd's Pie got its name because shepherds tend sheep, and the dish traditionally uses lamb. When made with beef, it's called Cottage Pie!"
    },
    {
        icon: "📜",
        text: "The first recorded apple pie recipe in England dates back to 1381, making it over 640 years old!"
    },
    {
        icon: "🌍",
        text: "Fish and chips was one of the few foods not rationed during World War II. Winston Churchill called it 'the good companions'!"
    },
    {
        icon: "👑",
        text: "The Full English Breakfast was popularized by the Victorian gentry who would serve elaborate breakfast spreads to their guests."
    },
    {
        icon: "🥔",
        text: "The best potatoes for making chips are Maris Piper or King Edward varieties - they have the perfect starch content!"
    },
    {
        icon: "🍺",
        text: "The secret to crispy fish batter is using cold beer or sparkling water - the carbonation creates air pockets when frying!"
    },
    {
        icon: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
        text: "There are over 10,500 fish and chip shops across the UK, more than all the McDonald's, Burger Kings, and KFCs combined!"
    },
    {
        icon: "🍎",
        text: "British apple pie is traditionally served with custard, while American apple pie is often served with ice cream or whipped cream."
    }
];

let currentFactIndex = 0;

function initFacts() {
    showFact(0);
}

function showFact(index) {
    currentFactIndex = index;
    const fact = funFacts[index];
    document.getElementById('factIcon').textContent = fact.icon;
    document.getElementById('factContent').textContent = fact.text;
}

function nextFact() {
    currentFactIndex = (currentFactIndex + 1) % funFacts.length;
    showFact(currentFactIndex);
}

function previousFact() {
    currentFactIndex = (currentFactIndex - 1 + funFacts.length) % funFacts.length;
    showFact(currentFactIndex);
}

// Initialize all games when page loads
document.addEventListener('DOMContentLoaded', () => {
    initMemoryGame();
    initQuiz();
    initScramble();
    initDragDrop();
    initFacts();
});