var userClickedPattern=[];
var gamePattern=[];
var buttonColours=["red","blue","green","yellow"];
var level=0;
var started=false;
function nextSequence(){
    level++;
    $("h1").text("Level "+level);
    userClickedPattern.splice(0, userClickedPattern.length);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}
$(".btn").click(function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");
    },100);
}

$(document).keypress(function(event){
    if(!started){
        $("h1").text("Level "+level);
        started=true;
        nextSequence();
    }
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
        if(currentLevel==gamePattern.length-1){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("h1").text("Game over,Press any key to restart");
        startOver();
    }
}

function startOver(){
    started=false;
    level=0;
    gamePattern.splice(0, gamePattern.length);
}