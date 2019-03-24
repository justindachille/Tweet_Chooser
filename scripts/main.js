var score = 0;
var startTime;

document.addEventListener('DOMContentLoaded', function () {
  initialize();
}, false);

function initialize() {
  showSplash();
  parseLocalTweets();
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
  var scoreText = document.getElementById("score");
  console.log("timeDiff: " + timeDiff);
  var currentScore = 5000 / ((0.03 * timeDiff) + 5);
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

function parseLocalTweets() {
//  var file = document.getElementById('myDOMElementId').files[0];
  var url = "./resources/trumptweets.csv";
//  var file = new File("resources/trumptweets.csv");
  var parsedTweets = Papa.parse(url, {
    download: true,
    complete: function (results) {
      console.log("Finished:", results.data);
    }
  });
}
