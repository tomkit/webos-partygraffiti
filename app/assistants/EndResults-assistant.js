function EndResultsAssistant() {

}



EndResultsAssistant.prototype.setup = function() {
	this.controller.setupWidget(Mojo.Menu.appMenu, this.attributes = {
         omitDefaultItems: true
    }, null);
	
	function sortPlayerScores(playerA, playerB) {
		return playerB.getScore() - playerA.getScore();
	};
	
	this.prefs = this.controller.stageController.assistant.getPrefs();
	var players = this.prefs.getPlayers();
	players.sort(sortPlayerScores);

	var list = this.controller.document.createElement('span');
	list.setAttribute('id', 'inner-scores');
	var listString = '';
	
	listString += '<ol>'
	var topScore = players[0].getScore();
	for (var i = 0; i < players.length; i++) {
		if (players[i].getScore() == topScore) {
			listString += '<li><span id="winner">Player ' + players[i].getPlayerNum() + ': ' + players[i].getScore() + '</span></li>';
		}		
		else {
			listString += '<li>Player' + players[i].getPlayerNum() + ': ' + players[i].getScore() + '</li>';
		}
	}
	listString += '</ol>';
	list.innerHTML = listString;
	this.controller.get("scores").appendChild(list);
	
	WidgetRegistration.registerButton.bind(this)("playAgain", this.handleButtonPress);
	WidgetRegistration.registerButton.bind(this)("buy", this.buy);
	
};

EndResultsAssistant.prototype.activate = function(event) {

};

EndResultsAssistant.prototype.deactivate = function(event) {

};

EndResultsAssistant.prototype.cleanup = function(event) {
	
	WidgetRegistration.unregisterButton.bind(this)("playAgain", this.handleButtonPress);
	WidgetRegistration.unregisterButton.bind(this)("buy", this.buy);
};

EndResultsAssistant.prototype.handleButtonPress = function(event) {
	var el = this.controller.get("playAgain");
	
	WidgetRegistration.nextScene.bind(this)(el, "Welcome", event);
};

EndResultsAssistant.prototype.buy = function(event) {
	this.controller.serviceRequest("palm://com.palm.applicationManager", {
               method: "open",
               parameters:  {
                   id: 'com.palm.app.browser',
                   params: {
                       target: "http://developer.palm.com/appredirect/?packageid=com.tomkit.partygraffiti"
                   }
               }
             });  
};
