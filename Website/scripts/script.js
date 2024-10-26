// Array to store quiz data
const quizzes = [];

// Function to add a new quiz
function addQuiz(question, choices, correctAnswer) {
  const newQuiz = {
    question: question,
    choices: choices,
    correctAnswer: correctAnswer,
  };
  quizzes.push(newQuiz);
}

// Function to display quizzes
function displayQuizzes() {
  const quizContainer = document.getElementById("quiz-container");
  quizContainer.innerHTML = ""; // Clear previous quizzes

  quizzes.forEach((quiz, index) => {
    const quizElement = document.createElement("div");
    quizElement.innerHTML = `
      <h3>Question ${index + 1}: ${quiz.question}</h3>
      <ul>
        ${quiz.choices.map((choice, i) => `<li>${choice}</li>`).join("")}
      </ul>
      <p>Correct Answer: ${quiz.correctAnswer}</p>
    `;
    quizContainer.appendChild(quizElement);
  });
}

// Example: Adding a quiz
addQuiz("What is the capital of France?", ["London", "Paris", "Berlin"], "Paris");

// Displaying the quizzes
displayQuizzes();
