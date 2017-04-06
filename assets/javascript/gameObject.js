var countryInfo = {

	"AUSTRIA": ["Vienna","assets/images/austria.png","assets/audio/austria.ogg"],
	"BELGIUM": ["Bruxelles","assets/images/belgium.png","assets/audio/belgium.ogg"],
	"BULGARIA": ["Sophia","assets/images/bulgaria.png","assets/audio/bulgaria.ogg"],
	"CROATIA": ["Zagreb","assets/images/croatia.png","assets/audio/croatia.ogg"],
	"FRANCE": ["Paris","assets/images/france.png","assets/audio/france.ogg"],
	"GERMANY": ["Berlin","assets/images/germany.png","assets/audio/germany.ogg"],
	"GREECE": ["Athens","assets/images/greece.png","assets/audio/greece.ogg"],
	"HUNGARY": ["Budapest","assets/images/hungary.png","assets/audio/hungary.ogg"],
	"NETHERLANDS": ["Amsterdam","assets/images/netherlands.png","assets/audio/netherlands.ogg"],
	"ITALY": ["Rome","assets/images/italy.png","assets/audio/italy.ogg"],

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

	removeResult: function() {

		document.querySelector("#result").removeAttribute("class");

  		document.querySelector("#result").innerHTML = "";

  		document.querySelector("#flag").removeAttribute("src");

  		document.querySelector("#flag").removeAttribute("class");

  		document.querySelector("#info").innerHTML = "";

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

		document.querySelector("#wins").innerHTML = this.wins;
		document.querySelector("#loss").innerHTML = this.loss;
		document.querySelector("#numberGuessRemain").innerHTML = this.numberGuessRemain;

		document.querySelector("#listGuessedKey").innerHTML = this.listGuessedKey;
	
		document.querySelector("#currentDashOutput").innerHTML = this.currentDashOutput.join(" ");

	},

	playSound: function(status) {
		if (status == "lose") {

			var html = "<audio autoplay>" + "<source src=" + "\"" + "assets/audio/lose.mp3" + "\""	 + " type=\"audio/mpeg\">" + "</audio>";

			document.querySelector("#audio").innerHTML = html;


		}
		else {

			var country = this.currentWord;
			var html = "<audio autoplay>" + "<source src=" + "\"" + countryInfo[country][2] + "\""	 + " type=\"audio/ogg\">" + "</audio>";

 			console.log(html);
 
			document.querySelector("#audio").innerHTML = html;

		}	

	},

	stopSound:  function() {

		document.querySelector("#audio").innerHTML = "";

	},
	
	play: function(keystr) {

		this.removeResult();

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

	  		document.querySelector("#result").setAttribute("class","alert alert-success");

	  		document.querySelector("#result").innerHTML = "You WIN! Country name is " + this.currentWord +
	  		 ". Press anykey to continue";

	  		document.querySelector("#flag").setAttribute("src",countryInfo[this.currentWord ][1]);

	  		document.querySelector("#flag").setAttribute("class","flagImage");

	  		document.querySelector("#info").innerHTML = "Info: Capital is " + countryInfo[this.currentWord ][0];
	  		  
	  		this.playSound("win");

	  		this.init();

	  	}

	  	//you lose
	  	else if (this.numberGuessRemain == 0) {
	  		this.loss++;

	  		console.log("You lose ");

	  		document.querySelector("#result").setAttribute("class","alert alert-danger");

	  		document.querySelector("#result").innerHTML = "You Loose! Country name is " + this.currentWord +
	  		 ".Press anykey to continue to play";

	  		document.querySelector("#flag").setAttribute("src",countryInfo[this.currentWord ][1]);

	  		document.querySelector("#flag").setAttribute("class","flagImage");

	  		document.querySelector("#info").innerHTML = "Info: Capital is " + countryInfo[this.currentWord ][0];

	  		this.playSound("lose");

	  		this.init();

		}

	},	

};

hangManGame.init();

document.onkeyup = function(event) {

	var key = event.key;

	hangManGame.play(key);

};	