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

    var winnerModal = function () {
      var winnerTitle = "THE WINNER IS: " + winner;
      new $.flavr({
          title  : winnerTitle,
          content  : 'Would you like to play again?',
          iconPath : 'images/',
          icon     : 'star.png',
          buttons  : {
          pvpButton  : { text: 'Yes, play opponant again', style: 'primary', addClass: 'submit-btn', 
                      action: function(){
                          playerVsPlayer();
                      }
          },
          pvcButton  : { text: 'No, go to the main menu', style: 'danger', addClass: 'submit-btn', 
                      action: function(){
                          playerVsComputer();
                      }
          }
        },
        buttonDisplay : 'stacked'
      });
    };

    var $getBoardAndText = $("#currentPlayerH1, .board");
    $getBoardAndText.css('visibility', 'hidden');
    var executePlayerMove = function () {
        placePlayerPiece(currentPlayer, $(this).attr('id'));
        $(this).text(currentPlayer);
        $(this).addClass("tileSelected");
        (currentPlayer === "X") ? $(this).css('color', '#fb6e52') : $(this).css('color', '#399c95');
        $(this).off();
    };

    var getPlayerColor = function () {
      if (currentPlayer === "X") {
        return '#fb6e52';
      } else {
        return '#399c95';
      }
    };

    var getWinnerColor = function () {
      if (winner === "X") {
        return '#fb6e52';
      } else {
        return '#399c95';
      }
    };

    var executeComputerMove = function () {
        var setComputerMove = computerMove();
        var computerMoveToID = '#' + setComputerMove;
        placePlayerPiece(currentPlayer, setComputerMove);
        $(computerMoveToID).text(currentPlayer);
        $(computerMoveToID).addClass("tileSelected");
        $(computerMoveToID).css('color', getPlayerColor());
        $(computerMoveToID).off();
    };

    var checkWinsGUIevents = function () {
        if (checkWins()) {
          $(".tile").off();
          var winnerSetToID = winnerSet.map(function(c) { 
            return '#' + c; } ).join(', ');
          $(".tile").removeClass("tileSelected");
          $(".tile").toggleClass('tileLoser');
          $(winnerSetToID).addClass("tileSelected");
          $("body").css('background', getWinnerColor());
          setTimeout(function(){ winnerModal() }, 2200);
          setTimeout(function(){ $("body").css('background', '#2e3846') }, 1000);
          setTimeout(function(){ $getBoardAndText.fadeOut(1000) }, 1000);
        } else {
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