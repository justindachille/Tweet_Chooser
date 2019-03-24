var score;
var questionCount;
var startTime;
var actualTweetResults;

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
  setUpButtons();
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
  setUpButtons();
}

function resetButtons(answerText1, answerText2) {
  var randomNum = Math.random();
  var button1 = document.getElementById("answer1");
  var button2 = document.getElementById("answer2");


  if (randomNum > 0.5) {
    button1.innerHTML = answerText1;
    button2.innerHTML = answerText2;
  } else {
    button1.innerHTML = answerText2;
    button2.innerHTML = answerText1;
  }

  startTime = Date.now();
}

function setUpButtons() {
  var randomTweetNum = getRandomArbitrary(1, actualTweetResults.data.length);
  randomTweetNum = Math.floor(randomTweetNum);
  console.log("text: " + actualTweetResults.data[randomTweetNum][4]);
  resetButtons(actualTweetResults.data[randomTweetNum][4], "FIXME");
}

function parseLocalTweets() {
  //  var file = document.getElementById('myDOMElementId').files[0];
  var url = "./resources/trumptweets.csv";
  //  var file = new File("resources/trumptweets.csv");
  var parsedTweets = Papa.parse(url, {
    download: true,
    complete: function (results) {
      parseTweetData(results);
    }
  });
}

function parseTweetData(results) {
  actualTweetResults = results;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
