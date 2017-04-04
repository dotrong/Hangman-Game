var countryInfo = {

	"FRANCE": ["hint1","hint2","imageUrl","assets/audio/Les-Champs-Elysees.mp3"],
	"USA": ["hint1","hint2","imageUrl","assets/audio/Les-Champs-Elysees.mp3"],
	"CANADA": ["hint1","hint2","imageUrl","assets/audio/Les-Champs-Elysees.mp3"],
	"MEXICO": ["hint1","hint2","imageUrl","assets/audio/Les-Champs-Elysees.mp3"],
	"ITALY": ["hint1","hint2","imageUrl","assets/audio/Les-Champs-Elysees.mp3"],
	"SPAIN": ["hint1","hint2","imageUrl","assets/audio/Les-Champs-Elysees.mp3"],
	"CHINA": ["hint1","hint2","imageUrl","assets/audio/Les-Champs-Elysees.mp3"],
	"BRAZIL": ["hint1","hint2","imageUrl","assets/audio/Les-Champs-Elysees.mp3"],
	"ARGENTINA": ["hint1","hint2","imageUrl","assets/audio/Les-Champs-Elysees.mp3"],
	"VIETNAM": ["hint1","hint2","imageUrl","assets/audio/Les-Champs-Elysees.mp3"]

};

var hangManGame = {

	"listWords": Object.keys(countryInfo),
	"wins":0,
	"loss":0,
	"numberGuessRemain":12,
	"listGuessedKey" : [],
	"currentDashOutput" : [],
	"currentWord": "",
	"keyPressed":"",

	init: function(){

		this.numberGuessRemain = 12;
		this.listGuessedKey = []; 
		this.keyPressed = "";
		this.currentDashOutput=[];
		

		var length = this.listWords.length;

		this.currentWord = this.listWords[Math.floor(Math.random()*length)];


		for (var i = 0;i< this.currentWord.length;i++) {
			this.currentDashOutput.push("_ ") ;


		}

		this.writeHtml();
		
	},

	display: function() {

		console.log("wins: " + this.wins);
		console.log("loss: " + this.loss);

		console.log("computer word: " + this.currentWord);

		console.log("Number of remaining guess: " + this.numberGuessRemain);

		console.log("User press: " + this.keyPressed);
		
		console.log("List guessed keys: " + this.listGuessedKey);

		console.log("word Output: " + this.currentDashOutput);

	},

	writeHtml: function() {

		var html = "<p> wins: " + this.wins + "</p>" +
		
		"<p> loss: " + this.loss + "</p>" +

		"<p> computer word: " + this.currentWord + "</p>" +
		"<p> Number of remaining guess: " + this.numberGuessRemain + "</p>" +

		"<p> User press: " + this.keyPressed + "</p>" +

		"<p> List guessed keys: " + this.listGuessedKey + "</p>" +

		"<p> Word Ouput: " + this.currentDashOutput + "</p>" ;

		
		document.querySelector("#game").innerHTML = html;

		


	},

	playSound: function() {
		var country = this.currentWord;
		var html = "<audio autoplay>" + "<source src=" + "\"" + countryInfo[country][3] + "\""	 + " type=\"audio/mpeg\">" + "</audio>";
 				

 	console.log(html);
 
		document.querySelector("#audio").innerHTML = html;

	},

	stopSound:  function() {

		document.querySelector("#audio").innerHTML = "";

	},
	
	play: function(keystr) {

		this.stopSound();

		this.numberGuessRemain--;

		var keyUpperCase = keystr.toUpperCase();

		this.keyPressed = keyUpperCase;

	  	if (this.listGuessedKey.indexOf(keyUpperCase) == -1) {

	  		this.listGuessedKey.push(keyUpperCase);

	  	}

	  	for (var j = 0;j<this.currentWord.length;j++) {

	  		if(this.currentWord[j] == keyUpperCase) {

	  			this.currentDashOutput[j] = keyUpperCase;

	  		}
	  	}

	  	this.display();
	  	this.writeHtml();

		  	//winner
	  	if (this.currentDashOutput.indexOf("_ ") == -1) {

	  		this.wins++;

	  		console.log("You win");

	  		this.playSound();

	  		this.init();

	  	}

	  	//you lose
	  	else if (this.numberGuessRemain == 0) {
	  		this.loss++;

	  		console.log("You lose ");

	  		
	  		this.init();

		}

	},	

};


hangManGame.init();

document.onkeyup = function(event) {

	var key = event.key;

	hangManGame.play(key);

};	