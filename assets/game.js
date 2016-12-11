//creates replaceAt property for strings that allows us to reveal the letters easily
String.prototype.replaceAt = function(index, character) {
    return this.substr(0, index) + character + this.substr(index + character.length);
};

var game = {
    bank: ['Celtics', 'Hawks', 'Magic', 'Lakers', 'Clippers', 'Sixers', 'Bucks', 'Rockets', 'Hornets', 'Thunder', ],
    word: "",
    mask: "",
    lettersGuessed: [],
    wordsGuessed: [],
    chances: 7,
    wins: 0,
    losses: 0,
    wordGrab: function() {
        this.word = this.bank[Math.floor(Math.random() * this.bank.length)];
        this.mask = Array(this.word.length + 1).join("-");
        this.chances = 7;
        this.lettersGuessed = [];
        document.getElementById("word").innerHTML = this.mask;
        document.getElementById("guesses-remaining").innerHTML = "Guesses Remaining: " + this.chances;
        document.getElementById("letters-guessed").innerHTML = "Guessed: " + this.lettersGuessed;
        document.getElementById("losses").innerHTML = "Losses: " + this.losses;
        document.getElementById("wins").innerHTML = "Wins: " + this.wins;
    },
    choice: function(input) {
        //checks if user has lost
        if (this.chances > 0) {
            //checks if letter has been guessed
            if (this.lettersGuessed.indexOf(input) < 0) {
                //create list of indexes in key word that match users input
                var rep = []
                x = this.word.toLowerCase().indexOf(input.toLowerCase());
                while (x >= 0) {
                    rep.push(x);
                    x = this.word.indexOf(input, x + 1);
                };

                //condition for guessing right --replaces masked word at matched indexes and updates html
                if (rep.length > 0) {
                    console.log("got letter right")
                    for (i in rep) {
                        this.mask = this.mask.replaceAt(rep[i], input);
                    };
                    this.lettersGuessed.push(input);
                    document.getElementById("letters-guessed").innerHTML = "Guessed: " + this.lettersGuessed;
                    document.getElementById("word").innerHTML = this.mask;
                    //conidtion for winning -- adds win, removes word from word bank, picks new word, update html
                    if (this.mask.indexOf("-") < 0) {
                        this.wins++;
                        console.log("got word right")
                        this.bank.splice(this.bank.indexOf(this.word), 1);
                        document.getElementById("wins").innerHTML = "Wins: " + this.wins;
                        this.wordGrab();
                    }

                }
                //condition for guessing wrong -- update stats and html
                else {
                    console.log("guess wrong")
                    this.lettersGuessed.push(input);
                    document.getElementById("letters-guessed").innerHTML = "Guessed: " + this.lettersGuessed;
                    this.chances -= 1;
                    document.getElementById("guesses-remaining").innerHTML = "Guesses Remaining: " + this.chances;
                };

            };

            //condtion for losing 
        } else {
            console.log("lost game");
            this.losses++;
            document.getElementById("losses").innerHTML = "Losses: " + this.losses;
            this.wordGrab();
        };

    },

    //reset function -- we can add button for somewhere
    newGame: function() {
        this.word = this.bank[Math.floor(Math.random() * this.bank.length)];
        this.mask = Array(this.word.length + 1).join("-");
        this.chances = 7;
        this.lettersGuessed = [];
        this.wins = 0;
        this.losses = 0;
    },


};

//picks first word and game loops from user input
game.wordGrab();
document.onkeyup = function(event) {
    var input = String.fromCharCode(event.keyCode).toLowerCase();

    game.choice(input);
};