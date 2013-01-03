function InstructionsAssistant() {
	
}

InstructionsAssistant.prototype.setup = function() {
	this.controller.setupWidget(Mojo.Menu.appMenu, this.attributes = {
         omitDefaultItems: true
    }, null);
	
	WidgetRegistration.registerButton.bind(this)("back", this.handleButtonPress);
};

InstructionsAssistant.prototype.activate = function(event) {
};

InstructionsAssistant.prototype.deactivate = function(event) {
};

InstructionsAssistant.prototype.cleanup = function(event) {
	
	  WidgetRegistration.unregisterButton.bind(this)("back", this.handleButtonPress);
};

InstructionsAssistant.prototype.handleButtonPress = function(event) {
	var el = this.controller.get("back");
	
	WidgetRegistration.nextScene.bind(this)(el, "Welcome", event);
};
