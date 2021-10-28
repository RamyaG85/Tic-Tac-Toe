let currCell = "";
firstPlayerFlag = true;
const cross="X";
const circle="O";
let msg ="";

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
allCells = document.querySelectorAll(".main--sec");

//Function will be invoked for each button click
const buttonClick = (className) => {  
  currCell = document.getElementsByClassName(className)[0];  
  if (firstPlayerFlag) {    
    currCell.innerText = cross;    
    currCell.style.color= "red";
  } else {
    currCell.innerText = circle;
    currCell.style.color= "blue";
  }
  msg = !firstPlayerFlag ? "Player 1 has to play": "Player 2 has to play";  
  matchCheck(className, currCell);
  currCell.style.pointerEvents = 'none';
}

//Gets trigerred inside buttonClick function for each button and checks for possible matches
const matchCheck = (className, currCell) => {  
   if (
     (cell1.innerText !== "" &&
      //Check for cells (1, 2, 3) match
     ((cell1.innerText == cell2.innerText  && cell1.innerText == cell3.innerText) ||
     //Check for cells (1, 4, 7) match 
     (cell1.innerText == cell4.innerText && cell1.innerText == cell7.innerText) || 
     //Check for cells (1, 5, 9) match
     (cell1.innerText == cell5.innerText && cell1.innerText== cell9.innerText))) ||
     (cell9.innerText !== "" &&
     //Check for cells (3,6,9) match
     ((cell9.innerText == cell6.innerText  && cell9.innerText == cell3.innerText) || 
     //Check for cells (7,8,9) match
     (cell9.innerText == cell8.innerText && cell9.innerText == cell7.innerText) )) ||
     (cell5.innerText !== "" && 
     //Check for cells (4,5,6) match
     ((cell5.innerText == cell4.innerText  && cell5.innerText == cell6.innerText) || 
     //Check for cells (3,5,7) match
     (cell5.innerText == cell7.innerText && cell5.innerText == cell3.innerText) || 
     //Check for cells (2,5,8) match
     (cell5.innerText == cell2.innerText && cell5.innerText== cell8.innerText)))
   )
     {     
        msg = firstPlayerFlag ? "Congratulations !! Player 1 has won": "Congratulations !! Player 2 has won";
        [...allCells].map(item => item.style.pointerEvents = 'none');
        document.querySelector(".winningMessageText").innerText = msg;
        document.querySelector(".winningMessage").classList.add("winMsgShow");        
      }  
    
      else if ([...allCells].every(item => item.innerText !== "")){        
        msg = "It's a tie !!";
        [...allCells].map(item => item.style.pointerEvents = 'none');
        document.querySelector(".winningMessageText").innerText = msg;
        document.querySelector(".winningMessage").classList.add("winMsgShow");
      }   
  
  firstPlayerFlag ? firstPlayerFlag = false : firstPlayerFlag = true;  
  currentMsg.innerText = msg;  
}


const handleReset = () => {
  document.querySelector(".winningMessage").classList.remove("winMsgShow");  
  [...allCells].map(item => {
    item.style.pointerEvents = 'all';
    item.innerText = "";    
  });
  firstPlayerFlag = true;
  currCell = "";
  msg="";
  currentMsg.innerText = msg;  
}