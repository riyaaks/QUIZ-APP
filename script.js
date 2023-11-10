const questions = [
    // ... (your questions and answers here)
    {
        question: "What is the capital of France?",
        options: ["Paris", "London", "Berlin", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Giraffe", "Blue Whale", "Lion"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Au", "Ag", "Fe", "Cu"],
        correctAnswer: "Au"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: "Carbon Dioxide"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timer;

const questionText = document.getElementById("question-text");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");
const feedbackText = document.getElementById("feedback");
const scoreText = document.getElementById("score");
const timerText = document.getElementById("timer");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    const questionContainer = document.querySelector(".question-container");

    questionContainer.classList.remove("show");
    resetTimer();

    setTimeout(() => {
        questionText.textContent = currentQuestion.question;
        optionsContainer.innerHTML = '';

        currentQuestion.options.forEach((option, index) => {
            const button = document.createElement("button");
            button.textContent = option;
            button.addEventListener("click", () => checkAnswer(option));
            optionsContainer.appendChild(button);
        });

        questionContainer.classList.add("show");
        startTimer();
    }, 300);
}

function startTimer() {
    let timeLeft = questionTimeLimit;
    timer = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timer);
            checkAnswer(null);
        }
        timerText.textContent = "Time left: " + timeLeft + "s";
        timeLeft--;
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timerText.textContent = "";
}

const questionTimeLimit = 20;

function checkAnswer(selectedOption) {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.correctAnswer) {
        feedbackText.textContent = "Correct!";
        score++;
    } else {
        feedbackText.textContent = "Incorrect. The correct answer is: " + currentQuestion.correctAnswer;
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        finishQuiz();
    }

    updateScore();
}

function updateScore() {
    scoreText.textContent = "Score: " + score;
}

function finishQuiz() {
    questionText.textContent = "Quiz completed!";
    optionsContainer.innerHTML = '';
    nextButton.style.display = "none";
    restartButton.style.display = "block";
    feedbackText.textContent = "Your final score is: " + score + " out of " + questions.length;
}

nextButton.addEventListener("click", () => loadQuestion());

restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    updateScore();
    loadQuestion();
    restartButton.style.display = "none";
    nextButton.style.display = "block";
    feedbackText.textContent = "";
});

window.addEventListener("load", loadQuestion);
