String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
};

var game = {
	bank : ['Celtics', 'Hawks', 'Magic', 'Lakers','Clippers'],
	word: "",
	mask: "",
	lettersGuessed: [],
	wordsGuessed: [],
	chances: 7,
	wins: 0,
	losses: 0,
	wordGrab: function() {
		 this.word = this.bank[Math.floor(Math.random() * this.bank.length)];
		 this.mask = Array(this.word.length+1).join("-");
		 this.chances = 7;
		 this.lettersGuessed = [];
	},
	choice: function(input) {
		if (this.chances > 0) {
			if (this.lettersGuessed.indexOf(input) < 0) {
				var rep = []
                x = this.word.toLowerCase().indexOf(input.toLowerCase());
	                while(x >= 0) {
	                rep.push(x);
	                x = this.word.indexOf(input, x+1);
	            	};


            	if (rep.length > 0) {
                        for (i in rep) {
                            this.mask = this.mask.replaceAt(rep[i],input);
                            };
                        this.lettersGuessed.push(input);
                        document.getElementById("letters-guessed").innerHTML="Guessed: " + this.lettersGuessed;

                        document.getElementById("word").innerHTML= this.mask;
                         if (this.mask.indexOf("-") < 0) {
                            this.wins ++;
                            this.bank.remove(this.word);
                            document.getElementById("wins").innerHTML="Wins: " + this.wins;
                            this.wordGrab();
                            }

                 	}
                else {
                this.lettersGuessed.push(input);
                document.getElementById("letters-guessed").innerHTML="Guessed: " + this.lettersGuessed;
                this.chances -= 1;                        
                document.getElementById("guesses-remaining").innerHTML = "Guesses Remaining: " + this.chances;
                        };
                
                };
                    
                    
                    } else {
                    	this.losses++;
                    	 document.getElementById("losses").innerHTML = "Losses: " + this.losses;
                        };
                    	this.wordGrab();
                    },
			

	newGame: function() {
		this.word = this.bank[Math.floor(Math.random() * this.bank.length)];
		 this.mask = Array(this.word.length+1).join("-");
		 this.chances = 7;
		 this.lettersGuessed = [];
		 this.wins =0;
		 this.losses=0;
	},


};


game.wordGrab();
document.onkeyup = function(event) {
            var input = String.fromCharCode(event.keyCode).toLowerCase();

                game.choice(input);
            };



