// HTML Elements
const featuredQuizzesContainer = document.querySelector("#featured-quizzes .quiz-container");
const createdQuizzesContainer = document.querySelector("#created-quizzes .quiz-container");
const quizForm = document.querySelector('#quiz-form');
const quizCategory = document.querySelector('#quiz-category');
const questionsContainer = document.querySelector('#questions-container');
const addQuestionButton = document.querySelector('#add-question-button');
const questionInput = document.getElementById('question-input');
const answerOptions = document.querySelectorAll('.answer-option');

// Variables
let quizData = []; // Array to store quiz data

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
  displayFeaturedQuizzes();
  displayCreatedQuizzes();
});

// Function to display featured quizzes
function displayFeaturedQuizzes() {
    featuredQuizzesContainer.innerHTML = '';

    quizData.forEach((quiz, index) => {
        const quizCard = document.createElement("div");
        quizCard.classList.add("quiz-card");
        quizCard.innerHTML = `
            <h3>${quiz.category}</h3>
            <a href="quiz.html?quizId=${index}" class="start-quiz-button">Start Quiz</a>
        `;
        featuredQuizzesContainer.appendChild(quizCard);
    });
}

// Function to display created quizzes
function displayCreatedQuizzes() {
    createdQuizzesContainer.innerHTML = '';

    quizData.forEach((quiz, index) => {
        const quizCard = document.createElement("div");
        quizCard.classList.add("quiz-card");
        quizCard.innerHTML = `
            <h3>${quiz.category}</h3>
            <a href="quiz.html?quizId=${index}" class="start-quiz-button">Start Quiz</a>
        `;
        createdQuizzesContainer.appendChild(quizCard);
    });
}

// Function to add a new question to the quiz
function addQuestion() {
  const question = questionInput.value.trim();
  const options = [];
  let correctAnswer = null;

  // Get answer options and identify the correct answer
  answerOptions.forEach((option, index) => {
    const optionValue = option.value.trim();
    if (optionValue) {
      options.push(optionValue);
      if (option.checked) {
        correctAnswer = index;
      }
    }
  });

  // Validate input
  if (!question || options.length < 2 || correctAnswer === null) {
    alert('Please fill in all fields and select the correct answer.');
    return;
  }

  // Add the new question to the quiz data
  quizData[quizData.length - 1].questions.push({
    question: question,
    options: options,
    correctAnswer: correctAnswer
  });

  // Clear input fields and update the UI
  questionInput.value = '';
  answerOptions.forEach(option => {
    option.value = '';
    option.checked = false;
  });

  // Display a success message or update the UI to show the new question
  alert('Question added successfully!');
}

// Event listeners
addQuestionButton.addEventListener('click', addQuestion);

// Submit quiz form
quizForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const newQuiz = {
    category: quizCategory.value,
    questions: []
  };

  // Add questions to the new quiz
  quizData.forEach(question => {
    newQuiz.questions.push(question);
  });

  // Clear the quiz data array
  quizData = [];

  // Add the new quiz to the quizData array
  quizData.push(newQuiz);

  // Store the updated quiz data in local storage
  localStorage.setItem('quizData', JSON.stringify(quizData));

  // Redirect to the homepage or display a success message
  alert('Quiz created successfully!');
  displayFeaturedQuizzes();
  displayCreatedQuizzes();
});

// Function to load a quiz
function loadQuiz(quiz) {
    currentQuestionIndex = 0;
    score = 0;
    questionText.textContent = quiz.questions[currentQuestionIndex].question;
    displayAnswerOptions(quiz.questions[currentQuestionIndex].options);
    quizArea.classList.remove("hidden");
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
