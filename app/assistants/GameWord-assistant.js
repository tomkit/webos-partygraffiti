function GameWordAssistant() {
	  
}

GameWordAssistant.prototype.setup = function(){
	this.controller.setupWidget(Mojo.Menu.appMenu, this.attributes = {
         omitDefaultItems: true
    }, null);
	
	this.prefs = this.controller.stageController.assistant.getPrefs();
	
	this.playerNum = this.prefs.getCurrentPlayerID();
	
	var wordNum = this.prefs.getCurrentPlayer().getOnWord();
	
	var word = this.controller.stageController.assistant.getWords().getWord();
	if (word.length > 8) {
		this.controller.get("word").style.cssText += "font-size: 25px;";
	}
	else if (word.length > 16) {
		this.controller.get("word").style.cssText += "font-size: 20px;";
	}
	
	this.controller.get("wordNum").update(wordNum);
	this.controller.get("playerNum").update(this.playerNum);
	
	this.controller.get("word").update(word);
	
	WidgetRegistration.registerButton.bind(this)("skip", this.skip);
	WidgetRegistration.registerButton.bind(this)("scored", this.scored);
	
	var timeLeft = 30;	
	
	var updateTime = function() {
		
		this.controller.get("timer").update(timeLeft);
		
		if (timeLeft == 0) {
			clearInterval(this.timer);
			Mojo.Controller.getAppController().playSoundNotification("notifications", "sounds/siren.wav", "1000");
			
			this.controller.showDialog({
				template: 'TimesUp/TimesUp-scene',
				assistant: new TimesUpAssistant(this),
				preventCancel: true
			});
		}
		timeLeft--;
		
	}
	
	var scene = updateTime.bind(this);
	this.timer = setInterval(function(){scene();}, 1000);
}

GameWordAssistant.prototype.activate = function(event) {

};

GameWordAssistant.prototype.deactivate = function(event) {

};

GameWordAssistant.prototype.cleanup = function(event) {

	clearInterval(this.timer);
	WidgetRegistration.unregisterButton.bind(this)("skip", this.skip);
	WidgetRegistration.unregisterButton.bind(this)("scored", this.scored);
};

GameWordAssistant.prototype.skip = function(event) {
	var el = this.controller.get("skip");

	this.prefs.getCurrentPlayer().incOnWord();
	
	if (this.prefs.isGameOver()) {
		WidgetRegistration.nextScene.bind(this)(el, "EndResults", event);
	}
	else if (this.prefs.isRoundOver()) {
		this.prefs.incCurrentPlayer();
		WidgetRegistration.nextScene.bind(this)(el, "GameStart", event);
	}
	else {
		WidgetRegistration.nextScene.bind(this)(el, "GameWord", event);
	}
		
}

GameWordAssistant.prototype.scored = function(event) {
	var el = this.controller.get("scored");
	
	clearInterval(this.timer);

	WidgetRegistration.nextScene.bind(this)(el, "OneScore", event, true);
	
}

