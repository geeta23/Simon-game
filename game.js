buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level =0;
// after the start of execution a color will pop up and will be collected into list
function nextSequence(){
  userClickedPattern = [];
  var randomNumber = Math.floor((Math.random())*4);
  var randomChosenColour = buttonColours[randomNumber];
  var s = "#" + randomChosenColour;

  $("h1").text("level " + level);

  $(s).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  var st = "sounds/" + randomChosenColour + ".mp3";
  playSound(st);

  level ++;

  gamePattern.push(randomChosenColour);
}
// this will play sound for corresponding colors
function playSound(name)
{
  var audio = new Audio(name);
  audio.play();
}
// this will animate the button
function animatePress(currentColour)
{
  var i = "#" + currentColour;
  $(i).addClass("pressed");
  setTimeout(function(){
    $(i).removeClass("pressed");
  }, 100);
}

// we are adding click listener to entire document.
$(".btn").click(function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  var click_st = "sounds/" + userChosenColour + ".mp3";
  playSound(click_st);
  animatePress(userChosenColour);
  // when ever the level is same as size we compare answers
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }

    } else {

      playSound("sounds/wrong.mp3");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      //2. Call startOver() if the user gets the sequence wrong.
      startOver();
    }

}

function startOver(){
  level = 0;
  gamePattern = [];
}
// execution starts here when a user press the key
$(document).keypress(function(){
  nextSequence();
});
