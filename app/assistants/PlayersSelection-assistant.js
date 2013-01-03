function PlayersSelectionAssistant() {
 
}

PlayersSelectionAssistant.prototype.setup = function() {
	this.controller.setupWidget(Mojo.Menu.appMenu, this.attributes = {
         omitDefaultItems: true
    }, null);
	
	this.prefs = this.controller.stageController.assistant.getPrefs();
	
	WidgetRegistration.registerIntegerPicker.bind(this)("players", 1, 5, 2, this.handleIntegerPickerChange);
	WidgetRegistration.registerButton.bind(this)("player-ok", this.handleButtonPress);

};

PlayersSelectionAssistant.prototype.activate = function(event) {

};

PlayersSelectionAssistant.prototype.deactivate = function(event) {

};

PlayersSelectionAssistant.prototype.cleanup = function(event) {

	WigdetRegistration.unregisterIntegerPicker.bind(this)("players", this.handleIntegerPickerChange);
	
	WidgetRegistration.unregisterButton.bind(this)("player-ok", this.handleButtonPres);
};

PlayersSelectionAssistant.prototype.handleButtonPress = function(event) {
	var pickedValue = this.pickerModel.value;
	var el = this.controller.get("player-ok");
	
	this.prefs.setNumTeam(pickedValue);
	
	WidgetRegistration.nextScene.bind(this)(el, "GameStart", event);
}

PlayersSelectionAssistant.prototype.handleIntegerPickerChange = function(event) {
	// need this defined although it does nothing
}
