
var gameObject = {
	currentLetter: "",

	allGuesses: [],
	incorrectGuesses: [],
	correctGuesses: [],
	correctGuessesInOrder: [],

	bandsArray: ["NAS", "TUPAC", "EMINEM", "NWA", "OUTKAST", "SNOOP DOGG", "ICE CUBE", "A TRIBE CALLED QUEST", "JAY Z"],
	randomWord: "",
	bandLetters:[],

	isMatch: null,
	isRepeat: null,

	guessesRemaining: 15,
	loseCount: 0,
	winCount:0,

	generateWord: function(){
		var random_num = Math.random() * 9;
		random_num = Math.floor(random_num);

		this.randomWord = this.bandsArray[random_num];
		this.bandLetters = this.randomWord.split("");

		console.log(this.randomWord + " " + this.bandLetters);

		this.allGuesses = [];
		this.incorrectGuesses = [];
		this.correctGuesses = [];
		this.correctGuessesInOrder = [];
		this.guessesRemaining = 15;
	},

	checkRepeat: function(){
		var repeatCounter = -1;

		for (var i=0; i < this.allGuesses.length; i++){
			if (this.currentLetter == this.allGuesses[i]){
				repeatCounter++;
			}
		}
		
		if (repeatCounter == 0){
			this.isRepeat = false;
		}
		else{
			this.isRepeat = true;
		}
	},
	checkMatch: function(){
		var matchCounter = 0;

		for (var i=0; i < this.bandLetters.length; i++){
			if (this.currentLetter == this.bandLetters[i]){
				matchCounter++;
			}
		}
		
		if (matchCounter == 0){
			this.isMatch = false;
		}
		else{
			this.isMatch = true;
		}
	},
	match_repeatComparison: function(){
		
		if (this.isRepeat == true){
			this.allGuesses.pop(this.currentLetter);
		}
		
		if (this.isRepeat == false && this.isMatch == false){
			this.incorrectGuesses.push(this.currentLetter);
			this.guessesRemaining--;
		}
		
		if (this.isRepeat == false && this.isMatch == true){
			this.correctGuesses.push(this.currentLetter);
			this.guessesRemaining--;
		}
	},

	revealBand: function(){
		
		if (this.correctGuesses.length == 0){
			for (var i =0; i<this.bandLetters.length; i++){
				this.correctGuessesInOrder[i] = "_";
			}
		}
		else {
			
			for (var i=0; i<this.bandLetters.length; i++){
				
				if (this.correctGuessesInOrder[i] != this.bandLetters[i]){
					for (var j=0; j<this.correctGuesses.length; j++){
						if (this.correctGuesses[j] == this.bandLetters[i]){
							this.correctGuessesInOrder[i] = this.bandLetters[i];
						}
						else {
							this.correctGuessesInOrder[i] = "_";
						}
					}
				}
			}
		}

		document.getElementById("current-word").innerHTML = this.correctGuessesInOrder.join(" ");
		document.getElementById("num-wins").innerHTML = ("Wins: " + this.winCount + "  " + "Losses: " + this.loseCount);
		document.getElementById("letters-guessed").innerHTML = this.incorrectGuesses;
		document.getElementById("guesses-remaining").innerHTML = this.guessesRemaining;
	},
	checkProgress: function(){
		var counter = 0;

		for (var i=0; i<this.bandLetters.length; i++){
			if (this.correctGuessesInOrder[i] == this.bandLetters[i]){
				counter++;
			}
		}

		if (counter == this.bandLetters.length){
			alert("You win");
			this.winCount++;
			this.generateWord();
		}
		if (this.guessesRemaining == 0){
			alert("You lose!");
			this.loseCount++;
			this.generateWord();
		}
	}
}

var userStartedGameOnce = false;

document.onkeyup = function(q) {

	gameObject.currentLetter = String.fromCharCode(q.keyCode).toUpperCase();

	if (gameObject.currentLetter == " " && userStartedGameOnce == false){


		gameObject.generateWord();

		userStartedGameOnce = true;

	}

	gameObject.allGuesses.push(gameObject.currentLetter);

	console.log("Current Letter: " + gameObject.currentLetter + "\n" + "Band Letters: " + gameObject.bandLetters + "\n" + "All Guesses: " + gameObject.allGuesses);

	gameObject.checkRepeat();
	gameObject.checkMatch();

	gameObject.match_repeatComparison();

	console.log("Correct Guesses: " + gameObject.correctGuesses);
	console.log("Incorrect Guesses: " + gameObject.incorrectGuesses);
	console.log("Guesses Remaining:" + gameObject.guessesRemaining);

	gameObject.revealBand();
	console.log(gameObject.correctGuessesInOrder);

	gameObject.checkProgress();
}

