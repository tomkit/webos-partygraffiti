function GameStartAssistant() {
	  
}

GameStartAssistant.prototype.setup = function() {
	this.controller.setupWidget(Mojo.Menu.appMenu, this.attributes = {
         omitDefaultItems: true
    }, null);
	
	this.prefs = this.controller.stageController.assistant.getPrefs();
	this.playerNum = this.prefs.getCurrentPlayerID();
	
	this.controller.get("playerNum").update(this.playerNum);
	WidgetRegistration.registerButton.bind(this)("start", this.handleButtonPress);
};

GameStartAssistant.prototype.activate = function(event) {

};

GameStartAssistant.prototype.deactivate = function(event) {

};

GameStartAssistant.prototype.cleanup = function(event) {

	  WidgetRegistration.unregisterButton.bind(this)("start", this.handleButtonPress);
};

GameStartAssistant.prototype.handleButtonPress = function(event) {
	var el = this.controller.get("start");
	
	WidgetRegistration.nextScene.bind(this)(el, "GameWord", event);
}
