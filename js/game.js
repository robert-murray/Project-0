var board = {
	'A': null,
	'B': null,
	'C': null,
	'D': null,
	'E': null,
	'F': null,
	'G': null,
	'H': null,
	'I': null
};

var winCombos = {
	h1: ['A', 'B', 'C'],
	h2: ['D', 'E', 'F'],
	h3: ['G', 'H', 'I'],
	v1: ['A', 'D', 'G'],
	v2: ['B', 'E', 'H'],
	v3: ['C', 'F', 'I'],
	d1: ['A', 'E', 'I'],
	d2: ['C', 'E', 'H']
};

var winnerSet = [];
var winner;

var checkWins = function () {
	for (var i = 0; i < Object.keys(winCombos).length; i++) {
		var winSet = winCombos[Object.keys(winCombos)[i]];
		var checkSet = [];
		for (var j = 0; j < winSet.length; j++) {
			checkSet.push(board[winSet[j]]);
		}
		var checkSet = checkSet.toString().replace(/,/g, '');
		if (checkSet === "XXX") {
			winnerSet = winSet;
			winner = 'X';
		}
		if (checkSet === "OOO") {
			winnerSet = winSet;
			winner = 'O';
		}
	};
	console.log(checkSet);
};

checkWins();
console.log("Winning set: " + winnerSet + " Winning Player: " + winner);

