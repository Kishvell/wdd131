const quizForm = document.getElementById('quiz-form');
const questionsContainer = document.getElementById('questions-container');
const addQuestionButton = document.getElementById('add-question');

let questionCount = 1;

addQuestionButton.addEventListener('click', () => {
  questionCount++;
  const questionElement = document.createElement('div');
  questionElement.innerHTML = `
    <label for="question-${questionCount}">Question ${questionCount}:</label>
    <input type="text" id="question-${questionCount}" name="question-${questionCount}" required>

    <label for="option1-${questionCount}">Option 1:</label>
    <input type="text" id="option1-${questionCount}" name="option1-${questionCount}" required>

    <label for="option2-${questionCount}">Option 2:</label>
    <input type="text" id="option2-${questionCount}" name="option2-${questionCount}" required>

    <label for="option3-${questionCount}">Option 3:</label>
    <input type="text" id="option3-${questionCount}" name="option3-${questionCount}" required>

    <label for="option4-${questionCount}">Option 4:</label>
    <input type="text" id="option4-${questionCount}" name="option4-${questionCount}" required>

    <label for="correct-answer-${questionCount}">Correct Answer:</label>
    <select id="correct-answer-${questionCount}" name="correct-answer-${questionCount}">
      <option value="option1-${questionCount}">Option 1</option>
      <option value="option2-${questionCount}">Option 2</option>
      <option value="option3-${questionCount}">Option 3</option>
      <option value="option4-${questionCount}">Option 4</option>
    </select>
  `;
  questionsContainer.appendChild(questionElement);
});

quizForm.addEventListener('submit', (event) => {
  event.preventDefault();
  // Gather quiz data from the form
  // Store quiz data (e.g., in local storage or a database)
  // Update quiz categories section in quiz-categories.html
});
