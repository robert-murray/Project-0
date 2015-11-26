$(document).ready(function() {
//    var myDataRef = new Firebase('https://tictactoe01.firebaseio.com/');
    
    new $.flavr({
        title  : "IT'S TIC TAC TOE TIME",
        content  : 'What type of game would you like to play?',
        // iconPath : 'flavr/images/icons/',
        // icon     : 'star.png',
        buttons  : {
        pvpButton  : { text: 'Player Vs Player', style: 'primary', addClass: 'submit-btn', 
                    action: function(){
                        playerVsPlayer();
                    }
        },
        pvcButton  : { text: 'Player Vs computer', style: 'info', addClass: 'submit-btn', 
                    action: function(){
                        playerVsComputer();
                    }
        }
      },
      buttonDisplay : 'stacked'
    });
    var $getBoardAndText = $("#currentPlayerH1, .board");
    $getBoardAndText.css('visibility', 'hidden');
    var executePlayerMove = function () {
        placePlayerPiece(currentPlayer, $(this).attr('id'));
        $(this).text(currentPlayer);
        $(this).addClass("tileSelected");
        (currentPlayer === "X") ? $(this).css('color', '#fb6e52') : $(this).css('color', '#399c95');
        $(this).off();
    };

    var executeComputerMove = function () {
        var setComputerMove = computerMove();
        var computerMoveToID = '#' + setComputerMove;

        placePlayerPiece(currentPlayer, setComputerMove);

        // var addtext = function () {
        //   console.log(currentPlayer);
        //   $(computerMoveToID).text(currentPlayer);
        //   $(computerMoveToID).addClass("tileSelected");
        // };
        // setTimeout(addtext, 2000);

        $(computerMoveToID).text(currentPlayer);
        $(computerMoveToID).addClass("tileSelected");
        
        (currentPlayer === "X") ? $(computerMoveToID).css('color', '#fb6e52') : $(computerMoveToID).css('color', '#399c95');
        $(computerMoveToID).off();
    };

    var checkWinsGUIevents = function () {
        if (checkWins()) {
          $("#winnerDisplay").text("Winning Player: " + winner + " " + winnerSet);
          $(".tile").off();
          var winnerSetToID = winnerSet.map(function(c) { 
            return '#' + c; } ).join(', ');
          $(".tile").removeClass("tileSelected");
          $(".tile").addClass('tileLoser');
          $(winnerSetToID).addClass("tileSelected");
        } else {
          $("#winnerDisplay").text("No winner yet.");
          switchPlayer();
          $("#playerDisplay").text(currentPlayer);
        }
    }
  var playerVsPlayer = function () {
    $getBoardAndText.css('visibility', 'visible');
    $(".tile").click(function() {
      executePlayerMove.call(this);
      checkWinsGUIevents(checkWins());
    });
  };

  var playerVsComputer = function () {
    $getBoardAndText.css('visibility', 'visible');
    $(".tile").click(function() {
      executePlayerMove.call(this);
      checkWinsGUIevents(checkWins());
      executeComputerMove();
      checkWinsGUIevents(checkWins());
    });
  };


});