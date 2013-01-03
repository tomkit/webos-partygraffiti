function Preferences() {
	var special = 1;
	var that = this;
	var teams = 1;
    var gameType = 'normal';
    var players = [];
	var curPlayerID = 1;
	var rounds = 5;
	
	this.setGameType = function(type) {
		gameType = type;
	}
	this.getGameType = function() {
		return gameType;
	}
	
	this.setCurrentPlayer = function(id) {
		curPlayerID = id;
	}
	
	this.incCurrentPlayer = function() {
		curPlayerID++;
	}
	
	this.getCurrentPlayerID = function() {
		return curPlayerID;
	}
	
	this.getPlayer = function(id) {
		return players[id-1];
	}
	
	this.getCurrentPlayer = function() {
		return players[curPlayerID-1];
	}
	
	this.getNumTeam = function() {
		return teams;
	}
	
	this.setNumTeam = function(num) {
		for (var i = 0; i < num; i++) {
			players[i] = new Player(i+1);
		}
		curPlayer = players[0];
		teams = num;
	}
	this.isRoundOver = function() {
		if (players[curPlayerID-1].getOnWord() > rounds) {
			return true;
		}
		
		return false;
	}
	this.isGameOver = function() {
		if (curPlayerID == teams && this.isRoundOver()) {
			return true;
		}
		
		return false;
	}
	this.reset = function() {
		teams = 1;
		gameType = 'normal';
		players = [];
		curPlayerID = 1;
		curPlayer = null;
		rounds = 5;
	}
	this.getPlayers = function(){
		return players;
	}

}
