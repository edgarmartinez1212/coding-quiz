let headerEl = document.querySelector("header");
let mainEl = document.querySelector("main");
let containerEl = document.createElement("div");
let footerEl = document.querySelector("footer");
containerEl.setAttribute("class", "container");
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Madrid", "Rome"],
    answer: "Paris",
  },
  {
    question: "Which planet is known as the 'Red Planet'?",
    choices: ["Mars", "Jupiter", "Venus", "Saturn"],
    answer: "Mars",
  },
  {
    question: "What is the largest ocean in the world?",
    choices: ["Pacific Ocean", "Indian Ocean", "Atlantic Ocean", "Arctic Ocean"],
    answer: "Pacific Ocean",
  },
  {
    question: "Who painted the Mona Lisa?",
    choices: ["Leonardo da Vinci", "Pablo Picasso", "Vincent van Gogh", "Michelangelo"],
    answer: "Leonardo da Vinci",
  },
  {
    question: "What is the largest organ in the human body?",
    choices: ["Skin", "Liver", "Heart", "Brain"],
    answer: "Skin",
  },
  {
    question: "What is the chemical symbol for the element gold?",
    choices: ["Au", "Ag", "Go", "Gd"],
    answer: "Au",
  },
  {
    question: "Who wrote the famous play Romeo and Juliet?",
    choices: ["William Shakespeare", "Jane Austen", "Mark Twain", "F. Scott Fitzgerald"],
    answer: "William Shakespeare",
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    choices: ["Japan", "China", "Thailand", "South Korea"],
    answer: "Japan",
  },
  {
    question: "What is the largest mammal on Earth?",
    choices: ["Blue whale", "Elephant", "Giraffe", "Lion"],
    answer: "Blue whale",
  },
  {
    question: "What is the primary language spoken in Brazil?",
    choices: ["Portuguese", "Spanish", "French", "Italian"],
    answer: "Portuguese",
  },
];
let score = 0;
let timerInterval = "";
let secondsLeft = 30;
let iteration = 0;

//   header default - do not delete
let aboutEl = document.createElement("h3");
let viewScoresEl = document.createElement("h3");
let timerEl = document.createElement("h3");
let choicesDiv = document.createElement("div");
aboutEl.textContent = "About";
viewScoresEl.textContent = "View Scores";
viewScoresEl.setAttribute("style", "cursor: pointer");
viewScoresEl.setAttribute("class", "viewScoresEl");
timerEl.setAttribute("class", "timerEl");
headerEl.appendChild(viewScoresEl);
headerEl.appendChild(aboutEl);
headerEl.appendChild(timerEl);

// main default
let titleEl = document.createElement("h1");
let startBtn = document.createElement("button");
titleEl.setAttribute("class", "titleEl");
startBtn.setAttribute("class", "startBtn button");
mainEl.append(titleEl, containerEl);

// need to add about to footer describing the project
// footer default
// let resultEl = document.createElement("h3");
// footerEl.appendChild(resultEl);

// ends quiz-
function endQuiz() {
  clearContainerEl();

  if (secondsLeft === 0) {
    titleEl.textContent = "Times Up!";
  } else {
    titleEl.textContent = "Quiz Over";
  }
  secondsLeft = "--";
  timerEl.textContent = `Time: ${secondsLeft}`;

  clearInterval(timerInterval);
  createForm();
}

// creates score submission form
function createForm() {
  clearContainerEl();

  let scoreEl = document.createElement("h3");
  let scoreForm = document.createElement("form");
  let scoreInput = document.createElement("input");
  let scoreBtn = document.createElement("button");
  scoreEl.textContent = `Your Score: ${score}`;
  scoreInput.placeHolder = "Enter Initials";
  scoreBtn.textContent = "Submit Score";
  scoreForm.append(scoreInput, scoreBtn);
  containerEl.append(scoreEl, scoreForm);

  scoreBtn.addEventListener("click", function (event) {
    event.preventDefault();

    let scoresArr = localStorage.getItem("scores");
    if (scoresArr) {
      scoresArr = JSON.parse(scoresArr);
    } else {
      scoresArr = [];
    }
    scoresArr.push({ name: scoreInput.value, highScore: score });
    localStorage.setItem("scores", JSON.stringify(scoresArr));

    scoreForm.removeChild(scoreInput);
    scoreForm.removeChild(scoreBtn);
    let homeBtn = document.createElement("button");
    titleEl.textContent = "Score submitted! Thank you!";
    homeBtn.textContent = "Home";
    scoreForm.appendChild(homeBtn);
    homeBtn.addEventListener("click", init);
  });
}

// starts timer - decrements seconds
function startTimer() {
  timerInterval = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = `Time: ${secondsLeft}`;
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

// validates users answer
function validate(event) {
  let buttonCardEl = document.querySelector(".buttonCardEl");
  let waitTime = 1;
  let wait = setInterval(function () {
    waitTime--;
    if (waitTime === 0) {
      clearInterval(wait);
      updateQuestion();
      //   resultEl.textContent = "";
    }
  }, 1000);
  let choicesArr = buttonCardEl.childNodes;
  for (let i = 0; i < buttonCardEl.childElementCount; i++) {
    choicesArr[i].removeEventListener("click", validate);
    if (choicesArr[i].textContent === questions[iteration].answer) {
      //   choicesArr[i].setAttribute("style", "border: 2px solid green");
      choicesArr[i].setAttribute("style", "background-color: green");
    } else {
      //   choicesArr[i].setAttribute("style", "border: 2px solid red");
      choicesArr[i].setAttribute("style", "background-color: red");
    }
  }
  //   if (event.target.textContent === questions[iteration].answer) {
  //     resultEl.textContent = "Correct!";
  //     score++;
  //   } else {
  //     resultEl.textContent = "Wrong Answer!";
  //   }
  iteration++;
}

// updates question with next in array- ends quiz if end of question array
function updateQuestion() {
  if (iteration < questions.length) {
    let buttonCardEl = document.querySelector(".buttonCardEl");
    titleEl.textContent = questions[iteration].question;
    let choicesArr = buttonCardEl.childNodes;
    for (let i = 0; i < choicesArr.length; i++) {
      choicesArr[i].textContent = questions[iteration].choices[i];
      choicesArr[i].setAttribute("id", "questionChoice");
      choicesArr[i].setAttribute("value", questions[iteration].choices[i]);
      choicesArr[i].addEventListener("click", validate);
      choicesArr[i].setAttribute("style", "border: revert");
    }
  } else {
    endQuiz();
  }
}

// creates the question card
function createCard() {
  //   clearContainerEl();

  let buttonCardEl = document.createElement("div");
  buttonCardEl.setAttribute("class", "buttonCardEl");
  for (let i = 0; i < questions[iteration].choices.length; i++) {
    let buttonEl = document.createElement("button");
    buttonEl.addEventListener("click", validate);
    buttonEl.setAttribute("id", "");
    buttonEl.setAttribute("class", "buttonEl button");
    buttonCardEl.append(buttonEl);
  }
  containerEl.appendChild(buttonCardEl);
  updateQuestion();
}

// handles view scores button click event- shows high scores or no scores
function handleViewScores() {
  clearInterval(timerInterval);
  clearContainerEl();
  clearContainerEl();
  score = 0;
  //   secondsLeft = 30;
  iteration = 0;
  //   timerEl.textContent = `Time: ${secondsLeft}`;

  let scoresArr = localStorage.getItem("scores");
  let highScoreDiv = document.createElement("div");

  if (scoresArr) {
    scoresArr = JSON.parse(scoresArr);
    scoresArr.sort((a, b) => b.highScore - a.highScore);
    titleEl.textContent = "High Scores";

    for (let i = 0; i < scoresArr.length; i++) {
      let scoreEl = document.createElement("h4");
      scoreEl.textContent = `${i + 1}. ${scoresArr[i].name} - ${scoresArr[i].highScore} points`;
      highScoreDiv.appendChild(scoreEl);
    }
  } else {
    titleEl.textContent = "No Scores";
  }
  let homeBtn = document.createElement("button");
  homeBtn.textContent = "Home";
  homeBtn.setAttribute("class", "button");
  homeBtn.addEventListener("click", init);
  highScoreDiv.appendChild(homeBtn);
  containerEl.appendChild(highScoreDiv);
}

// starts quiz
function startQuiz() {
  containerEl.removeChild(startBtn);
  createCard();
  startTimer();
}

// clears the containerEl div
function clearContainerEl() {
  let choicesArr = containerEl.childNodes;
  for (let i = 0; i < choicesArr.length; i++) {
    choicesArr[i].remove();
  }
}

function handleAbout() {
  clearContainerEl();
  clearInterval(timerInterval);
  score = 0;
  secondsLeft = 30;
  iteration = 0;
  timerEl.textContent = `Time: ${secondsLeft}`;
  titleEl.textContent = "About the Quiz";
  let aboutDiv = document.createElement("div");
  let aboutMsg = document.createElement("h5");
  aboutMsg.innerHTML =
    "Welcome to my quiz website! I have created this platform to showcase my proficiency in HTML, CSS, and JavaScript. With the primary goal of utilizing the Document Object Model (DOM), I have leveraged its power to dynamically generate and manipulate all elements within the site.<br><br>Through this website, you can put your knowledge to the test by engaging in my quiz. The quiz is crafted with questions from various subjest and multiple-choice options to challenge your intellect and entertain you simultaneously.<br><br>By employing HTML, I have laid the foundation of the site's structure, ensuring a well-organized and accessible user interface. CSS comes into play to add visual appeal, enhancing the overall aesthetics and creating an engaging user experience. The true magic, however, happens with JavaScript, where I harness the DOM to dynamically generate quiz questions, handle user interactions, calculate scores, and provide instant feedback.<br><br>With this website, I aim to demonstrate my skills in web development and provide an interactive and enjoyable experience for quiz enthusiasts. So, dive in, explore the quiz, and put your knowledge to the test! Enjoy the journey of learning and entertainment through the synergy of HTML, CSS, and JavaScript-powered elements that bring this quiz site to life.<br><br>not responsive";
  aboutDiv.appendChild(aboutMsg);
  containerEl.appendChild(aboutDiv);
}

// default state
function init() {
  clearContainerEl();
  clearInterval(timerInterval);

  score = 0;
  secondsLeft = 30;
  iteration = 0;

  titleEl.textContent = "Welcome to my quiz!";
  timerEl.textContent = `Time: ${secondsLeft}`;
  footerEl.textContent = "";
  startBtn.textContent = "Start";
  containerEl.appendChild(startBtn);
}

startBtn.addEventListener("click", startQuiz);
viewScoresEl.addEventListener("click", handleViewScores);
aboutEl.addEventListener("click", handleAbout);
timerEl.addEventListener("click", init);

init();
// GOAL - build site without needing to refresh page
