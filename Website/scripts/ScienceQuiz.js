const questions = [
    {
        question: "What is the smallest unit of matter?",
        choices: ["Atom", "Molecule", "Cell", "Element"],
        correctAnswer: "Atom"
    },
    {
        question: "What is the chemical formula for water?",
        choices: ["H2O", "CO2", "NaCl", "O2"],
        correctAnswer: "H2O"
    },
    {
        question: "What is the largest planet in our solar system?",
        choices: ["Mars", "Jupiter", "Saturn", "Venus"],
        correctAnswer: "Jupiter"
    },
    {
        question: "What is the process by which plants convert sunlight into energy?",
        choices: ["Photosynthesis", "Respiration", "Fermentation", "Transpiration"],
        correctAnswer: "Photosynthesis"
    },
    {
        question: "What is the name of the force that pulls objects towards the center of the Earth?",
        choices: ["Gravity", "Friction", "Magnetism", "Electromagnetism"],
        correctAnswer: "Gravity"
    }
];

let currentQuestion = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const answerButtons = document.getElementById("answer-buttons");
const nextQuestionButton = document.getElementById("next-question");
const result = document.getElementById("result");

function loadQuestion() {
    const questionData = questions[currentQuestion];
    questionText.textContent = questionData.question;
    answerButtons.innerHTML = ''; // Clear previous answers

    questionData.choices.forEach(choice => {
        const button = document.createElement("button");
        button.textContent = choice;
        button.classList.add("answer-button");
        button.addEventListener("click", () => checkAnswer(choice));
        answerButtons.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestion].correctAnswer;

    if (selectedAnswer === correctAnswer) {
        score++;
        result.textContent = "Correct!";
    } else {
        result.textContent = "Incorrect. The correct answer was " + correctAnswer;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        nextQuestionButton.style.display = "block";
    } else {
        nextQuestionButton.style.display = "none";
        result.textContent = "Quiz completed! Your final score is " + score + " out of " + questions.length;
    }
}

function nextQuestion() {
    result.textContent = ""; // Clear previous feedback
    loadQuestion();
    nextQuestionButton.style.display = "none";
}

nextQuestionButton.addEventListener("click", nextQuestion);

loadQuestion();
