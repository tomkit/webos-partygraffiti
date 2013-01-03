function StageAssistant() {
	var prefs = new Preferences();
	var words = new Words
	var spray = new Audio();
	
	spray.src = Mojo.appPath + "/sounds/spray.wav";
	
	spray.audioClass = "media";  
	
	spray.load();
	
	this.playAudio = function(audio) {
		if (audio == 'spray') {
			spray.play();
		}

	}
	
	this.getPrefs = function() {
		return prefs;
	}
	
	this.getWords = function() {
		return words;
	}
}

StageAssistant.prototype = new WidgetRegistration;

StageAssistant.prototype.setup = function() {
	  
	this.controller.pushScene({
		name: "Welcome",
		disableSceneScroller: true
	});
};


