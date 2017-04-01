
var a_listWords = ["TRONG","HIEU", "DO", "JIMMIINGUYEN"];
var length = a_listWords.length;

//Initialization for first round
var wins = 0;
var loss = 0;
var numberGuessInit = 12;

console.log("wins: " + wins);
console.log("loss: " + loss);

var currentWord = a_listWords[Math.floor(Math.random()*length)];

console.log("computer word: " + currentWord);

var currentWordLength = currentWord.length;


var a_currentWordOutput = [];
for (var i = 0;i< currentWordLength;i++) {
a_currentWordOutput.push("_ ") ;

}

console.log("word Output: " + a_currentWordOutput);

var listGuessedKey = []; 

console.log("List guessed keys: " + listGuessedKey);

///End of initialization of first round

document.onkeyup = function(event) {

	numberGuessInit--;
	
	console.log("Number of remaining guess: " + numberGuessInit);

	var key = event.key;
	
  	
  	var keyUpperCase = key.toUpperCase();

  	console.log("User guess: " + keyUpperCase);

  	if (listGuessedKey.indexOf(keyUpperCase) == -1) {

  		listGuessedKey.push(keyUpperCase);

  	}
  	for (var j = 0;j<currentWordLength;j++) {

  		if(currentWord[j] == keyUpperCase) {

  			a_currentWordOutput[j] = keyUpperCase;


  		}
  	}

  	console.log("word Output: " + a_currentWordOutput);
  	console.log("List guessed key: " + listGuessedKey);


  	//winner
  	if (a_currentWordOutput.indexOf("_ ") == -1) {

  		wins++;

  		console.log("You win");

  		//Re-initialization for next round

  		console.log("wins: " + wins);
		console.log("loss: " + loss);

		numberGuessInit = 12;
		listGuessedKey = []; 

  		currentWord = a_listWords[Math.floor(Math.random()*length)];

		console.log("computer word: " + currentWord);

		currentWordLength = currentWord.length;


		a_currentWordOutput = [];
		for (var i = 0;i< currentWordLength;i++) {
		a_currentWordOutput.push("_ ") ;

		}

		console.log("word Output: " + a_currentWordOutput);

	

		console.log("List guessed keys: " + listGuessedKey);

  	}
  	//you lose
  	else if (numberGuessInit == 0) {
  		loss++;

  		console.log("You lose ");

  		//re-initialization for next round

  		console.log("wins: " + wins);
		console.log("loss: " + loss);

		numberGuessInit = 12;
		listGuessedKey = []; 

  		currentWord = a_listWords[Math.floor(Math.random()*length)];

		console.log("computer word: " + currentWord);

		currentWordLength = currentWord.length;

		a_currentWordOutput = [];
		for (var i = 0;i< currentWordLength;i++) {
			a_currentWordOutput.push("_ ") ;

		}

		console.log("word Output: " + a_currentWordOutput);

		console.log("List guessed keys: " + listGuessedKey);

	}
};	