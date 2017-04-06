//countryInfo is object that has country information: capital, flag image, hymne national

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

//declare hangManGame object. This object will hold all variables and medthods related to the game

var hangManGame = {

	"listWords": Object.keys(countryInfo), //get list of Key name from object countryInfo
	"wins":0,
	"loss":0,
	"numberGuessRemain":12,
	"listGuessedKey" : [],
	"currentDashOutput" : [],
	"currentWord": "",
	"keyPressed":"",

	//init method will initialize all variables and html element to begining state.

	init: function(){

		this.numberGuessRemain = 12;
		this.listGuessedKey = []; 
		this.keyPressed = "";
		this.currentDashOutput=[];
		

		var length = this.listWords.length;

		this.currentWord = this.listWords[Math.floor(Math.random()*length)];

		//create a word _ _ _ _ output based on length of random word
		for (var i = 0;i< this.currentWord.length;i++) {
			this.currentDashOutput.push("_ ") ;

		}

		this.writeHtml();
	
	},

	// removeResult: to clean up HTML result output, added when user wins or loses.

	removeResult: function() {

		document.querySelector("#result").removeAttribute("class");

  		document.querySelector("#result").innerHTML = "";

  		document.querySelector("#flag").removeAttribute("src");

  		document.querySelector("#flag").removeAttribute("class");

  		document.querySelector("#info").innerHTML = "";

	},

	//display: to print log to console for troubleshooting

	display: function() {

		console.log("wins: " + this.wins);
		console.log("loss: " + this.loss);

		console.log("computer word: " + this.currentWord);

		console.log("Number of remaining guess: " + this.numberGuessRemain);

		console.log("User press: " + this.keyPressed);
		
		console.log("List guessed keys: " + this.listGuessedKey);

		console.log("word Output: " + this.currentDashOutput);

	},

	//writeHtml: to write update score and game stats to html page

	writeHtml: function() {

		document.querySelector("#wins").innerHTML = this.wins;
		document.querySelector("#loss").innerHTML = this.loss;
		document.querySelector("#numberGuessRemain").innerHTML = this.numberGuessRemain;

		document.querySelector("#listGuessedKey").innerHTML = this.listGuessedKey;
	
		document.querySelector("#currentDashOutput").innerHTML = this.currentDashOutput.join(" ");

	},

	//playSound: play national hymne national or sad sound, having one parameter status

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

	//stopSound: to stop play music when user is playing.
	stopSound:  function() {

		document.querySelector("#audio").innerHTML = "";

	},

	//play: main method of this object. update game stat, select random word, calling other methods ...
	
	play: function(keystr) {

		//remove html sound if there is

		this.removeResult();

		this.stopSound();

		//reduce the number of remaining guess by 1
		this.numberGuessRemain--;

		var keyUpperCase = keystr.toUpperCase();

		this.keyPressed = keyUpperCase;

		//if user press a letter that not in existing list, then add this letter to that list

	  	if (this.listGuessedKey.indexOf(keyUpperCase) == -1) {

	  		this.listGuessedKey.push(keyUpperCase);

	  	}

	  	//Update known character in _ _ _ string

	  	for (var j = 0;j<this.currentWord.length;j++) {

	  		if(this.currentWord[j] == keyUpperCase) {

	  			this.currentDashOutput[j] = keyUpperCase;

	  		}
	  	}

	  	this.display();
	  	this.writeHtml();

		// if there is no more '_' in the quizzed word, then user wins

	  	if (this.currentDashOutput.indexOf("_ ") == -1) {

	  		//update wins stat

	  		this.wins++;

	  		console.log("You win");

	  		//print result on html page

	  		document.querySelector("#result").setAttribute("class","alert alert-success");

	  		document.querySelector("#result").innerHTML = "You WIN! Country name is " + this.currentWord +
	  		 ". Press anykey to continue";

	  		document.querySelector("#flag").setAttribute("src",countryInfo[this.currentWord ][1]);

	  		document.querySelector("#flag").setAttribute("class","flagImage");

	  		document.querySelector("#info").innerHTML = "Info: Capital is " + countryInfo[this.currentWord ][0];

	  		//play music
	  		  
	  		this.playSound("win");

	  		//reinitalized game stats

	  		this.init();

	  	}

	  	//you lose
	  	else if (this.numberGuessRemain == 0) {

	  		//update loss stats
	  		this.loss++;

	  		console.log("You lose ");

	  		//print result on html page

	  		document.querySelector("#result").setAttribute("class","alert alert-danger");

	  		document.querySelector("#result").innerHTML = "You Loose! Country name is " + this.currentWord +
	  		 ". Press anykey to continue to play";

	  		document.querySelector("#flag").setAttribute("src",countryInfo[this.currentWord ][1]);

	  		document.querySelector("#flag").setAttribute("class","flagImage");

	  		document.querySelector("#info").innerHTML = "Info: Capital is " + countryInfo[this.currentWord ][0];

	  		//play sad sound

	  		this.playSound("lose");

	  		//reinitalized game stats

	  		this.init();

		}

	},	

};

//The Game Starts Here .....

//call init() method of hangManGame to reset game stats variables

hangManGame.init();

//waiting for user key press, pass event object to function

document.onkeyup = function(event) {

	//get the key press and assign it to variable "key"

	var key = event.key;

	//call play method on hangManGame object

	hangManGame.play(key);

};	