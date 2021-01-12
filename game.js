var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var isStarted = false;

//check if any key pressed form the keyboard to start the game. 
$(document).keydown(function (event) {

  if (isStarted === false) {
    $("h1").text("Level " + level);
    nextSequence();
    isStarted = true;
  }
});

$(".btn").on("click", function () {
  var userChosenColor = this.id; // or $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  $("#" + userChosenColor)
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

//to generate random sequence.
function nextSequence() {
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor)             //to highlight the random choosen button
    .fadeOut(100)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColor);
}

//to check the user's sequence with the game pattern
function checkAnswer(indexOfUserChoosenColor) {
  if (gamePattern[indexOfUserChoosenColor] === userClickedPattern[indexOfUserChoosenColor]) {

    //to check if the user followed game pattern completely
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(() => {
        nextSequence();
      }, 1000);
      userClickedPattern = [];
    }
  } 
  //if user break the game pattern
  else {
    playSound("wrong");
    $("h1").text("Game Over, Press Any Key to Restart");
    $("body").addClass("game-over");
    setTimeout(() => {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
  }
}

// to play a sound with respect to the choosen color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//add animation effect by adding css class using jquery
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

 setTimeout(() => {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

//to play again
function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  isStarted = false;
}
