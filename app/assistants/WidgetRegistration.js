function WidgetRegistration() {
	
}

WidgetRegistration.registerButton = function(buttonName, handler) {
		this.buttonAttribute = {
			"modelProperty" : 'value'
		}
	
		this.buttonModel = {
	    "label" : buttonName,
	    "buttonClass" : "",
	    "disabled" : false,
		"value" : buttonName
    	};
		
		this.controller.setupWidget(buttonName, this.buttonAttribute, this.buttonModel);
		
		Mojo.Event.listen(this.controller.get(buttonName), Mojo.Event.tap, 
	    	handler.bind(this));
		
}

WidgetRegistration.unregisterButton = function(buttonName, handler) {
	Mojo.Event.stopListening(this.controller.get(buttonName), Mojo.Event.tap, 
	    	handler.bind(this));
}

WidgetRegistration.nextScene = function(el, nextScene, event, optional) {
	
	this.controller.stageController.assistant.playAudio('spray');
	
	setTimeout(function() {
		if (el.attributes[1] && el.attributes[1].nodeValue.indexOf("stacked") == -1) {

			el.style.cssText += 'background-image:url("images/selected-button-background.png");';

		}
		else {

			el.style.cssText += 'background-image:url("images/selected-large-button-background.png");';

		}
	}, 250);
	
	var locStageCon = this.controller.stageController;
	var delegate = function(stageCon) {
		stageCon.popScene();
		stageCon.pushScene({
		 	name: nextScene,
		 	disableSceneScroller: true,
			transition: Mojo.Transition.crossFade,
		}, optional);
	}
	
	setTimeout(function() { delegate(locStageCon)}, 250);
	
}

WidgetRegistration.registerIntegerPicker = function(pickerName, min, max, picked, handler) {
	this.pickerAttribute = {
	    "label" : pickerName,
	    "min" : min,
		"max" : max,
		"modelProperty" : 'value'
    	};
		
	this.pickerModel = {
		"value" : picked
	}
		this.controller.setupWidget(pickerName, this.pickerAttribute, this.pickerModel);
		
		Mojo.Event.listen(this.controller.get(pickerName), Mojo.Event.propertyChange, 
	    	handler.bind(this));
}

WidgetRegistration.unregisterIntegerPicker = function(pickerName, handler) {
	Mojo.Event.stopListening(this.controller.get(pickerName), Mojo.Event.propertyChange, 
	    	handler.bind(this));
}
