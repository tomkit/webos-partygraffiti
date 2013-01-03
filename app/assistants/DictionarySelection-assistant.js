function DictionarySelectionAssistant() {

}

DictionarySelectionAssistant.prototype.setup = function() {
	this.controller.setupWidget(Mojo.Menu.appMenu, this.attributes = {
         omitDefaultItems: true
    }, null);

	this.prefs = this.controller.stageController.assistant.getPrefs();
	
	this.prefs.reset();
	WidgetRegistration.registerButton.bind(this)("normal", this.normal);
	//WidgetRegistration.registerButton.bind(this)("twitter", this.twitter);
	
};

DictionarySelectionAssistant.prototype.activate = function(event) {

};

DictionarySelectionAssistant.prototype.deactivate = function(event) {

};

DictionarySelectionAssistant.prototype.cleanup = function(event) {
	//WidgetRegistration.unregisterButton.bind(this)("twitter", this.twitter);
	WidgetRegistration.unregisterButton.bind(this)("normal", this.normal);
};

DictionarySelectionAssistant.prototype.normal = function(event) {
	var el = this.controller.get("normal");
	var game = this.buttonModel.value;
	this.controller.stageController.assistant.getPrefs().setGameType(game);

	WidgetRegistration.nextScene.bind(this)(el, "PlayersSelection", event);

}

DictionarySelectionAssistant.prototype.twitter = function(event) {
	var el = this.controller.get("twitter");
	var game = "normal"
	this.controller.stageController.assistant.getPrefs().setGameType(game);

	WidgetRegistration.nextScene.bind(this)(el, "PlayersSelection", event, "comingsoon.png");
}
