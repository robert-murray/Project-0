$(document).ready(function() {
    $("#playerDisplay").text(currentPlayer);
    $(".tile").click(function() {
        placePlayerPiece(currentPlayer, $(this).attr('id'));
        $(this).text(currentPlayer);
        $(this).addClass("tileSelected");
        (currentPlayer === "X") ? $(this).css('color', '#fb6e52') : $(this).css('color', '#399c95');
        $(this).off();
        checkWins();
        if (checkWins()) {
          $("#winnerDisplay").text("Winning Player: " + winner + " " + winnerSet);
          $(".tile").off();
          var winnerSetToID = winnerSet.map(function(c) { 
          	return '#' + c; } ).join(', ');
          $(".tile").removeClass("selectedTiles");
          $(".tile").addClass('tileLoser')
          $(winnerSetToID).addClass("selectedTiles");
        } else {
          $("#winnerDisplay").text("No winner yet.");
          switchPlayer();
          $("#playerDisplay").text(currentPlayer);
        }
    });
});