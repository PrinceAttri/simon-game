var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

//to check whether game has started
var started = false;

//to keep a track of the level
var level = 0;

$(document).keypress(function () {
    if(!started) {
        $("#level-title").text("Level" + level);
        nextSequence();
        started = true;
    }
});


//checking for which button is clicked
$(".btn").click(function () {
    
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    //to make the click sound
    playSound(userChosenColour);

    //to make the click animation
    animatePress(userChosenColour);

    //Call checkAnswer() after a user has clicked and chosen
    //their answer, passing in the index of the last answer
    //in the user's sequence
    checkAnswer(userClickedPattern.length - 1);
});

//generating random number, which generates random colour
function nextSequence() {
    //when nextSequnce is called, reset userClickedPattern
    //to empty array for next level
    userClickedPattern = [];

    //incrementing the level everytime it is called
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);


    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

//function to play sounds
function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(name) {
    $("#" + name).addClass("pressed");

    setTimeout(function () {
        $("#" + name).removeClass("pressed");
    }, 100);
}

//checking most recent user answer
function checkAnswer(currentLevel) {
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");

        //is most recent user answer is same
        //then checking the length
        if(userClickedPattern.length === gamePattern.length) {
            //if length is same then calling nextSequence
            //function which generates the new sequence
            //for the game
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong")

        playSound("wrong");

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game over, Press Any Key to Restart");

        //restart the game
        startOver();
    }
}

function startOver() {
    //resetting the given values
    //for the new game
    level = 0;
    gamePattern = [];
    started = false;
}