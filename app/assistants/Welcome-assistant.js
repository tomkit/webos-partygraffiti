function WelcomeAssistant() {
	
}

WelcomeAssistant.prototype.setup = function() {
	this.controller.setupWidget(Mojo.Menu.appMenu, this.attributes = {
         omitDefaultItems: true
    }, null);
	
	var scene = WidgetRegistration.registerButton.bind(this);
	
	scene("start", this.start);
	scene("instructions", this.instructions);
};

WelcomeAssistant.prototype.activate = function(event) {

};

WelcomeAssistant.prototype.deactivate = function(event) {

};

WelcomeAssistant.prototype.cleanup = function(event) {
	
	var scene = WidgetRegistration.unregisterButton.bind(this);  
	
	scene("start", this.start);
	scene("instructions", this.instructions);
};

WelcomeAssistant.prototype.instructions = function(event) {
	
	var el = this.controller.get("instructions");
	
	WidgetRegistration.nextScene.bind(this)(el, "Instructions", event);

};

WelcomeAssistant.prototype.start = function(event) {
	var el = this.controller.get("start");
	
	WidgetRegistration.nextScene.bind(this)(el, "DictionarySelection", event);

};
