let headerEl = document.querySelector("header");
let mainEl = document.querySelector("main");
let footerEl = document.querySelector("footer");
let secondsLeft = 30;
let score = 0;

let viewScoresEl = document.createElement("h2");
let timerEl = document.createElement("h2");
let startButtonDiv = document.createElement("div");
let startButtonEl = document.createElement("button");
let displayEl = document.createElement("div");
let questionTitle = document.createElement("h1");
let buttonDiv = document.createElement("div");
let validateDiv = document.createElement("div");
let validateSelection = document.createElement("h3");

let iteration = 0;

viewScoresEl.textContent = "View High Scores";
timerEl.textContent = `Time: ${secondsLeft}`;
startButtonEl.textContent = "Start Quiz";

headerEl.appendChild(viewScoresEl);
headerEl.appendChild(timerEl);
mainEl.appendChild(startButtonDiv);
startButtonDiv.appendChild(startButtonEl);
mainEl.appendChild(displayEl);
displayEl.appendChild(questionTitle);
displayEl.appendChild(buttonDiv);
validateDiv.appendChild(validateSelection);
mainEl.appendChild(validateDiv);

let questions = [
  {
    question: "What color is the sky?",
    answers: ["Blue", "Green", "Red", "Yellow"],
    correct: "Blue",
  },
  {
    question: "What color is the sky?",
    answers: ["Blue", "Green", "Red", "Yellow"],
    correct: "Blue",
  },
  {
    question: "What color is the sky?",
    answers: ["Blue", "Green", "Red", "Yellow"],
    correct: "Blue",
  },
];

// timer - counts down from 30
function startTimer() {
  start();
  let timerInterval = setInterval(function () {
    secondsLeft--;
    timerEl.textContent = `Time: ${secondsLeft}`;
    if (secondsLeft === 0) {
      clearInterval(timerInterval);
      console.log(score);
    }
  }, 1000);
}

// validates the chosen answer
function validate(event) {
  let result = event.target.value === questions[0].correct;
  validateSelection.textContent = result;
  if (result) score++;
}

function check(){
    buttonDiv.removeChild(buttonDiv.children[0]);
}

// creates card
function createCard() {
  let button1 = document.createElement("button");
  button1.setAttribute("value", questions[0].answers[0]);
  buttonDiv.append(button1);
  button1.addEventListener("click", check);

  //   questionTitle.textContent = questions[0].question;
  //   let button1 = document.createElement("button");
  //   let button2 = document.createElement("button");
  //   let button3 = document.createElement("button");
  //   let button4 = document.createElement("button");
  //   button1.textContent = questions[0].answers[0];
  //   button2.textContent = questions[0].answers[1];
  //   button3.textContent = questions[0].answers[2];
  //   button4.textContent = questions[0].answers[3];
  //   button1.setAttribute("value", questions[0].answers[0]);
  //   button2.setAttribute("value", questions[0].answers[1]);
  //   button3.setAttribute("value", questions[0].answers[2]);
  //   button4.setAttribute("value", questions[0].answers[3]);
  //   buttonDiv.append(button1);
  //   buttonDiv.append(button2);
  //   buttonDiv.append(button3);
  //   buttonDiv.append(button4);
  //   button1.addEventListener("click", validate);
  //   button2.addEventListener("click", validate);
  //   button3.addEventListener("click", validate);
  //   button4.addEventListener("click", validate);
}

// starts quiz - calls createCard() and hides start button
function start() {
  createCard();
  startButtonEl.setAttribute("style", "display: none;");
}

startButtonEl.addEventListener("click", startTimer);
