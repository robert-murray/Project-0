// Setup the board object
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

// Setup the winning combinations
var winCombos = {
    h1: ['A', 'B', 'C'],
    h2: ['D', 'E', 'F'],
    h3: ['G', 'H', 'I'],
    v1: ['A', 'D', 'G'],
    v2: ['B', 'E', 'H'],
    v3: ['C', 'F', 'I'],
    d1: ['A', 'E', 'I'],
    d2: ['C', 'E', 'G']
};

// Setup the players (used object for potential future expansion i.e, 3*players)
var players = ['X', 'O'];

// Set the first player
var currentPlayer = 'X';

// Function to switches between players
var switchPlayer = function () {
    if (currentPlayer === players[0]) {
        currentPlayer = players[1];
    } else {
        currentPlayer = players[0];
    }
};

// Function to assign current player to board object
var placePlayerPiece = function (player, position) {
    board[position] = currentPlayer;
};

// Setup the winning set - checkWins function pushes a chec
var winnerSet = [];

// Setup the winner
var winner;

// Check winning combination against the board data
// If win combo is found - passes the combination to winnerSet
// If win combo is found - sets winner to player ('X' or 'O')
// Returns true if winner is found
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
            return true;
        } else if (checkSet === "OOO") {
            winnerSet = winSet;
            winner = 'O';
            return true;
        }
    };
    return false;
};

// Iterates through board, if null (empty position) if found,
// pushes the key (eg. "A", "B", etc.) of the null entry to array
// Return statement: 
// Generates random number * number of empty positions parsed to Integer
// eg. 6 empty positions will generate a random number from 0 - 6
// Then returns one of the letter string value of empty postition array
var computerMove = function () {
    var emptyPositions = [];
    for (var i = 0; i < Object.keys(board).length; i++) {
        if (board[Object.keys(board)[i]] === null) {
            emptyPositions.push(Object.keys(board)[i]);
        }
    }
    return emptyPositions[parseInt(Math.random() * emptyPositions.length)];
};

// Iterates through board object re-writing all values to null
// Sets winnerSet to empty array
// Sets winner to undefined
var resetBoardData = function () {
    for (var i = 0; i < Object.keys(board).length; i++) {
        board[Object.keys(board)[i]] = null;
    };
    winnerSet = [];
    winner = undefined;
}
