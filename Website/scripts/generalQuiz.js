const quizData = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Paris", "Rome", "Madrid"],
        correctAnswer: "Paris"
    },
    {
        question: "What is the highest mountain in the world?",
        options: ["K2", "Kangchenjunga", "Lhotse", "Mount Everest"],
        correctAnswer: "Mount Everest"
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Michelangelo", "Leonardo da Vinci", "Raphael", "Donatello"],
        correctAnswer: "Leonardo da Vinci"
    },
    // Add more questions here
];

const questionText = document.getElementById("question-text");
const answerOptions = document.getElementById("answer-options");
const nextQuestionButton = document.getElementById("next-question");
const result = document.getElementById("result");

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    // Shuffle answer options
    const shuffledOptions = shuffleArray(currentQuestion.options);

    // Display shuffled options
    for (let i = 0; i < shuffledOptions.length; i++) {
        const optionButton = answerOptions.children[i];
        optionButton.textContent = shuffledOptions[i];
        optionButton.onclick = () => checkAnswer(shuffledOptions[i]);
    }

    nextQuestionButton.disabled = true;
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
        result.textContent = "Correct!";
    } else {
        result.textContent = "Incorrect. The correct answer is " + currentQuestion.correctAnswer;
    }

    nextQuestionButton.disabled = false;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
        result.textContent = "";
    } else {
        endQuiz();
    }
}

function endQuiz() {
    result.textContent = "Quiz finished! Your score is " + score + " out of " + quizData.length;
    nextQuestionButton.disabled = true;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

nextQuestionButton.addEventListener("click", nextQuestion);

loadQuestion();
