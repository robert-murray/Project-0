var gameWon = false;
$(document).ready(function () {
    
    // sets variable to record game type 
    // 'vsPlayer' = Player vs Player, or 
    // 'vsComputer' = Player vs Computer
    var gameTypeInPlay;

    // Main menu modal using flavr.js plugin
    // includes option to initiate vs Computer or vs Player game
    new $.flavr({
        title: "IT'S TIC TAC TOE TIME",
        content: 'What type of game would you like to play?',
        buttons: {
            pvpButton: {
                text: 'Player Vs Player',
                style: 'primary',
                addClass: 'submit-btn',
                action: function () {
                    gameTypeInPlay = 'vsPlayer';
                    playerVsPlayer();
                    $getBoardAndText.css('visibility', 'visible');
                }
            },
            pvcButton: {
                text: 'Player Vs computer',
                style: 'info',
                addClass: 'submit-btn',
                action: function () {
                    gameTypeInPlay = 'vsComputer';
                    playerVsComputer();
                    $getBoardAndText.css('visibility', 'visible');
                }
            }
        },
        buttonDisplay: 'stacked'
    });

    // Winner modal using flavr.js plugin
    // Has option to replay opponant or reset game (via page reload)
    var winnerModal = function () {
        gameWon = true;
        var winnerTitle = "THE WINNER IS " + winner;
        new $.flavr({
            title: winnerTitle,
            content: 'Would you like to play again?',
            iconPath: 'images/',
            icon: 'star.png',
            buttons: {
                pvpButton: {
                    text: 'Yes, play opponant again',
                    style: 'primary',
                    addClass: 'submit-btn',
                    action: function () {
                        $(".flavr-container").remove();
                        resetBoard();
                    }
                },
                pvcButton: {
                    text: 'No, go to the main menu',
                    style: 'danger',
                    addClass: 'submit-btn',
                    action: function () {
                        location.reload();
                    }
                }
            },
            buttonDisplay: 'stacked'
        });
    };

    // Tie modal using flavr.js plugin
    // Has option to replay opponant or reset game (via page reload)
    var tieModal = function () {
        gameWon = true;
        var winnerTitle = "IT'S A " + winner;
        new $.flavr({
            title: winnerTitle,
            content: 'Would you like to play again?',
            buttons: {
                pvpButton: {
                    text: 'Yes, play opponant again',
                    style: 'primary',
                    addClass: 'submit-btn',
                    action: function () {
                        $(".flavr-container").remove();
                        resetBoard();
                    }
                },
                pvcButton: {
                    text: 'No, go to the main menu',
                    style: 'danger',
                    addClass: 'submit-btn',
                    action: function () {
                        location.reload();
                    }
                }
            },
            buttonDisplay: 'stacked'
        });
    };

    // Sets jquery var for current player heading and all html board elements
    var $getBoardAndText = $("#currentPlayerH1, .board");
    
    // Hides board elements at startup (while main menu is showing)
    $getBoardAndText.css('visibility', 'hidden');

    // Sets string with CSS class
    // Used to change the tile text color 
    var getPlayerColor = function () {
        if (currentPlayer === "X") {
            return 'tileTextX';
        } else {
            return 'tileTextO';
        }
    };

    // Sets string with HEX colour value 
    // Used to change the 'body' background to player colour on win
    var getWinnerColor = function () {
        if (winner === "X") {
            return '#fb6e52';
        } else {
            return '#399c95';
        }
    };
    var playCount = 0;
    // Assign current player string ('X' or 'O') to board object 
    // Uses selected tile's ID to wirite to appropriate key in board data
    // Assigns current player string to selected tile's text (html element)
    // Assigns current player's colour to selected tile's text (html element)
    // Turns off click function for selected tile
    var executePlayerMove = function () {
        if ( gameWon ) { return; }
        placePlayerPiece(currentPlayer, $(this).attr('id'));
        $(this).text(currentPlayer);
        $(this).addClass("tileSelected");
        $(this).addClass(getPlayerColor());
        $(this).off();
        playCount++;
    };

    // Assign current player string ('X' or 'O') to board object 
    // Sets a random letter string value of any empty postition array
    // Uses random string value to wirite to appropriate key in board data
    // Assigns current player string ('X' or 'O') tile's text (html element)
    //  - using random letter as ID value
    // Assigns current player's colour to tile's text (html element)
    // Turns off click function for selected tile
    var executeComputerMove = function () {
        if ( gameWon ) { return; }
        var setComputerMove = computerMove();
        var computerMoveToID = '#' + setComputerMove;
        placePlayerPiece(currentPlayer, setComputerMove);
        $(computerMoveToID).text(currentPlayer);
        $(computerMoveToID).addClass("tileSelected");
        $(computerMoveToID).addClass(getPlayerColor());
        $(computerMoveToID).off();
        playCount++;
    };

    // Truns off click function for all tiles
    // Saves string of element IDs based on winnerSet
    // Toggles / Adds classes to highligh winning tiles
    // Fades BG color to winners color
    // Fades BG back to default color
    // Displays winner modal
    var checkWinsGUIevents = function (e) {
        if (checkWins() && !gameWon) {
            $(".tile").off();
            var winnerSetToID = winnerSet.map(function (c) {
                return '#' + c;}).join(', ');
            $(".tile").removeClass("tileSelected");
            $(".tile").toggleClass('tileLoser');
            $(winnerSetToID).addClass("tileSelected");
            $("body").css('background', getWinnerColor());
            setTimeout(function () {
                // Added local closure to prevent 
                // timeout scope issue where winner modal
                // initiates multiple times while timeout event
                // is still in action
                if ( !gameWon ) {
                    winnerModal()
                }
            }, 2200);
            setTimeout(function () {
                $("body").css('background', '#2e3846')
            }, 1500);
            setTimeout(function () {
                $getBoardAndText.fadeOut(1500)
            }, 1000);
        } else if (playCount === 9) {
            $(".tile").off();
            
            $(".tile").removeClass("tileSelected");
            $(".tile").toggleClass('tileLoser');
            $(winnerSetToID).addClass("tileSelected");
            $("body").css('background', '#CCCCCC');
            winner = "TIE";
            setTimeout(function () {
                // Added local closure to prevent 
                // timeout scope issue where winner modal
                // initiates multiple times while timeout event
                // is still in action
                if ( !gameWon ) {
                    tieModal()
                }
            }, 2200);
            setTimeout(function () {
                $("body").css('background', '#2e3846')
            }, 1500);
            setTimeout(function () {
                $getBoardAndText.fadeOut(1500)
            }, 1000);
        } else {
            switchPlayer();
            $("#playerDisplay").text(currentPlayer);
        }
    };

    // Executes player move function on click
    // Check for wins and applies GUI changes
    var playerVsPlayer = function () {
        $(".tile").off();
        $(".tile").click(function () {
            executePlayerMove.call(this);
            checkWinsGUIevents(checkWins());
        });
    };

    // Executes player move function on click
    // Check for wins and applies GUI changes
    // Executes computer move function
    // Check for wins and applies GUI changes
    var playerVsComputer = function () {
        $(".tile").off();
        $(".tile").unbind("click");
        $(".tile").click(function (e) {
            executePlayerMove.call(this);
            checkWinsGUIevents(checkWins());
            executeComputerMove();
            checkWinsGUIevents(checkWins());
        });
    };

    // Resets board data
    // Removes all added classes relating to player moves
    // Changes text in tiles ('X' or 'O') to '&nbsp;'
    // '&nbsp;' was used to resolve line height issue changing tile position
    // Checks current game type and re-initiates appropriate game 
    var resetBoard = function () {
        gameWon = false;
        $(".tile").unbind("click");
        $(".tile").off();
        $(".tile").removeClass("tileSelected");
        $(".tile").removeClass('tileLoser');
        $(".tile").removeClass('tileTextX');
        $(".tile").removeClass('tileTextO');
        $(".tile").html('&nbsp;');
        resetBoardData();
        playCount = 0;
        $getBoardAndText.css('visibility', 'visible');
        $getBoardAndText.fadeIn(1500);
        if (gameTypeInPlay === 'vsPlayer') {
            playerVsPlayer();
        } else {
            playerVsComputer();
        }
    };

});