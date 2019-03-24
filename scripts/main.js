var score = 0;
var startTime;
var scoreText;

document.addEventListener('DOMContentLoaded', function () {
  initialize();
}, false);

function initialize() {
  showSplash();
  scoreText = document.getElementById("score");
}

function enter() {
  showGame();
  resetButtons();
}

function showSplash() {
  document.getElementById("splash").style.display = "block";
  document.getElementById("game").style.display = "none";
}

function showGame() {
  document.getElementById("splash").style.display = "none";
  document.getElementById("game").style.display = "block";
}

function answer(button) {
  console.log(button.innerHTML);
  var currentTime = Date.now();
  var timeDiff = currentTime - startTime;
  scoreText = document.getElementById("score");
  
  var currentScore = 5000 / ((timeDiff / 1000) + 5);
  currentScore *= 100;
  score += currentScore;
  console.log("score: " + currentScore);
  scoreText.innerHTML = "Score: " + score;
  resetButtons();
}

function resetButtons() {
  var button1 = document.getElementById("answer1");
  var button2 = document.getElementById("answer2");
  startTime = Date.now();
}
