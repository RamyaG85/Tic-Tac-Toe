let currCell = "";
firstPlayerFlag = true;
const cross="X";
const circle="O";
let msg ="";
// let cell ;

// cell1 = document.querySelector('.row1col1');
// for (let rowIndex = 1; rowIndex < 4; rowIndex++) {  
//   for (let colIndex = 1; colIndex < 4; colIndex++) {
//     this["cell" + rowIndex + colIndex] = document.querySelector('.row' + rowIndex + 'col'+colIndex);
//     console.log(this["cell" + rowIndex + colIndex]);  
//     // console.log(`cell${rowIndex}${colIndex}`);      
//   }
// }
// console.log(this["cell" + rowIndex + colIndex]);

cell1 = document.querySelector('.row1col1');
cell2 = document.querySelector('.row1col2');
cell3 = document.querySelector('.row1col3');
cell4 = document.querySelector('.row2col1');
cell5 = document.querySelector('.row2col2');
cell6 = document.querySelector('.row2col3');
cell7 = document.querySelector('.row3col1');
cell8 = document.querySelector('.row3col2');
cell9 = document.querySelector('.row3col3');
// console.log(document.querySelector('.row3col3').value);
currentMsg = document.querySelector('h4');
allCells = document.querySelectorAll(".main--sec");
// console.log(allCells);

const buttonClick = (className) => {
  console.log("func called");
  currCell = document.getElementsByClassName(className)[0];
  console.log(currCell);
  console.log(firstPlayerFlag);
  if (firstPlayerFlag) {    
    currCell.innerText = cross;
    console.log("currCell.innerText is", currCell.innerText);
    
  } else {
    currCell.innerText = circle;
    // console.log(currCell);
    
  }
  msg = !firstPlayerFlag ? "Player 1 has to play": "Player 2 has to play";
  console.log(msg);
  matchCheck(className, currCell);
  currCell.style.pointerEvents = 'none';
  
  
}

const matchCheck = (className, currCell) => {
  console.log("Inside matchCheck");
  console.log(className);
  console.log(cell1.innerText);
  console.log(currCell.innerText);
  console.log(msg);
   if (cell1.innerText !== "" &&((cell1.innerText == cell2.innerText  && cell1.innerText == cell3.innerText) || (cell1.innerText == cell4.innerText && cell1.innerText == cell7.innerText) || (cell1.innerText == cell5.innerText && cell1.innerText== cell9.innerText))) {
     console.log("Inside first if");
        // firstPlayerFlag ? window.alert("Player 1 has won") : window.alert("Player 2 has won");
        msg = firstPlayerFlag ? "Player 1 has won": "Player 2 has won";
        [...allCells].map(item => item.style.pointerEvents = 'none');
      } 
      
    else if (cell9.innerText !== "" &&((cell9.innerText == cell6.innerText  && cell9.innerText == cell3.innerText) || (cell9.innerText == cell8.innerText && cell9.innerText == cell7.innerText) )) {    
      console.log("Inside second if");    
        msg = firstPlayerFlag ? "Player 1 has won": "Player 2 has won";
        [...allCells].map(item => item.style.pointerEvents = 'none');
      } 
    else if(cell5.innerText !== "" && ((cell5.innerText == cell4.innerText  && cell5.innerText == cell6.innerText) || (cell5.innerText == cell7.innerText && cell5.innerText == cell3.innerText) || (cell5.innerText == cell2.innerText && cell5.innerText== cell8.innerText))){
      console.log("Inside third if");
      msg = firstPlayerFlag ? "Player 1 has won": "Player 2 has won";
      [...allCells].map(item => item.style.pointerEvents = 'none');
      } else if ([...allCells].every(item => item.innerText !== "")){
        console.log("Inside fourth if");
        msg = "Match Draw";
        [...allCells].map(item => item.style.pointerEvents = 'none');
      } else{

      }
    
  
  firstPlayerFlag ? firstPlayerFlag = false : firstPlayerFlag = true;
  
  currentMsg.innerText = msg;
}


const handleReset = () => {
  console.log("Inside Reset func");
  [...allCells].map(item => {
    item.style.pointerEvents = 'all';
    item.innerText = "";    
  });
  firstPlayerFlag = true;
  currCell = "";
  msg="Start again !!";
  currentMsg.innerText = msg;
  console.log("currCell is", currCell);
  console.log("firstPlayerFlag is", firstPlayerFlag);
}

// const matchCheck = (className, currCell) => {
//   console.log("Inside matchCheck");
//   console.log(className);
//   console.log(cell1.innerText);
//   console.log(currCell.innerText);
//   console.log(msg);
//   switch (className) {
//     case "row1col1" :      
//       if ((cell1.innerText == cell2.innerText)  && (cell1.innerText == cell3.innerText) || (cell1.innerHTML == cell4.innerHTML && cell1.innerHTML == cell7.innerHTML) || (cell1.innerHTML == cell5.innerHTML && cell1.innerHTML== cell9.innerHTML)) {
//         // firstPlayerFlag ? window.alert("Player 1 has won") : window.alert("Player 2 has won");
//         msg = firstPlayerFlag ? "Player 1 has won": "Player 2 has won";
//       } else {
        
//       }
//       break;
//     case "row1col2" :      
//       if ((cell1.innerText == cell2.innerText)  && (cell1.innerText == cell3.innerText) || (cell1.innerHTML == cell4.innerHTML && cell1.innerHTML == cell7.innerHTML) || (cell1.innerHTML == cell5.innerHTML && cell1.innerHTML== cell9.innerHTML)) {
//         // firstPlayerFlag ? window.alert("Player 1 has won") : window.alert("Player 2 has won");
//         msg = firstPlayerFlag ? "Player 1 has won": "Player 2 has won";
//       }
//     default:
//       break;
//   }
//   firstPlayerFlag ? firstPlayerFlag = false : firstPlayerFlag = true;
//   // alert(msg);
//   // console.log(msg);
//   currentMsg.innerText = msg;
// }