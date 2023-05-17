let headerEl = document.querySelector("header");
let mainEl = document.querySelector("main");
let footerEl = document.querySelector("footer");
let questions = [
  {
    question: "What color is the sky?",
    choices: ["Blue", "Orange", "Yellow", "Red"],
    answer: "Blue",
  },
  {
    question: "What color is space?",
    choices: ["Blue", "Black", "Yellow", "Red"],
    answer: "Black",
  },
  {
    question: "What color is the sun?",
    choices: ["Blue", "Orange", "Yellow", "Red"],
    answer: "Yellow",
  },
];
let score = 0;
let timerInterval = "";
// localStorage.setItem("scores", JSON.stringify([]));

// header default - do not remove
let viewScoresEl = document.createElement("h3");
let timerEl = document.createElement("h3");
let choicesDiv = document.createElement("div");
let secondsLeft = 30;
let iteration = 0;
viewScoresEl.textContent = "View Scores";
viewScoresEl.setAttribute("style", "cursor: pointer");
timerEl.textContent = `Time: ${secondsLeft}`;
headerEl.appendChild(viewScoresEl);
headerEl.appendChild(timerEl);

// main default
let defaultDiv = document.createElement("div");
let titleEl = document.createElement("h1");
let startButton = document.createElement("button");
titleEl.textContent = "Welcome to my Quiz!";
startButton.textContent = "Start";
defaultDiv.append(titleEl, startButton);
mainEl.appendChild(defaultDiv);

// main quizStart

// main - form
let scoresFormEl = document.createElement("form");
let nameTextEl = document.createElement("input");
let scoresSubmitEl = document.createElement("button");
nameTextEl.placeholder = "Enter your name";
scoresSubmitEl.textContent = "Submit";
scoresFormEl.append(nameTextEl, scoresSubmitEl);
// mainEl.append(scoresFormEl);
scoresSubmitEl.addEventListener("click", handleSubmit);
function handleSubmit(event) {
  event.preventDefault();

}

// main - view scores
let viewScoresDiv = document.createElement("div");
let scoresTitleEl = document.createElement("h2");
let scoresEl = document.createElement("h4");
let reviewScoresEl = document.createElement("button");
scoresTitleEl.textContent = "Top Scores";
reviewScoresEl.textContent = "View";
viewScoresDiv.append(scoresTitleEl, reviewScoresEl);
mainEl.append(viewScoresDiv);
reviewScoresEl.addEventListener("click", function () {
  let scoresArr = JSON.parse(localStorage.getItem("scores"));
  let topScores = [];
  for (let i = 0; i < scoresArr.length; i++) {}
});

// footer default
let reusltEl = document.createElement("h3");
footerEl.appendChild(reusltEl);

// ends quiz- removes choicesDiv, displays score
function endQuiz() {
  if (secondsLeft === 0) {
    titleEl.textContent = "Times Up!";
  } else {
    titleEl.textContent = "Quiz Over";
  }
  secondsLeft = "--";
  timerEl.textContent = `Time: ${secondsLeft}`;
  mainEl.removeChild(choicesDiv);
  console.log(score);
  clearInterval(timerInterval);

  let scoreEl = document.createElement("h3");
  scoreEl.textContent = `Your Score: ${score}`;
  mainEl.appendChild(scoreEl);
}

// validates choice with correct answer- updates question, increments iteration
function validate(event) {
  console.log(event);

  let waitTime = 1;
  let wait = setInterval(function () {
    waitTime--;
    if (waitTime === 0) {
      clearInterval(wait);
      updateQuestion();
      reusltEl.textContent = "";
    }
  }, 1000);

  let choicesArr = choicesDiv.childNodes;
  for (let i = 0; i < choicesDiv.childElementCount; i++) {
    choicesArr[i].removeEventListener("click", validate);
    if (choicesArr[i].textContent === questions[iteration].answer) {
      choicesArr[i].setAttribute("style", "border: 3px solid green");
    } else {
      choicesArr[i].setAttribute("style", "border: 3px solid red");
    }
  }

  if (event.target.textContent === questions[iteration].answer) {
    reusltEl.textContent = "Correct!";
    score++;
  } else {
    reusltEl.textContent = "Wrong Answer!";
  }
  iteration++;
}

// updates card- title and questions
function updateQuestion() {
  if (iteration < questions.length) {
    titleEl.textContent = questions[iteration].question;
    let choicesArr = choicesDiv.childNodes;
    for (let i = 0; i < choicesArr.length; i++) {
      choicesArr[i].addEventListener("click", validate);
      choicesArr[i].textContent = questions[iteration].choices[i];
      choicesArr[i].setAttribute("id", questions[iteration].choices[i]);
      choicesArr[i].setAttribute("style", "border: revert");
    }
  } else {
    endQuiz();
  }
}

// creates card- removes button, creates and appends 4 buttons to choicesDiv (globall), appends choicesDiv to mainEl
function createCard() {
  for (let i = 0; i < questions[iteration].choices.length; i++) {
    let buttonEl = document.createElement("button");
    choicesDiv.append(buttonEl);
    buttonEl.addEventListener("click", validate);
    buttonEl.setAttribute("id", "");
  }
  mainEl.appendChild(choicesDiv);
  updateQuestion();
}

// starts timer - decrements seconds, ends quiz at 0 seconds
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

// removes the start button if appended to mainEl
function removeStartButton() {
  if (mainEl.contains(startButton)) {
    mainEl.removeChild(startButton);
  }
}

// starts quiz - creates card
function startQuiz() {
  startTimer();
//   removeStartButton();
  createCard();
}

startButton.addEventListener("click", startQuiz);
timerEl.addEventListener("click", function () {
  location.reload();
});
