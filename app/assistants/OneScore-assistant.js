function OneScoreAssistant(options) {
	this.scored = options;
	this.selectedOtherPlayer = false;
	
}

OneScoreAssistant.prototype.setup = function() {
	this.controller.setupWidget(Mojo.Menu.appMenu, this.attributes = {
         omitDefaultItems: true
    }, null);
	
	this.prefs = this.controller.stageController.assistant.getPrefs();
	this.playerNum = this.prefs.getCurrentPlayerID();
	
	if (this.scored != 'undefined' && this.scored == true) {
		this.prefs.getCurrentPlayer().addScore();
	}
	
	var score = this.prefs.getCurrentPlayer().getScore();
	var el = this.controller.get("option");
	
	this.controller.get("score").update(score);
	WidgetRegistration.registerIntegerPicker.bind(this)("who got it right?", 0, this.prefs.getNumTeam(), 0, this.handleIntegerPickerChange);
	
	

	var addImg = function(imgFile) {
		var img = this.controller.document.createElement("span");
		img.innerHTML = '<img src="images/' + imgFile +'" />';
		el.appendChild(img);
	}

	if (this.prefs.isGameOver()) {
		addImg.bind(this)("end.png");
		WidgetRegistration.registerButton.bind(this)("option", this.end);
	}
	else if (this.prefs.isRoundOver()) {
		addImg.bind(this)("nextplayer.png");
		WidgetRegistration.registerButton.bind(this)("option", this.nextPlayer);
	}
	else {
		addImg.bind(this)("nextword.png");
		WidgetRegistration.registerButton.bind(this)("option", this.nextWord);
	}
	
	
};

OneScoreAssistant.prototype.activate = function(event) {

};

OneScoreAssistant.prototype.deactivate = function(event) {

};

OneScoreAssistant.prototype.cleanup = function(event) {
	
	  WidgetRegistration.unregisterButton.bind(this)("option", this.nextPlayer);
	  WidgetRegistration.unregisterButton.bind(this)("option", this.nextWord);
	  WidgetRegistration.unregisterButton.bind(this)("option", this.end);
	  WidgetRegistration.unregisterIntegerPicker.bind(this)("who got it right?", this.handleIntegerPickerChange);
};

OneScoreAssistant.prototype.nextWord = function(event){
	var el = this.controller.get("option");
	
	this.prefs.getCurrentPlayer().incOnWord();
	
	this.updateScore();
	
	WidgetRegistration.nextScene.bind(this)(el, "GameWord", event);
}

OneScoreAssistant.prototype.nextPlayer = function(event){
	var el = this.controller.get("nextPlayer");
	
	this.prefs.incCurrentPlayer();
	
	this.updateScore();
	
	WidgetRegistration.nextScene.bind(this)(el, "GameStart", event);
}

OneScoreAssistant.prototype.updateScore = function() {
	if (this.pickerModel.value != 0 && this.pickerModel.value != this.prefs.getCurrentPlayer().getPlayerNum()) {

		this.prefs.getPlayer(this.pickerModel.value).addScore();
		if (this.scored != true && !this.selectedOtherPlayer) {
			this.prefs.getCurrentPlayer().addScore();
		}
	}
}

OneScoreAssistant.prototype.end = function(event){
	var el = this.controller.get("end");
	
	this.updateScore();
	
	WidgetRegistration.nextScene.bind(this)(el, "EndResults", event);
}	
	

OneScoreAssistant.prototype.handleIntegerPickerChange = function(event) {
	if (!this.selectedOtherPlayer && 
		this.pickerModel.value != this.prefs.getCurrentPlayer().getPlayerNum() &&
		this.pickerModel.value != 0 &&
		this.scored != true) {
			this.selectedOtherPlayer = true;
			this.prefs.getCurrentPlayer().addScore();
	}
	else if (this.pickerModel.value == 0 && this.selectedOtherPlayer) {
		this.selectedOtherPlayer = false;
		this.prefs.getCurrentPlayer().removeScore();
	}
		
	var score = this.prefs.getCurrentPlayer().getScore();
	this.controller.get("score").update(score);
}
