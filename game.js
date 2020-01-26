// Declaring main vars
var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var isStarted = false;
var level = 0;

// Givin' sounds to buttons
function makeSound(btn) {
  switch (btn) {
    case "red":
      var red = new Audio('sounds/red.mp3');
      red.play();
      break;
    case "blue":
      var blue = new Audio('sounds/blue.mp3');
      blue.play();
      break;
    case "green":
      var green = new Audio('sounds/green.mp3');
      green.play();
      break;
    case "yellow":
      var yellow = new Audio('sounds/yellow.mp3');
      yellow.play();
      break;
    default:
      console.log(key);
  }
}

// User click animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass('pressed');
  setTimeout(function() {
    $("#" + currentColor).removeClass('pressed')
  }, 100)
}

// Starting game
$(document).keydown(function() {
  if (!isStarted) {
    nextSequence()
  }
})

// Game's turn
function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $('#' + randomChosenColor).fadeTo(100, 0.1, function() {
    $(this).fadeTo(500, 1.0);
  }); // game's click animation
  makeSound(randomChosenColor);
  level++;
  $('#level-title').text("Level " + level);
}

// User's turn
$('.btn').click(function() {
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  console.log(userClickedPattern);
  makeSound(userChosenColor);
  animatePress(userChosenColor);
  var lastIndex = userClickedPattern.length - 1;
  console.log(gamePattern);
  console.log(userChosenColor);
  checkAnswer(lastIndex);
})

// Cheking answer
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
    console.log('ok');
    if (userClickedPattern.length == gamePattern.length) {
      setTimeout(nextSequence, 1000);
      userClickedPattern = [];
    }
  } else {
    gameOver()
  }
}

// Gameover animations and refreshing conditions
function gameOver() {
  var wrong = new Audio('sounds/wrong.mp3');
  wrong.play();
  $('body').addClass('game-over');
  setTimeout(function() {
    $('body').removeClass('game-over')
  }, 200)
  $('#level-title').text("You failed! Press any key to try again");
  gamePattern = [];
  userClickedPattern = [];
  isStarted = false;
  level = 0;
}
