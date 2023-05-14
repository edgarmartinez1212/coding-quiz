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
localStorage.setItem("scores", []);
let score = 0;
let timerInterval = "";

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
let titleEl = document.createElement("h1");
let startButton = document.createElement("button");
titleEl.textContent = "Welcome to my Quiz!";
startButton.textContent = "START";
mainEl.append(titleEl, startButton);

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

function removeStartButton() {
  if (mainEl.contains(startButton)) {
    mainEl.removeChild(startButton);
  }
}

// starts quiz - creates card
function startQuiz() {
  startTimer();
  removeStartButton();
  createCard();
}

function handleSubmit(event) {
  event.preventDefault();
  console.log(event);
}

startButton.addEventListener("click", startQuiz);
timerEl.addEventListener("click", function () {
  location.reload();
});
