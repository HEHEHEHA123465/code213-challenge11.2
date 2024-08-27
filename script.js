const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const scoreElement = document.getElementById('score');
const highscoreElement = document.getElementById('highscore');

const questions = [
    {
        question: "What is SpongeBob's favorite pastime?",
        answers: [
            { text: "Baking", correct: false },
            { text: "Jellyfishing", correct: true },
            { text: "Playing video games", correct: false },
            { text: "Eating hamburgers", correct: false }
        ]
    },
    {
        question: "What is the name of SpongeBob's pet snail?",
        answers: [
            { text: "Fluffy", correct: false },
            { text: "Gary", correct: true },
            { text: "Meow", correct: false },
            { text: "Whiskers", correct: false }
        ]
    },
    {
        question: "What is the name of SpongeBob's boss?",
        answers: [
            { text: "Mr. Krabs", correct: true },
            { text: "Plankton", correct: false },
            { text: "Squidward", correct: false },
            { text: "Larry", correct: false }
        ]
    },
    {
        question: "in what month was spongebob born?",
        answers: [
            { text: "june", correct: true },
            { text: "august", correct: false },
            { text: "march", correct: false },
            { text: "december", correct: false }
        ]
    },
    {
        question: "how old is he?",
        answers: [
            { text: "mid 30s", correct: false },
            { text: "mid 20s", correct: true },
            { text: "78", correct: false },
            { text: "undefined", correct: false }
        ]
    },
];

let currentQuestionIndex = 0;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

highscoreElement.innerText = `High Score: ${highScore}`;

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.innerText = `Score: ${score}`;
    nextButton.classList.add('hide');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionContainer.innerText = question.question;
    answerButtons.innerHTML = '';
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(answer) {
    const correct = answer.correct;
    if (correct) {
        score++;
        scoreElement.innerText = `Score: ${score}`;
    }
    nextButton.classList.remove('hide');
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.classList.add('hide');
    } else {
        endGame();
    }
}

function endGame() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('highScore', highScore);
        highscoreElement.innerText = `High Score: ${highScore}`;
    }
    alert(`Game over! Your score is ${score}`);
    startGame();
}

nextButton.addEventListener('click', showNextQuestion);

// Start the game when the page loads
startGame();