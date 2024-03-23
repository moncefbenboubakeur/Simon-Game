var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
let gameStarted = false;
let level = 0;

// Function nextSequence ()
// *****************************************************************************
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  level++;
  $("#level-title").text("Level " + level);
  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  // $("#" + randomChosenColour)
  //   .fadeIn(100)
  //   .fadeOut(100)
  //   .fadeIn(100);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}

// *****************************************************************************

// Function playSound ()
// *****************************************************************************
function playSound(name) {
  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// *****************************************************************************

// Function animatePress ()
// *****************************************************************************
function animatePress(currentColour) {
  //2. Use jQuery to add this pressed class to the button that gets clicked inside animatePress().
  $("#" + currentColour).addClass("pressed");

  //3. use Google/Stackoverflow to figure out how you can use Javascript to remove the pressed class after a 100 milliseconds.
  setTimeout(function () {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

// *****************************************************************************

// Function checkAnswer ()
// *****************************************************************************
function checkAnswer(currentLevel) {
  if (userClickedPattern.length === gamePattern.length) {
    var i = 0;
    var correct = true;
    while (i < gamePattern.length) {
      if (userClickedPattern[i] === gamePattern[i]) {
      } else {
        correct = false;
      }
      i++;
    }

    if (correct) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    } else {
      gameOver();
    }

    userClickedPattern = [];
  } else {
    var i = 0;
    var correct = true;
    while (i < userClickedPattern.length) {
      if (userClickedPattern[i] === gamePattern[i]) {
      } else {
        correct = false;
      }
      i++;
    }

    if (correct) {
    } else {
      gameOver();
    }
  }
}

// *****************************************************************************

// Function gameOver ()
// *****************************************************************************
function startOver() {
  gameStarted = false;
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
}
// *****************************************************************************

// Function switchLevelTitle ()
// *****************************************************************************
function switchLevelTitle() {
  if (!gameStarted) {
    $("#level-title").removeClass("level-title-2rem");
    $("#level-title").addClass("level-title");
  } else {
    $("#level-title").removeClass("level-title");
    $("#level-title").addClass("level-title-2rem");
  }
}
// *****************************************************************************

// Function gameOver ()
// *****************************************************************************
function gameOver() {
  switchLevelTitle();
  $("#level-title").text("Game Over, Press Any Key to Restart");

  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
    playSound("wrong");
  }, 200);

  startOver();
}
// *****************************************************************************

$(document).on("keypress", function (e) {
  let userChosenColour = e.key;
  if (!gameStarted) {
    switchLevelTitle();
    gameStarted = true;
    nextSequence();
  }
});

$(document).on("click", function (e) {
  if (gameStarted) {
    let userChosenColour = e.target.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  } else {
  }
});
