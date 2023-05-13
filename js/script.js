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

// header default - do not remove
let viewScoresEl = document.createElement("h3");
let timerEl = document.createElement("h3");
let secondsLeft = 30;
let iteration = 0;
viewScoresEl.textContent = "View Scores";
timerEl.textContent = `Time: ${secondsLeft}`;
headerEl.appendChild(viewScoresEl);
headerEl.appendChild(timerEl);

// main default
let titleEl = document.createElement("h1");
let startButton = document.createElement("button");
titleEl.textContent = "Welcome to my Quiz!";
startButton.textContent = "START";
// startButton.setAttribute("id", "startButton");
mainEl.append(titleEl, startButton);

function validate(event) {
  let reusltEl = document.createElement("h3");
  if (event.target.textContent === questions[iteration].answer) {
    reusltEl.textContent = "Correct!";
  } else {
    reusltEl.textContent = "Wrong Answer!";
  }
  footerEl.appendChild(reusltEl);
}

function createCard() {
  mainEl.removeChild(startButton);
  titleEl.textContent = questions[iteration].question;
  for (let i = 0; i < 4; i++) {
    let buttonEl = document.createElement("button");
    buttonEl.textContent = questions[iteration].choices[i];
    mainEl.append(buttonEl);
    buttonEl.addEventListener("click", validate);
  }
}

function startTimer() {
  let timerInterval = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = `Time: ${secondsLeft}`;
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      console.log(score);
    }
  }, 1000);
}

function startQuiz() {
  startTimer();
  createCard();
}

startButton.addEventListener("click", startQuiz);
