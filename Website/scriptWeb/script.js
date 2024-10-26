const featuredQuizzes = document.getElementById('featured-quizzes').querySelector('.quiz-list');
const quizLibrary = document.getElementById('quiz-library').querySelector('.quiz-list');
const quizForm = document.getElementById('quiz-form');
const questionsContainer = document.getElementById('questions-container');
const addQuestionButton = document.getElementById('add-question');

let quizzes = []; // Array to store created quizzes

// Function to create a quiz card for display
function createQuizCard(quiz) {
    const card = document.createElement('div');
    card.classList.add('quiz-card');
    card.innerHTML = `
        <h3>${quiz.title}</h3>
        <p>Category: ${quiz.category}</p>
        <button>Take Quiz</button>
    `;
    return card;
} 

// Function to display a quiz (for featured and library quizzes)
function displayQuiz(quiz) {
    let currentQuestionIndex = 0;
    let score = 0;

    const quizContainer = document.createElement('div');
    quizContainer.classList.add('quiz-container');

    const questionElement = document.createElement('h3');
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options');
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Submit';
    const resultElement = document.createElement('p');

    function displayQuestion() {
        const currentQuestion = quiz.questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsContainer.innerHTML = ''; // Clear previous options

        currentQuestion.options.forEach((option, index) => {
            const optionLabel = document.createElement('label');
            const optionInput = document.createElement('input');
            optionInput.type = 'radio';
            optionInput.name = 'answer';
            optionInput.value = option;
            optionInput.id = `option-${index}`;
            optionLabel.htmlFor = `option-${index}`;
            optionLabel.textContent = option;
            optionsContainer.appendChild(optionInput);
            optionsContainer.appendChild(optionLabel);
        });

        resultElement.textContent = ''; // Clear result message
    }

    function checkAnswer() {
        const selectedOption = document.querySelector('input[name="answer"]:checked');
        if (selectedOption) {
            const userAnswer = selectedOption.value;
            const correctAnswer = quiz.questions[currentQuestionIndex].answer;

            if (userAnswer === correctAnswer) {
                score++;
                resultElement.textContent = 'Correct!';
            } else {
                resultElement.textContent = `Incorrect. The correct answer is: ${correctAnswer}`;
            }

            currentQuestionIndex++;
            if (currentQuestionIndex < quiz.questions.length) {
                displayQuestion();
            } else {
                resultElement.textContent = `Quiz finished! Your score is: ${score}/${quiz.questions.length}`;
                submitButton.disabled = true; // Disable submit button
            }
        } else {
            resultElement.textContent = 'Please select an answer.';
        }
    }

    // Initial setup
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsContainer);
    quizContainer.appendChild(submitButton);
    quizContainer.appendChild(resultElement);
    displayQuestion();

    submitButton.addEventListener('click', checkAnswer);
    return quizContainer;
} 

// Function to add a new question field
function addQuestionField() {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question-field');
    questionDiv.innerHTML = `
        <label for="question-${quizzes.length}">Question:</label>
        <input type="text" id="question-${quizzes.length}" name="question-${quizzes.length}" required>
        <label for="answer-${quizzes.length}">Answer:</label>
        <select id="answer-${quizzes.length}" name="answer-${quizzes.length}" required>
            <option value="">Select Correct Answer</option>
            <option value="option-1-${quizzes.length}">Option 1</option>
            <option value="option-2-${quizzes.length}">Option 2</option>
            <option value="option-3-${quizzes.length}">Option 3</option>
        </select>
        <p><p/>
        <label for="option-1-${quizzes.length}">Option 1:</label>
        <input type="text" id="option-1-${quizzes.length}" name="option-1-${quizzes.length}" required>
        <label for="option-2-${quizzes.length}">Option 2:</label>
        <input type="text" id="option-2-${quizzes.length}" name="option-2-${quizzes.length}" required>
        <label for="option-3-${quizzes.length}">Option 3:</label>
        <input type="text" id="option-3-${quizzes.length}" name="option-3-${quizzes.length}" required>
    `;
    questionsContainer.appendChild(questionDiv);
}

// Event listener for adding a new question
addQuestionButton.addEventListener('click', addQuestionField);

// Event listener for creating a new quiz
quizForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form from submitting normally

    // Get quiz data from form
    const title = document.getElementById('quiz-title').value;
    const category = document.getElementById('quiz-category').value;
    const questions = [];

    // Get questions, answers, and options from form
    const questionFields = document.querySelectorAll('.question-field');
    questionFields.forEach(field => {
        const question = field.querySelector('#question-' + quizzes.length).value;
        const answer = field.querySelector('#answer-' + quizzes.length).value;
        const option1 = field.querySelector('#option-1-' + quizzes.length).value;
        const option2 = field.querySelector('#option-2-' + quizzes.length).value;
        const option3 = field.querySelector('#option-3-' + quizzes.length).value;

        questions.push({
            question: question,
            answer: answer,
            options: [option1, option2, option3]
        });
    });

    // Create new quiz object
    const newQuiz = { title, category, questions };

    // Add quiz to the quizzes array
    quizzes.push(newQuiz);

    // Add quiz card to the library (with quiz taking functionality)
    const quizCard = createQuizCard(newQuiz);
    quizCard.querySelector('button').addEventListener('click', () => {
        const quizContainer = displayQuiz(newQuiz);
        quizLibrary.appendChild(quizContainer); // Add the quiz container to the library section
    });
    quizLibrary.appendChild(quizCard);

    // Clear the quiz form
    quizForm.reset();

    // Add a new question field (optional)
    addQuestionField();

    // Save quizzes to local storage (optional)
    // localStorage.setItem('quizzes', JSON.stringify(quizzes));
});

// Example featured quizzes (you can add more)
const featuredQuizzesData = [
    { title: "History Quiz", category: "History", questions: [
        { question: "In what year did World War II begin?", answer: "1939", options: ["1939", "1941", "1945", "1914"] },
        { question: "Who was the first president of the United States?", answer: "George Washington", options: ["George Washington", "Abraham Lincoln", "Thomas Jefferson", "John Adams"] },
        { question: "What is the capital of France?", answer: "Paris", options: ["Paris", "Berlin", "Rome", "Madrid"] }
    ] },
    { title: "Science Quiz", category: "Science", questions: [
        { question: "What is the chemical symbol for water?", answer: "H2O", options: ["H2O", "CO2", "O2", "N2"] },
        { question: "What is the largest planet in our solar system?", answer: "Jupiter", options: ["Jupiter", "Saturn", "Mars", "Venus"] },
        { question: "What is the name of the process by which plants make food?", answer: "Photosynthesis", options: ["Photosynthesis", "Respiration", "Fermentation", "Transpiration"] }
    ] },
    { title: "Movie Trivia", category: "Movies", questions: [
        { question: "What is the name of the fictional city in the Batman movies?", answer: "Gotham City", options: ["Gotham City", "Metropolis", "Central City", "Star City"] },
        { question: "Who played the role of Harry Potter in the movies?", answer: "Daniel Radcliffe", options: ["Daniel Radcliffe", "Rupert Grint", "Emma Watson", "Tom Felton"] },
        { question: "What is the name of the iconic spaceship in Star Wars?", answer: "Millennium Falcon", options: ["Millennium Falcon", "Death Star", "X-Wing", "TIE Fighter"] }
    ] }
];

// Display featured quizzes
featuredQuizzesData.forEach(quiz => {
    const card = createQuizCard(quiz);
    card.querySelector('button').addEventListener('click', () => {
        const quizContainer = displayQuiz(quiz);
        featuredQuizzes.appendChild(quizContainer); // Add the quiz container to the featured section
    });
    featuredQuizzes.appendChild(card);
});

// Add an initial question field
addQuestionField();

// Load quizzes from local storage (optional)
    const storedQuizzes = localStorage.getItem('quizzes');
    if (storedQuizzes) {
     quizzes = JSON.parse(storedQuizzes);
     quizzes.forEach(quiz => {
         const quizCard = createQuizCard(quiz);
         quizCard.querySelector('button').addEventListener('click', () => {
             const quizContainer = displayQuiz(quiz);
             quizLibrary.appendChild(quizContainer); // Add the quiz container to the library section
         });
         quizLibrary.appendChild(quizCard);
     });
 }

