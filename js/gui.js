$(document).ready(function() {
    $("#playerDisplay").text(currentPlayer);
    $(".tile").click(function() {
        placePlayerPiece(currentPlayer, $(this).attr('id'));
        $(this).text(currentPlayer);
        $(this).off();
        checkWins();
        if (checkWins()) {
          $("#winnerDisplay").text("Winning Player: " + winner + " " + winnerSet);
          $(".tile").off();
        } else {
          $("#winnerDisplay").text("No winner yet.");
          switchPlayer();
          $("#playerDisplay").text(currentPlayer);
        }
    });
});