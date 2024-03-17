let buttonColours = ["red", "blue", "green", "yellow"];
let gamePattern = [];

function nextSequence() {}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// function playAudio(key) {
//   switch (key) {
//     case "red":
//       var sound1 = new Audio("./sounds/red.mp3");
//       sound1.play();
//       break;
//     case "blue":
//       var sound2 = new Audio("./sounds/blue.mp3");
//       sound2.play();
//       break;
//     case "green":
//       var sound3 = new Audio("./sounds/green.mp3");
//       sound3.play();
//       break;
//     case "yellow":
//       var sound4 = new Audio("./sounds/yellow.mp3");
//       sound4.play();
//       break;

//     default:
//       console.log(key);
//       break;
//   }
// }

function randomNumberFunction(min, max) {
  return Math.random() * (max - min) + min;
}
//console.log("Random Number between 0 and 3: ");

// Function call
let randomNumber = Math.round(randomNumberFunction(0, 3));
//console.log(randomNumber);

let randomChosenColour = buttonColours[randomNumber];
//console.log(randomChosenColour);

//console.log(randomChosenColour);
gamePattern.push(randomChosenColour);
//console.log(randomChosenColour);

// $("#" + randomChosenColour)
//   .fadeOut()
//   .fadeIn();
//console.log($("#" + randomChosenColour));

// $("#" + randomChosenColour).addClass("flash");
animatePress(randomChosenColour);

document.addEventListener("canplaythrough", (event) => {
  /* the audio is now playable; play it if permissions allow */
  playSound(randomChosenColour);
});

var audio = new Audio();
audio.src = "sounds/" + "yellow" + ".mp3";
// when the sound has been loaded, execute your code
audio.oncanplaythrough = (event) => {
  var playedPromise = audio.play();
  if (playedPromise) {
    playedPromise
      .catch((e) => {
        console.log(e);
        if (e.name === "NotAllowedError" || e.name === "NotSupportedError") {
          console.log(e.name);
        }
      })
      .then(() => {
        console.log("playing sound !!!");
      });
  }
};
