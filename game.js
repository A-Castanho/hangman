var words = [
    "flower",
    "ears",
    "dream",
    "hamburger",
    "chimney",
    "fireplace",
    "rugby",
    "article",
    "economy",
    "permanent",
    "expertise",
    "articulate",
    "division",
    "provision",
    "middle",
    "straight",
    "epicalyx",
    "execute",
    "sermon",
    "message",
    "graduate",
    "public",
    "fixture",
    "conclusion",
    "perception",
    "wardrobe",
    "stadium",
    "fascinate",
    "pressure",
    "friendly",
    "response",
];

var hangmanImgs = [
    "images/hangman0.jpg",
    "images/hangman1.jpg",
    "images/hangman2.jpg",
    "images/hangman3.jpg",
    "images/hangman4.jpg",
    "images/hangman5.jpg",
    "images/hangman6.jpg",
];

var wordToGuess="";
var currentChars=[];
var guessedChars=[];
var usedChars=[];

var gameStarted = false;
var gameLost = false;
var hangmanFase = 0;
var attempts = 0;
var numberCharsGuessed = 0;

generateWord();

$(document).on("keypress", function (evt) {
    if(!gameStarted){
        $("#message").text("");
        if(gameLost){
            resetValues();
        }
        generateWord();
    }else{
        if(isLetter(evt.key)){
            checkLetter(evt.key.toLowerCase());
        }
    }
});

function generateWord(){

    var index = Math.floor(Math.random()*words.length);
    wordToGuess = words[index];
    currentChars = wordToGuess.split('');

    guessedChars = Object.assign([], currentChars);
    guessedChars.fill('_');
    var word = guessedChars.join("");
    $("#word").text(word);
    gameStarted = true;
}

function checkLetter(letter){
    if(!usedChars.includes(letter)){
        usedChars.push(letter);
        if(currentChars.includes(letter)){
            fillWord(letter);
            if(numberCharsGuessed==currentChars.length){
                $("#message").text("You got it! Congratulations!");
                resetValues();
            }
        }else{
            advanceHangman();
        }
        attempts++;
    }else{
        $("#message").text("That letter has already been used");
        setTimeout(() => {
            if(gameStarted){
                $("#message").text("");
            }
        }, 2000);
    }
}

function fillWord(letter){
    for(i=0; i<guessedChars.length;i++){
        if(guessedChars[i]=="_"){
            if(currentChars[i]==letter){
                guessedChars[i]=letter;
                numberCharsGuessed++;
            }
        }
    }

    var wordGuessed = guessedChars.join("");
    $("#word").text(wordGuessed);
}

function advanceHangman(){
    hangmanFase++;
    $("#hangman").attr("src", hangmanImgs[hangmanFase]);
    if(hangmanFase==hangmanImgs.length-1){
        $("#message").text("You have died!");
        gameLost = true;
        gameStarted = false;
    }
}

function resetValues(){
    gameStarted = false;
    numberCharsGuessed = 0;
    hangmanFase = 0;
    gameLost = false;
    usedChars = [];
    $("#hangman").attr("src", hangmanImgs[0]);
}

function isLetter(c) {
    //An option is this:
    /*
    return str.length === 1 && str.match(/[a-z]/i);
    */
    //But This will take into account non-ASCII Unicode character classes of some foreign alphabets.
    return c.toLowerCase() != c.toUpperCase();
  }