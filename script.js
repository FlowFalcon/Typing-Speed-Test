const wordsEasy = [
    "apple", "banana", "cat", "dog", "fish", "hat", "book", "table", "chair", "phone",
    "mouse", "car", "tree", "lamp", "house", "shoe", "pen", "star", "cup", "key"
];

const wordsHard = [
    "encyclopedia", "immunology", "infrastructure", "benevolent", "philosophy", "astronomy", 
    "constitution", "ambiguity", "chronology", "hypothesis", "metamorphosis", "dichotomy", 
    "juxtaposition", "perspective", "significance", "transcendence", "propagation", "quantitative", 
    "sustainability", "unprecedented"
];

const sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing speed test can improve your skills.",
    "JavaScript is a versatile programming language.",
    "Coding challenges are a fun way to learn.",
    "Practice makes perfect in everything you do.",
    "Consistency is key to mastering any skill.",
    "The sky is the limit when you believe in yourself.",
    "Creativity is intelligence having fun.",
    "A journey of a thousand miles begins with a single step.",
    "Perseverance is the hard work you do after you get tired of doing the hard work you already did."
];
let currentWord = '';
let timer;
let startTime;
let elapsedTime = 0;
let leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];

document.getElementById('startButton').addEventListener('click', startGame);
document.getElementById('inputField').addEventListener('input', checkInput);

function startGame() {
    const mode = document.getElementById('modeSelector').value;
    resetGame();
    if (mode === 'easy') {
        currentWord = getRandomWord(wordsEasy);
    } else if (mode === 'hard') {
        currentWord = getRandomWord(wordsHard);
    } else {
        currentWord = getRandomWord(sentences);
    }
    document.getElementById('word').textContent = currentWord;
    document.getElementById('inputField').disabled = false;
    document.getElementById('inputField').focus();
    startTime = Date.now();
    timer = setInterval(updateTimer, 100);
}

function getRandomWord(wordList) {
    return wordList[Math.floor(Math.random() * wordList.length)];
}

function checkInput() {
    const input = document.getElementById('inputField').value;
    if (input === currentWord) {
        clearInterval(timer);
        elapsedTime = (Date.now() - startTime) / 1000;
        document.getElementById('timer').textContent = `Time: ${elapsedTime}s`;
        saveScore(elapsedTime);
        document.getElementById('inputField').disabled = true;
    }
}

function updateTimer() {
    const currentTime = (Date.now() - startTime) / 1000;
    document.getElementById('timer').textContent = `Time: ${currentTime.toFixed(1)}s`;
}

function resetGame() {
    clearInterval(timer);
    document.getElementById('inputField').value = '';
    document.getElementById('word').textContent = '';
    document.getElementById('timer').textContent = 'Time: 0s';
}

function saveScore(time) {
    leaderboard.push(time);
    leaderboard.sort((a, b) => a - b);
    leaderboard = leaderboard.slice(0, 5); // Simpan top 5
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    updateLeaderboard();
}

function updateLeaderboard() {
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = leaderboard.map((score, index) => `<li>${index + 1}. ${score}s</li>`).join('');
}

// Update leaderboard saat game load
updateLeaderboard();
