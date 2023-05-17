let headerEl = document.querySelector("header");
let mainEl = document.querySelector("main");
let containerEl = document.createElement("div");
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
let secondsLeft = 30;
let iteration = 0;
// localStorage.setItem("scores", []);

//   header default - do not delete
let viewScoresEl = document.createElement("h3");
let timerEl = document.createElement("h3");
let choicesDiv = document.createElement("div");
viewScoresEl.textContent = "View Scores";
viewScoresEl.setAttribute("style", "cursor: default");

headerEl.appendChild(viewScoresEl);
headerEl.appendChild(timerEl);

// main default
let titleEl = document.createElement("h1");
let startBtn = document.createElement("button");

mainEl.append(titleEl, containerEl);

// footer default
let resultEl = document.createElement("h3");
footerEl.appendChild(resultEl);

// button card
// need to create a button card to add button choices
// without button card running into issues removing children from containerEl
// issue: click view scores when quiz started -> removes children from containerEl but 2!

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
    titleEl.textContent = "Score submitted!\nThank you!";
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
  let waitTime = 1;
  let wait = setInterval(function () {
    waitTime--;
    if (waitTime === 0) {
      clearInterval(wait);
      updateQuestion();
      resultEl.textContent = "";
    }
  }, 1000);
  let choicesArr = containerEl.childNodes;
  for (let i = 0; i < containerEl.childElementCount; i++) {
    choicesArr[i].removeEventListener("click", validate);
    if (choicesArr[i].textContent === questions[iteration].answer) {
      choicesArr[i].setAttribute("style", "border: 3px solid green");
    } else {
      choicesArr[i].setAttribute("style", "border: 3px solid red");
    }
  }
  if (event.target.textContent === questions[iteration].answer) {
    resultEl.textContent = "Correct!";
    score++;
  } else {
    resultEl.textContent = "Wrong Answer!";
  }
  iteration++;
}

// updates question with next in array- ends quiz if end of question array
function updateQuestion() {
  if (iteration < questions.length) {
    titleEl.textContent = questions[iteration].question;
    let choicesArr = containerEl.childNodes;
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

  for (let i = 0; i < questions[iteration].choices.length; i++) {
    let buttonEl = document.createElement("button");
    containerEl.append(buttonEl);
    buttonEl.addEventListener("click", validate);
    buttonEl.setAttribute("id", "");
  }
  updateQuestion();
}

// handles view scores button click event- shows high scores or no scores
function handleViewScores() {
  clearInterval(timerInterval);
  clearContainerEl();
  score = 0;
  secondsLeft = 30;
  iteration = 0;
  timerEl.textContent = `Time: ${secondsLeft}`;

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

// default state
function init() {
  clearContainerEl();

  score = 0;
  secondsLeft = 30;
  iteration = 0;

  titleEl.textContent = "Welcome to my quiz!";
  timerEl.textContent = `Time: ${secondsLeft}`;
  startBtn.textContent = "Start";
  containerEl.appendChild(startBtn);
}

startBtn.addEventListener("click", startQuiz);
viewScoresEl.addEventListener("click", handleViewScores);

init();

// GOAL - build site without needing to refresh page
