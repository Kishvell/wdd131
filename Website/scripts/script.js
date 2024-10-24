// Example: Dynamically loading featured quizzes
const featuredQuizzesContainer = document.getElementById("featured-quizzes");
const featuredQuizzes = [
    { title: "General Knowledge", image: "images/GKQ.jpg" },
    { title: "History", image: "images/HQ.jpg" },
];

featuredQuizzes.forEach(quiz => {
    const quizElement = document.createElement("div");
    quizElement.innerHTML = `
        <h3>${quiz.title}</h3>
        <img src="${quiz.image}" alt="${quiz.title} Quiz" loading="lazy">
        <a href="quiz.html?quizId=${quiz.id}">Take the Quiz</a>
    `;
    featuredQuizzesContainer.appendChild(quizElement);
});

// Example: Loading quiz categories
const quizCategoriesContainer = document.getElementById("quiz-categories");
const quizCategories = [
    "General Knowledge",
    "History",
    "Science",
];

quizCategories.forEach(category => {
    const categoryElement = document.createElement("div");
    categoryElement.innerHTML = `
        <h3>${category}</h3>
        <a href="quiz-categories.html?category=${category}">Explore Quizzes</a>
    `;
    quizCategoriesContainer.appendChild(categoryElement);
});
