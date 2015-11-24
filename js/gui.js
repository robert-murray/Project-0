$(document).ready(function() {
    var selectedTile;
    $("#playerDisplay").text(currentPlayer);
    $(".tile").click(function(tile) {
        selectedTile = tile.target.id;
        placePlayerPiece(currentPlayer, selectedTile);
        $(this).text(currentPlayer);
   		checkWins();
   		$("#winnerDisplay").text("Winning Player: " + winner + " " + winnerSet);
        switchPlayer();
   		$("#playerDisplay").text(currentPlayer);
    });
});

// set up players
// switch between players
// get the tile ID on click
// set the move to board tile gui
// set the move to game.js board
// check for potential wins