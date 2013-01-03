function Player(options) {
	var playerNum;
	var onWord;
	var score = 0;

	var playerNum = arguments[0];
	
	var onWord = 1;	
	
	this.setOnWord = function(num) {
		onWord = num;
	}
	
	this.incOnWord = function() {
		onWord++;
	}
	
	this.getOnWord = function() {
		return onWord;
	}
	
	this.setPlayerNum = function(num) {
		playerNum = num;
	}
	
	this.getPlayerNum = function() {
		return playerNum;
	}
	
	this.addScore = function() {
		score += 10;
	}
	
	this.removeScore = function() {
		score -= 10;
	}
	
	this.getScore = function() {
		return score;
	}
}

