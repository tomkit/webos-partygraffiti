function TimesUpAssistant(sceneAssistant) {
	
	  this.sceneAssistant = sceneAssistant;
}


TimesUpAssistant.prototype.setup = function(widget) {
	this.sceneAssistant.controller.setupWidget(Mojo.Menu.appMenu, this.attributes = {
         omitDefaultItems: true
    }, null);

	this.widget = widget;

	var buttonName = "times-up";
	
	this.buttonModel = {
	    "label" : buttonName,
	    "buttonClass" : "",
	    "disabled" : false
    	};
		
	this.sceneAssistant.controller.setupWidget(buttonName, null, this.buttonModel);
	
	Mojo.Event.listen(this.sceneAssistant.controller.get(this.buttonName), Mojo.Event.tap, 
    	this.handleButtonPress.bind(this.sceneAssistant));
};

TimesUpAssistant.prototype.activate = function(event) {

};

TimesUpAssistant.prototype.deactivate = function(event) {

};

TimesUpAssistant.prototype.cleanup = function(event) {

	Mojo.Event.stopListening(this.sceneAssistant.controller.get(this.buttonName), Mojo.Event.tap, 
		this.handleButtonPress.bind(this.sceneAssistant));
};

TimesUpAssistant.prototype.handleButtonPress = function(event) {
	var el = this.controller.get("times-up");
	
	WidgetRegistration.nextScene.bind(this)(el, "OneScore", event);
	
}
