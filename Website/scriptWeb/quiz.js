// HTML Elements
const questionText = document.getElementById("question-text");
const answerOptionsElement = document.getElementById("answer-options");
const nextQuestionButton = document.getElementById("next-question");
const result = document.getElementById("result");

// Variables
let currentQuestionIndex = 0;
let score = 0;
let quizData = []; // Array to store quiz data
let quizId = null; // Variable to store the quiz ID

// Load quiz data from local storage on page load
window.addEventListener('load', () => {
  const storedQuizData = localStorage.getItem('quizData');
  if (storedQuizData) {
    quizData = JSON.parse(storedQuizData);
  } else {
    // Initialize with default quizzes if no data is found
    quizData = [
        {
            category: "History",
            questions: [
                {
                    question: "In what year did World War II begin?",
                    options: ["1914", "1939", "1941", "1945"],
                    correctAnswer: 1
                },
                {
                    question: "Who was the first president of the United States?",
                    options: ["Thomas Jefferson", "George Washington", "Abraham Lincoln", "John Adams"],
                    correctAnswer: 1
                },
                {
                    question: "Where was the ancient city of Pompeii located?",
                    options: ["Greece", "Egypt", "Italy", "Rome"],
                    correctAnswer: 2
                }
            ]
        },
        {
            category: "Science",
            questions: [
                {
                    question: "What is the chemical symbol for gold?",
                    options: ["Ag", "Au", "Fe", "Hg"],
                    correctAnswer: 1
                },
                {
                    question: "What is the largest planet in our solar system?",
                    options: ["Mars", "Jupiter", "Saturn", "Neptune"],
                    correctAnswer: 1
                },
                {
                    question: "What is the smallest unit of matter?",
                    options: ["Atom", "Molecule", "Cell", "Organelle"],
                    correctAnswer: 0
                }
            ]
        },
        {
            category: "Pop Culture",
            questions: [
                {
                    question: "Who wrote the Harry Potter series?",
                    options: ["J.K. Rowling", "Stephen King", "Suzanne Collins", "Rick Riordan"],
                    correctAnswer: 0
                },
                {
                    question: "What is the name of the main character in the TV show 'Friends'?",
                    options: ["Rachel", "Monica", "Phoebe", "Joey"],
                    correctAnswer: 0
                },
                {
                    question: "What is the name of the famous video game character who is a plumber?",
                    options: ["Sonic", "Mario", "Pac-Man", "Donkey Kong"],
                    correctAnswer: 1
                }
            ]
        }
    ];
  }

  // Load the quiz based on the quizId from URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  quizId = urlParams.get('quizId');

  if (quizId !== null) {
    quizId = parseInt(quizId);
    const quiz = quizData[quizId];
    loadQuiz(quiz);
  }
});

// Function to load a quiz
function loadQuiz(quiz) {
    currentQuestionIndex = 0;
    score = 0;
    questionText.textContent = quiz.questions[currentQuestionIndex].question;
    displayAnswerOptions(quiz.questions[currentQuestionIndex].options);
}

// Function to display answer options
function displayAnswerOptions(options) {
    answerOptionsElement.innerHTML = "";
    options.forEach(option => {
        const button = document.createElement("button");
        button.classList.add("answer-button");
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        answerOptionsElement.appendChild(button);
    });
}

// Function to check the answer
function checkAnswer(selectedAnswer) {
    const currentQuestion = quizData[quizId].questions[currentQuestionIndex];
    if (selectedAnswer === currentQuestion.options[currentQuestion.correctAnswer]) {
        score++;
        result.textContent = "Correct!";
    } else {
        result.textContent = "Incorrect. The correct answer is " + currentQuestion.options[currentQuestion.correctAnswer];
    }
    result.classList.remove("hidden");
    nextQuestionButton.classList.remove("hidden");
}

// Function to move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData[quizId].questions.length) {
        questionText.textContent = quizData[quizId].questions[currentQuestionIndex].question;
        displayAnswerOptions(quizData[quizId].questions[currentQuestionIndex].options);
        result.classList.add("hidden");
        nextQuestionButton.classList.add("hidden");
    } else {
        endQuiz();
    }
}

// Function to end the quiz
function endQuiz() {
    result.textContent = "Quiz finished! Your score is " + score + " out of " + quizData[quizId].questions.length;
    nextQuestionButton.classList.add("hidden");
}

// Event Listener for Next Question Button
nextQuestionButton.addEventListener("click", nextQuestion);
