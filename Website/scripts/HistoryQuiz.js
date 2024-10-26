const questionContainer = document.getElementById('question-container');
const questionText = document.getElementById('question-text');
const answerButtons = document.getElementById('answer-buttons');
const result = document.getElementById('result');
const nextButton = document.getElementById('next-button');

let currentQuestionIndex = 0;
let score = 0;

const quizData = [
    {
        question: "In what year did World War II begin?",
        options: ["1914", "1939", "1941", "1945"],
        correctAnswer: "1939"
    },
    {
        question: "Who was the first president of the United States?",
        options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
        correctAnswer: "George Washington"
    },
    {
        question: "Where was the ancient city of Pompeii located?",
        options: ["Greece", "Egypt", "Italy", "Rome"],
        correctAnswer: "Italy"
    },
    // Add more questions here
];

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    showQuestion();
}

function showQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    answerButtons.innerHTML = ''; // Clear previous answers

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('answer-button');
        button.textContent = option;
        button.id = `answer-${index + 1}`;
        button.addEventListener('click', () => checkAnswer(option));
        answerButtons.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
        result.textContent = "Correct!";
        result.classList.remove('hidden');
    } else {
        result.textContent = "Incorrect.";
        result.classList.remove('hidden');
    }

    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        nextButton.classList.remove('hidden');
    } else {
        nextButton.textContent = "Finish";
        nextButton.classList.remove('hidden');
        nextButton.addEventListener('click', () => showResults());
    }
}

function showResults() {
    result.textContent = `You got ${score} out of ${quizData.length} questions correct!`;
    nextButton.classList.add('hidden');
    questionContainer.classList.add('hidden');
}

nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < quizData.length) {
        showQuestion();
        nextButton.classList.add('hidden');
        result.classList.add('hidden');
    } else {
        showResults();
    }
});

startQuiz();
