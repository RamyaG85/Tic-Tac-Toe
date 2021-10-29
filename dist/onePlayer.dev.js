"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var currCell = "";
firstPlayerFlag = true;
var cross = "X";
var circle = "O";
var msg = "";
onePlayerFlag = true;
var board = [];
var COLUMN = 3;
var ROW = 3; // STORE PLAYER'S MOVES

var gameData = new Array(9); // By default the first player to play is the human

var currentPlayer = player.man; // Win combinations

var COMBOS = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]]; // FOR GAME OVER CHECK

var GAME_OVER = false;

var drawBoard = function drawBoard() {
  // We give every space a unique id
  // So we know exactly where to put the player's move on the gameData Array
  var id = 0;

  for (var i = 0; i < ROW; i++) {
    board[i] = [];

    for (var j = 0; j < COLUMN; j++) {
      board[i][j] = id;
      id++;
    }
  }
};

drawBoard();
cell1 = document.querySelector('.row1col1');
cell2 = document.querySelector('.row1col2');
cell3 = document.querySelector('.row1col3');
cell4 = document.querySelector('.row2col1');
cell5 = document.querySelector('.row2col2');
cell6 = document.querySelector('.row2col3');
cell7 = document.querySelector('.row3col1');
cell8 = document.querySelector('.row3col2');
cell9 = document.querySelector('.row3col3'); // console.log(document.querySelector('.row3col3').value);

currentMsg = document.querySelector('h4');
allCells = document.querySelectorAll(".main--sec"); // console.log(allCells);
//Function will be invoked for each button click

var buttonClick = function buttonClick(className) {
  currCell = document.getElementsByClassName(className)[0];

  if (firstPlayerFlag) {
    currCell.innerText = cross;
    currCell.style.color = "red";
  } else {
    currCell.innerText = circle;
    currCell.style.color = "blue";
  }

  msg = !firstPlayerFlag ? "Player 1 has to play" : "Player 2 has to play";
  matchCheck(className, currCell);
  currCell.style.pointerEvents = 'none';
};

var matchCheck = function matchCheck(className, currCell) {
  if (cell1.innerText !== "" && ( //Check for cells (1, 2, 3) match
  cell1.innerText == cell2.innerText && cell1.innerText == cell3.innerText || //Check for cells (1, 4, 7) match 
  cell1.innerText == cell4.innerText && cell1.innerText == cell7.innerText || //Check for cells (1, 5, 9) match
  cell1.innerText == cell5.innerText && cell1.innerText == cell9.innerText) || cell9.innerText !== "" && ( //Check for cells (3,6,9) match
  cell9.innerText == cell6.innerText && cell9.innerText == cell3.innerText || //Check for cells (7,8,9) match
  cell9.innerText == cell8.innerText && cell9.innerText == cell7.innerText) || cell5.innerText !== "" && ( //Check for cells (4,5,6) match
  cell5.innerText == cell4.innerText && cell5.innerText == cell6.innerText || //Check for cells (3,5,7) match
  cell5.innerText == cell7.innerText && cell5.innerText == cell3.innerText || //Check for cells (2,5,8) match
  cell5.innerText == cell2.innerText && cell5.innerText == cell8.innerText)) {
    msg = firstPlayerFlag ? "Congratulations !! Player 1 has won" : "Congratulations !! Player 2 has won";

    _toConsumableArray(allCells).map(function (item) {
      return item.style.pointerEvents = 'none';
    });

    document.querySelector(".winningMessageText").innerText = msg;
    document.querySelector(".winningMessage").classList.add("winMsgShow");
  } else if (_toConsumableArray(allCells).every(function (item) {
    return item.innerText !== "";
  })) {
    msg = "It's a tie !!";

    _toConsumableArray(allCells).map(function (item) {
      return item.style.pointerEvents = 'none';
    });

    document.querySelector(".winningMessageText").innerText = msg;
    document.querySelector(".winningMessage").classList.add("winMsgShow");
  }

  firstPlayerFlag ? firstPlayerFlag = false : firstPlayerFlag = true;
  currentMsg.innerText = msg;
};

var handleReset = function handleReset() {
  document.querySelector(".winningMessage").classList.remove("winMsgShow");

  _toConsumableArray(allCells).map(function (item) {
    item.style.pointerEvents = 'all';
    item.innerText = "";
  });

  firstPlayerFlag = true;
  currCell = "";
  msg = "";
  currentMsg.innerText = msg;
}; // MINIMAX


function minimax(gameData, PLAYER) {
  // BASE
  if (isWinner(gameData, player.computer)) return {
    evaluation: +10
  };
  if (isWinner(gameData, player.man)) return {
    evaluation: -10
  };
  if (isTie(gameData)) return {
    evaluation: 0
  }; // LOOK FOR EMTY SPACES

  var EMPTY_SPACES = getEmptySpaces(gameData); // SAVE ALL MOVES AND THEIR EVALUATIONS

  var moves = []; // LOOP OVER THE EMPTY SPACES TO EVALUATE THEM

  for (var i = 0; i < EMPTY_SPACES.length; i++) {
    // GET THE ID OF THE EMPTY SPACE
    var id = EMPTY_SPACES[i]; // BACK UP THE SPACE

    var backup = gameData[id]; // MAKE THE MOVE FOR THE PLAYER

    gameData[id] = PLAYER; // SAVE THE MOVE'S ID AND EVALUATION

    var move = {};
    move.id = id; // THE MOVE EVALUATION

    if (PLAYER == player.computer) {
      move.evaluation = minimax(gameData, player.man).evaluation;
    } else {
      move.evaluation = minimax(gameData, player.computer).evaluation;
    } // RESTORE SPACE


    gameData[id] = backup; // SAVE MOVE TO MOVES ARRAY

    moves.push(move);
  } // MINIMAX ALGORITHM


  var bestMove;

  if (PLAYER == player.computer) {
    // MAXIMIZER
    var bestEvaluation = -Infinity;

    for (var _i = 0; _i < moves.length; _i++) {
      if (moves[_i].evaluation > bestEvaluation) {
        bestEvaluation = moves[_i].evaluation;
        bestMove = moves[_i];
      }
    }
  } else {
    // MINIMIZER
    var _bestEvaluation = +Infinity;

    for (var _i2 = 0; _i2 < moves.length; _i2++) {
      if (moves[_i2].evaluation < _bestEvaluation) {
        _bestEvaluation = moves[_i2].evaluation;
        bestMove = moves[_i2];
      }
    }
  }

  return bestMove;
} // ON PLAYER'S CLICK


canvas.addEventListener("click", function (event) {
  // IF IT's A GAME OVER? EXIT
  if (GAME_OVER) return; // X & Y position of mouse click relative to the canvas

  var X = event.clientX - canvas.getBoundingClientRect().x;
  var Y = event.clientY - canvas.getBoundingClientRect().y; // WE CALCULATE i & j of the clicked SPACE

  var i = Math.floor(Y / SPACE_SIZE);
  var j = Math.floor(X / SPACE_SIZE); // Get the id of the space the player clicked on

  var id = board[i][j]; // Prevent the player to play the same space twice

  if (gameData[id]) return; // store the player's move to gameData

  gameData[id] = currentPlayer; // draw the move on board

  drawOnBoard(currentPlayer, i, j); // Check if the play wins

  if (isWinner(gameData, currentPlayer)) {
    showGameOver(currentPlayer);
    GAME_OVER = true;
    return;
  } // check if it's a tie game


  if (isTie(gameData)) {
    showGameOver("tie");
    GAME_OVER = true;
    return;
  }

  if (OPPONENT == "computer") {
    // get id of space using minimax algorithm
    var _id = minimax(gameData, player.computer).id; // store the player's move to gameData

    gameData[_id] = player.computer; // get i and j of space

    var space = getIJ(_id); // draw the move on board

    drawOnBoard(player.computer, space.i, space.j); // Check if the play wins

    if (isWinner(gameData, player.computer)) {
      showGameOver(player.computer);
      GAME_OVER = true;
      return;
    } // check if it's a tie game


    if (isTie(gameData)) {
      showGameOver("tie");
      GAME_OVER = true;
      return;
    }
  } else {
    // GIVE TURN TO THE OTHER PLAYER
    currentPlayer = currentPlayer == player.man ? player.friend : player.man;
  }
});