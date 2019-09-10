const user = 'X';
const computer = 'O';
const userValue = 1;
const computerValue = -1;
var counter = 0;
var easyButton = document.getElementById("easyButton");
var hardButton = document.getElementById("hardButton");
var impossibleButton = document.getElementById("impossibleButton");
var resetButton = document.getElementById("result");
var playBoard = [0,0,0,0,0,0,0,0,0];
const winnings = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[6,4,2]];
var gameBoard = [[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]];
const boxes = document.querySelectorAll('.box');
var easyMode=true;
var hardMode=false;
var impossibleMode=false;

restartGame();
easyButton.classList.add("selectedButton");

easyButton.addEventListener("click", function(){
    easyButton.classList.add("selectedButton");
    hardButton.classList.remove("selectedButton");
    restartGame();
})

hardButton.addEventListener("click", function(){
    hardButton.classList.add("selectedButton");
    easyButton.classList.remove("selectedButton");
    restartGame();
})

function restartGame(){
    easyMode=false;
    hardMode=true;
    clearBoards();
    counter=0;
    for (var i = 0; i < boxes.length; i++) {
    boxes[i].innerText = '';
    boxes[i].addEventListener('click', click);
    resetButton.textContent = "";
    }
}
function click(square) {  
    if ((playBoard[square.target.id]==0)&&(!checkWin()&&!checkTie())) {
        implement(square.target.id, user, userValue);
	counter++;
    }
    if(!checkWin()&&!checkTie()&&counter%2==1){
        setTimeout(implement, 750,difficulty(), computer, computerValue);
	counter++;
    }
}
function implement(squareId, player, playerno) {
    printMoveOnBoard(squareId, playerno)
	playBoard[squareId] = playerno;
    document.getElementById(squareId).innerText = player;
    if(checkTie()){
        resetButton.textContent = "Tied";
    }
    if(checkWin()){declareWinner();}
}

function difficulty(){
    if(easyMode){
        return easyMove();
    } else {return hardMove();}
}

function easyMove(){
    for(var x=-2; x<3; x+=4){
        for(var i=0;i<8;i++){
            if(((gameBoard[i][0])+(gameBoard[i][1])+(gameBoard[i][2]))==x){
                for(var j=0;j<3;j++){
                    if((gameBoard[i][j])==0){
                        return [winnings[i][j]];
                        break;
                    }
                }
            }
        }
    }
    var randomNumber = Math.floor(Math.random()*9);
    while(playBoard[randomNumber]!=0) {
		randomNumber = Math.floor(Math.random()*9);
    }
    return randomNumber;
}

function hardMove(){
    for(var x=-2; x<3; x+=4){
        for(var i=0;i<8;i++){
            if(((gameBoard[i][0])+(gameBoard[i][1])+(gameBoard[i][2]))==x){
                for(var j=0;j<3;j++){
                    if((gameBoard[i][j])==0){
                        return [winnings[i][j]];
                        break;
                    }
                }
            }
        }
    }
    if(playBoard[4]==0){
        return 4;
    }
    var randomNumber = Math.floor(Math.random()*9);
    while(playBoard[randomNumber]!=0) {
		randomNumber = Math.floor(Math.random()*9);
    }
    return randomNumber;
}

function printMoveOnBoard(number,value){
   for(var i=0; i<winnings.length; i++){
       for(var j=0;j<3;j++){
           if((winnings[i][j])==number){
               gameBoard[i][j]=value;
           }
       }
   }
}

function clearBoards(){
    for (var i = 0; i < boxes.length; i++) {
        playBoard[i]=0;}
    for(var i=0; i<gameBoard.length; i++){
        for(var j=0;j<3;j++){
                gameBoard[i][j]=0;
            }
        }
}

function checkWin(){
    for(var i=0;i<8;i++){
        if((((gameBoard[i][0])+(gameBoard[i][1])+(gameBoard[i][2]))==3) ||
        (((gameBoard[i][0])+(gameBoard[i][1])+(gameBoard[i][2]))==-3)){
            return true;
        }
    }
    return false;
}

function checkTie(){
    var zero = 0;
    for(var i=0; i<playBoard.length; i++){
        if(playBoard[i]==0){
            zero=1;
        }
    }
    if(zero==0 && !checkWin()){
        return true;
    }
    return false;
}

function checkWinner(winner){
    if(checkWin){
        for (var i=0;i<gameBoard.length; i++){
            if((gameBoard[i][0])+(gameBoard[i][1])+(gameBoard[i][2])==winner*3){
                return true;
                break;
            }
        }
    } return false;
}

function declareWinner(){
    if(checkWin()){
        if(checkWinner(userValue)){
            resetButton.textContent = "You win!";;
        } else if(checkWinner(computerValue))
        {resetButton.textContent = "You lose!";}
    }
}
