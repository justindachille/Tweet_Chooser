var score = 0;
var questionCount = 1;
var startTime;
var actualTweetResults;
var fakeTweetResults;
var fakeTweetResultsData;
var numCorrect = 0;
var totalQuestions = 5;

document.addEventListener('DOMContentLoaded', function () {
  initialize();
}, false);

function initialize() {
  showSplash();
  parseLocalTweets();
  parseFakeTweets();
}

function enter() {
  showGame();
  updateScoreText();
}

function showSplash() {
  document.getElementById("splash").style.display = "block";
  document.getElementById("game").style.display = "none";
  document.getElementById("results").style.display = "none";
}

function showGame() {
  document.getElementById("splash").style.display = "none";
  document.getElementById("game").style.display = "block";
  document.getElementById("results").style.display = "none";
  setUpButtons();
}

function showResults() {
  document.getElementById("splash").style.display = "none";
  document.getElementById("game").style.display = "none";
  document.getElementById("results").style.display = "block";
  document.getElementById("results-text").innerHTML = "Congratulations, game finished. You scored " + score.toFixed(0) + "!" + " \You got " + numCorrect + " correct out of " + totalQuestions + " total questions.";
}

function restart() {
  resetValues();
  showGame();
  updateScoreText();
}

function resetValues() {
  score = 0;
  questionCount = 1;
  numCorrect = 0;
  startTime = Date.now();
}

function answer(button) {
  var currentTime = Date.now();
  var timeDiff = currentTime - startTime;
  var currentScore = 5000 / ((0.03 * timeDiff) + 5);
  currentScore += 300;

  if (button.classList.contains("right")) {
    score += currentScore;
    numCorrect++;
  }
  var button1 = document.getElementById("answer1");
  var button2 = document.getElementById("answer2");
  button1.classList.remove("right");
  button2.classList.remove("right");

  if (questionCount === totalQuestions) {
    showResults();
  }
  questionCount++;
  updateScoreText();
  setUpButtons();
}

function updateScoreText() {
  var scoreText = document.getElementById("score");
  scoreText.innerHTML = score.toFixed(0);
  var questionText = document.getElementById("question-num");
  questionText.innerHTML = "Question " + questionCount + " Of " + totalQuestions;
}

function resetButtons(answerText1, answerText2) {
  var randomNum = Math.random();
  var button1 = document.getElementById("answer1");
  var button2 = document.getElementById("answer2");


  if (randomNum > 0.5) {
    button1.innerHTML = answerText1;
    button2.innerHTML = answerText2;
    button2.classList.add("right");
  } else {
    button1.innerHTML = answerText2;
    button2.innerHTML = answerText1;
    button1.classList.add("right");
  }

  startTime = Date.now();
}

function setUpButtons() {
  //Getting actual tweets
  var randomTweetNum = getRandomArbitrary(1, actualTweetResults.data.length);
  randomTweetNum = Math.floor(randomTweetNum);

  //Getting fake tweets
  var randomFakeTweetNum = getRandomArbitrary(1, fakeTweetResults.data.length);
  randomFakeTweetNum = Math.floor(randomFakeTweetNum);

  var realTweet = actualTweetResults.data[randomTweetNum][4];
  var fakeTweet = fakeTweetResults.data[randomFakeTweetNum][0];
  fakeTweet = removeWhiteSpaces(fakeTweet);

  //  console.log(fakeTweetResults.data[2][0]);
  //  console.log("text: " + actualTweetResults.data[randomTweetNum][4]);
  resetButtons(realTweet, fakeTweet);
}

function removeWhiteSpaces(text) {
  return text.replace(/\s+/g, " ");
}

function parseLocalTweets() {
  var url = "./resources/trumptweets.csv";
  var parsedTweets = Papa.parse(url, {
    download: true,
    complete: function (results) {
      parseTweetData(results);
    }
  });
}

function parseFakeTweets() {
  var url = "./resources/faketweets.csv";
  var parsedTweets = Papa.parse(url, {
    download: true,
    complete: function (results2) {
      parseFakeTweetData(results2);
    }
  });

}

function parseTweetData(results) {
  actualTweetResults = results;
}

function parseFakeTweetData(results2) {
  fakeTweetResults = results2;
  fakeTweetResultsData = results2.data;
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
