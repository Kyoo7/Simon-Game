// 1. Game Variables
const buttonColors = ["red", "green", "blue", "yellow"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

// 2. Start Game on Any Keypress
$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

// 3. Handle Button Clicks
$(".btn").click(function () {
  if (started) {
    const userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);
    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length - 1);
  }
});

// 4. Check Answer
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    startOver();
  }
}

// 5. Generate and Show Next Sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);

  showFullPattern();
}

// 6. Show Full Pattern Function
function showFullPattern() {
  let i = 0;

  // Disable buttons during pattern display
  $(".btn").prop("disabled", true);

  const interval = setInterval(function () {
    if (i >= gamePattern.length) {
      clearInterval(interval);
      $(".btn").prop("disabled", false);
      return;
    }

    $("#" + gamePattern[i])
      .fadeIn(100)
      .fadeOut(100)
      .fadeIn(100);
    playSound(gamePattern[i]);
    i++;
  }, 600);
}

// Helper Functions
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  const audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
