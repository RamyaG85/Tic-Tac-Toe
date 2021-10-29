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
var player1 = "";
var player2 = "";
cell1 = document.querySelector('.row1col1');
cell2 = document.querySelector('.row1col2');
cell3 = document.querySelector('.row1col3');
cell4 = document.querySelector('.row2col1');
cell5 = document.querySelector('.row2col2');
cell6 = document.querySelector('.row2col3');
cell7 = document.querySelector('.row3col1');
cell8 = document.querySelector('.row3col2');
cell9 = document.querySelector('.row3col3');
currentMsg = document.querySelector('h2');
allCells = document.querySelectorAll(".main--sec"); //Function will be invoked for each button click

var buttonClick = function buttonClick(className) {
  currCell = document.getElementsByClassName(className)[0];

  if (firstPlayerFlag) {
    currCell.innerText = cross;
    currCell.style.color = "red";
  } else {
    currCell.innerText = circle;
    currCell.style.color = "blue";
  } // console.log("player1 is", player1);


  msg = (!firstPlayerFlag ? player1 ? player1 : 'Player 1' : player2 ? player2 : 'Player 2') + " has to play";
  matchCheck(className, currCell); // Disabling the current cell to prevent clicking again

  currCell.style.pointerEvents = 'none';
}; //Gets trigerred inside buttonClick function for each button and checks for possible matches


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
    msg = "Congratulations " + (firstPlayerFlag ? player1 ? player1 : 'Player 1' : player2 ? player2 : 'Player 2') + "!! You've won"; // Disabling all buttons

    _toConsumableArray(allCells).map(function (item) {
      return item.style.pointerEvents = 'none';
    }); //Popping out the result on entire screen with background greyed out by adding a different class to show the display


    document.querySelector(".winningMessageText").innerText = msg;
    document.querySelector(".winningMessage").classList.add("winMsgShow");
  } else if (_toConsumableArray(allCells).every(function (item) {
    return item.innerText !== "";
  })) {
    msg = "It's a tie !!"; // Disabling all buttons

    _toConsumableArray(allCells).map(function (item) {
      return item.style.pointerEvents = 'none';
    }); //Popping out the result on entire screen with background greyed out by adding a different class to show the display


    document.querySelector(".winningMessageText").innerText = msg;
    document.querySelector(".winningMessage").classList.add("winMsgShow");
  }

  firstPlayerFlag ? firstPlayerFlag = false : firstPlayerFlag = true;
  currentMsg.innerText = msg;
};

var handleReset = function handleReset() {
  //The result screen with background greyed out has to be removed by removing the class which was added to show the display
  document.querySelector(".winningMessage").classList.remove("winMsgShow"); // Enabling all buttons after converting from nodelist to array list and using map

  _toConsumableArray(allCells).map(function (item) {
    item.style.pointerEvents = 'all';
    item.innerText = "";
  }); //Clearing all the variables


  firstPlayerFlag = true;
  currCell = "";
  msg = "";
  currentMsg.innerText = msg;
}; // Storing the Player names for display and to display in leader board


var submitMessage = function submitMessage(event) {
  event.preventDefault();
  player1 = document.querySelector('#player1').value;
  player2 = document.querySelector('#player2').value;
  console.log(player1);
  console.log(player2);
  /* Fetch existing messages from sessionStorage */
  // let currentMessages = [];
  // if (window.sessionStorage.getItem("messages")) {
  //   currentMessages = JSON.parse(window.sessionStorage.getItem("messages"));
  // }
};