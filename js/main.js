	//FALTA
	//gana en 20
	//


var audio1 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
	var audio2 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
	var audio3 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
	var audio4 = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');


var simonButton = function(color, mr, mb, audio) {
	
	var self = this;
	
	self.color = ko.observable(color);
	
	self.audio = audio;
	
	self.mr = ko.observable(mr);
	
	self.mb = ko.observable(mb);
	
	self.isLighter = ko.observable("");
	
	
	//MAKE THE BUTTON LIGHTER AND PLAY A SOUND
	
	self.setLighter = function(){
		self.audio.play();
		self.isLighter("lighter");
		
		setTimeout(function(){
			self.isLighter("");
			
			
		}, 400);
			
		
	};
	
	
	
	
};

	

var viewModel = function() {
	
	var self = this;
	
	
	
	//ARRAY WITH THE 4 BUTTONS

	self.buttons = [new simonButton('#004d00','0.5em', '0.5em', audio1), //green
				 new simonButton('#990000', '0', '0.5em', audio2), //red
				new simonButton('#808000','0.5em', '0', audio3), //y
				 new simonButton('#00004d', '0', '0', audio4)];   //b
	
	//COMPUTER WILL STORE THE PATTERN AUTO-GENERATED HERE
	
	self.Pattern = [];
	
	self.canPlay = false;
	
	self.userPosition = 0;
	
	self.isStrict = ko.observable(false);
	
	self.isStart = false;
	
	self.wrong = ko.observable(false);
	
	self.message = ko.observable("");
	
	self.score = ko.observable(0);
	
	self.gameOver = ko.observable(false);
	
	//HANDLE THE CLICK ON A BUTTON. ILUMINATE AND DECIDE IF ITS THE RIGHT BUTTON
	self.clickButton = function(buttonClicked){
		if(self.isStart && self.canPlay){
		//console.log('click');
			if(self.Pattern[self.userPosition]===buttonClicked){ //if user guessed correctly
				buttonClicked.setLighter();
				if(self.userPosition === self.Pattern.length-1){ //user entered all the pattern
					if (self.Pattern.length > self.score()) {
						self.score(self.Pattern.length);
					}
					if (self.score()===20){
							self.message("VICTORY!");
							self.wrong(true);
							setTimeout(self.restartGame,2000);
						} else{
							self.addPattern();
						}
				} else{                                     //
					self.userPosition++;	
				}
				
				
			} else if (self.isStrict()){
				self.endGame();
				
			} else {
				
				
				self.canPlay = false;
				
				self.message("TRY AGAIN!");
				
				self.wrong(true);
				//setTimeout(w, 2800);
				
				
				self.userPosition = 0;
				
				
				setTimeout(self.playPattern, 1200);
				
			}
		}
	};
	
	//START GAME
	self.startGame = function(){
		if(!self.isStart){
			self.isStart = true;
			self.addPattern();
			
		}
		console.log(self.isStrict());
	};
	
	//GAME ENDS WHEN PLAYER CLICKS WRONG OR SCORE = 20
	self.endGame = function(){
		self.isStart = false;
		self.canPlay = false;
		self.message("GAME OVER");
		self.wrong(true);
		setTimeout(self.restartGame, 1400);
	};
	
	//PLAY THE PATTERN ON THE BUTTONS
	self.playPattern = function(){
		
		self.canPlay = false;
		self.wrong(false);
		var index = 0;
		
		var playPat = setInterval(function(){
			self.Pattern[index++].setLighter();
			if(index == self.Pattern.length){
				clearInterval(playPat);
				self.canPlay = true;
				return;
			}
		}, 800);
	};
	
	//NEW ROUND AFTER USER REPEATING THE PATTERN CORRECTLY
	self.addPattern = function(){
		var but = self.buttons;
		self.userPosition = 0;
		self.Pattern.push(but[Math.floor(Math.random()*but.length)]);
		setTimeout(self.playPattern, 300);
		
	};
	
	//RESETS THE GAME
	self.restartGame = function(){
		self.userPosition = 0;
		self.isStart = false;
		self.canPlay = false;
		self.wrong(false);
		self.Pattern = [];
		self.score(0);
		self.startGame();
	};
	
	
	
	
	
	
};
	
	$(function(){

ko.applyBindings(new viewModel());
		
		
	


});