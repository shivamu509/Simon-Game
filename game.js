let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0;
let started = false;
let level_best = 0

function playSound(color){
    let audio = new Audio('sounds/' + color + '.mp3');
    audio.play();
}

function animatePress(currentColour) {
    $('#'+currentColour).addClass('pressed');
    setTimeout(()=>{
        $('#'+currentColour).removeClass('pressed');
    },100);
}

function nextSequence() {
    level += 1;
    $('#level-title').text('Level '+level)
    let randomNumber = Math.floor(Math.random() * 4);
    randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#" + randomChosenColour).fadeOut().fadeIn();
    playSound(randomChosenColour);
}

function startOver() {
    level = 0;
    started = false;
    userClickedPattern=[]
    gamePattern=[]
    playSound('wrong')
    $(document.body).addClass('game-over')
    setTimeout(()=>{
        $(document.body).removeClass('game-over')
    },200)
    $('h1').text('Game Over, Press Any Key to Restart');
    $('.description').css('display','block');
    $('.level-best').text("Level Best : "+level_best)
}

function checkAnswer(){
    for (let i = 0; i <userClickedPattern.length; i++){
        if (userClickedPattern[i]==gamePattern[i]){
            continue
        }
        else{
            if (level>level_best){level_best=level-1}
            startOver()
            return;
        }
    }
    if (userClickedPattern.length==level){
        userClickedPattern=[]
        nextSequence();
    }
}

$('.btn').click((event) => {
    if (started){
        let userChosenColour = event.target.id;
        userClickedPattern.push(userChosenColour);
        playSound(userChosenColour);
        animatePress(userChosenColour);
        checkAnswer();
    }
});

$(document).keypress((event)=>{
    
    if(!started){
        $('#level-title').text('Level '+level)
        nextSequence();
        started = true;
        $('.description').css('display','none');
    }
})