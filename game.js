var buttonColors =["red", "blue", "green", "yellow"];
var gamePattern=[];

var userClickedPattern=[];
var started =false;
var level=0;


$("body").keydown(function(){
  if(!started){
    $("#level-title").html("Level-"+level);
    nextSequence();
    started=true;
  }
})


$(".btn").click(function(){
  var userChosenColour= $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})


function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level-" + level);
  //random number generator
  var randomNumber = (Math.floor(Math.random()*4));

  //random color generator
  var randomChosenColour=buttonColors[randomNumber];
  gamePattern.push(randomChosenColour);

  //animate a flash to the button selected
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
  }, 100);
}


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    console.log("success");
    if(gamePattern.length==userClickedPattern.length){
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  }else{
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").html("game-over, Press any key to restart 😊");
    startOver();
  }
}

function startOver(){
  level=0;
  gamePattern=[];

  started=false;
}
