var quiz = [
  {
    question:" Commonly used data types DO NOT include: ",
    choices:['Strings', 'Booleans', 'Alerts', 'Numbers'],
    correctAnswer: 'Alerts'
  },
  {
    question:" The condition in an if/else statement is enclosed with: ",
    choices:['Quotes', 'Curly Brackets', 'Parenthesis', ' Square Brackets'],
    correctAnswer: 'Curly Brackets'
  },
  {
    question:" Arrays in JavaScript can be used to store:",
    choices:['Numbers and Strings', 'other Arrays', 'Booleans', 'All of the above'],
    correctAnswer: 'All of the above'
  },
  {
    question:" String values must be enclosed within ____ when being assigned to variables",
    choices:['Commas', 'Curly Brackets', 'Quotes', 'Paranthesis'],
    correctAnswer: 'Quotes'
  },
  {
    question:" A very useful tool durring development and debugging for printing content to the debugger is:",
    choices:['JavaScript', 'Terminal/Bash', 'for loops', 'console.log'],
    correctAnswer: 'console.log'
  },

];

var currentQuestion = 0;
var score = 0;
var quizContainer = document.getElementById('choices');
var questionContainer = document.getElementById('question');
var resultsContainer = document.getElementById('result');
var submitButton = document.getElementById('submit');
var title = document.getElementById('title');
var intro = document.getElementById('intro');
var startButton = document.getElementById('startButton');


function showQuestion() {
  questionContainer.textContent = quiz[currentQuestion].question;
  quizContainer.innerHTML = "";
  for (var i = 0; i < quiz[currentQuestion].choices.length; i++) {
    var li = document.createElement('li');
    var input = document.createElement('input');
    var label = document.createElement('label');
    input.type = "radio";
    input.name = "quiz";
    input.value = quiz[currentQuestion].choices[i];
    label.textContent = quiz[currentQuestion].choices[i];
    li.appendChild(input);
    li.appendChild(label);
    quizContainer.appendChild(li);
  }
}

function checkAnswers() {
  var answer = quizContainer.querySelector("input[name='quiz']:checked").value;
  if(answer === quiz[currentQuestion].correctAnswer) {
    score++;
    resultsContainer.textContent = "correct";
  } else {
    resultsContainer.textContent = "wrong";
  }
  currentQuestion++;
  if(currentQuestion === quiz.length) {
    showScore();
  } else {
    showQuestion();
  }
}

function showScore() {
  questionContainer.textContent = "quiz done";
  quizContainer.innerHTML = "";
  resultsContainer.textContent = "you scored " + score + " out of " + quiz.length;
  submitButton.style.display = 'none';
}

submitButton.addEventListener("click", checkAnswers);

showQuestion();

function startQuiz() {
startButton.addEventListener('click', () => {
  startButton.remove();
  title.remove();
  intro.remove();
})

}

startQuiz();




// this is for the timer

const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
    info : {
        color : 'green'
    },
    warning : {
        color : 'orange',
        threshold : WARNING_THRESHOLD
    },
    alert : {
        color : 'red',
        threshold : ALERT_THRESHOLD
    }
};

const TIME_LIMIT = 60;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
  <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
      <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
      <path
        id="base-timer-path-remaining"
        stroke-dasharray="283"
        class="base-timer__path-remaining ${remainingPathColor}"
        d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
      ></path>
    </g>
  </svg>
  <span id="base-timer-label" class="base-timer__label">${formatTime(
    timeLeft
  )}</span>
</div>
`;

startTimer();

function onTimesUp() {
    clearInterval(timerInterval);
  }
  
  function startTimer() {
    timerInterval = setInterval(() => {
      timePassed = timePassed += 1; 
      timeLeft = TIME_LIMIT - timePassed;
      document.getElementById("base-timer-label").innerHTML = formatTime(
        timeLeft
      );
      setCircleDasharray();
      setRemainingPathColor(timeLeft);
  
      if (timeLeft === 0) {
        onTimesUp();
      }
    }, 1000);
  }
  
  function formatTime(time) {
    const minutes = Math.floor(time / 60);
    let seconds = time % 60;
  
    if (seconds < 10) {
      seconds = `0${seconds}`;
    }
  
    return `${minutes}:${seconds}`;
  }
  
  function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(warning.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(alert.color);
    } else if (timeLeft <= warning.threshold) {
      document
        .getElementById("base-timer-path-remaining")
        .classList.remove(info.color);
      document
        .getElementById("base-timer-path-remaining")
        .classList.add(warning.color);
    }
  }
  
  function calculateTimeFraction() {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
  }
  
  function setCircleDasharray() {
    const circleDasharray = `${(
      calculateTimeFraction() * FULL_DASH_ARRAY
    ).toFixed(0)} 283`;
    document
      .getElementById("base-timer-path-remaining")
      .setAttribute("stroke-dasharray", circleDasharray);
  }
  
// end of timer logic

