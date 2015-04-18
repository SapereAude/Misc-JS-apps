/***************************
 * 
 *  Javascript - TicTacToe
 * 
 ***************************/

var startGame = (function (){
//Selecting all the Tic-Tac-Toe squares
    var randomNumber;
    var gameBoard = document.querySelectorAll('#tic-tac-toe span .front-squ');
    var endGameMessage = document.getElementById('curtain');
    var xPlayersTurn = true;
    var isUsedNum = true;
    var xSquares = [];
    var oSquares = [];
    var xForTheWin = [0, 0, 0, 0, 0, 0, 0, 0];
    var oForTheWin = [0, 0, 0, 0, 0, 0, 0, 0];
    var winCombo = [[1, 2, 3],
                    [4, 5, 6],
                    [7, 8, 9],
                    [1, 5, 9],
                    [3, 6, 9],
                    [2, 5, 8],
                    [1, 4, 7],
                    [3, 5, 7]];

var play = (function (){
        // Register events on squares
        for(var square = 0; square < gameBoard.length; square++){
            gameBoard[square].onclick = function(e){
                
                if(xSquares.length == 0){
                    for(var squareNumber = 0; squareNumber < gameBoard.length; squareNumber++){
                        gameBoard[squareNumber].nextElementSibling.innerHTML = '';
                        
                    }
                }
                
                //Checks if square is empty
                if(this.innerHTML === ''){
                    if(xPlayersTurn === true){
                        this.nextElementSibling.innerHTML = 'X';
                    }
                    else if(xPlayersTurn === false){
                        this.nextElementSibling.innerHTML = 'O';
                    }
                        this.parentNode.className += ' ' + 'flip-it-up';
                        this.innerHTML = ' ';

                    for(var selectedSquare = 0; selectedSquare < gameBoard.length; selectedSquare++){
                        //register the clicked square for each player
                        if(this.parentNode.id === ('squ-' + (selectedSquare+1))){
                            if(xPlayersTurn === true)
                            {
                                xSquares.push(selectedSquare+1);
                                checkWin(xSquares, xSquares.length-1, xPlayersTurn);
                            }
                            else{
                                oSquares.push(selectedSquare+1);
                                checkWin(oSquares, oSquares.length-1, xPlayersTurn);
                            }

                        }
                    }
                }
            };
        }
})();

function checkWin(checkPlayer, checkIndex, isPlayerX){checkWin:{// check winning conditions
        for(var winRow = 0; winRow < winCombo.length; winRow++){
            for(var winColumn = 0; winColumn < 3 ; winColumn++){
                if(checkPlayer[checkIndex] === winCombo[winRow][winColumn]){
                    if(isPlayerX){// who's turn is it?
                        xForTheWin[winRow]++;
                        if(xForTheWin[winRow] === 3){            
                            displayWinner(isPlayerX);
                            setTimeout(clearBoard, 2000);
                            break checkWin;
                        }
                        xPlayersTurn = false;
                    }
                    else if(!isPlayerX){
                        oForTheWin[winRow]++;
                        if(oForTheWin[winRow] === 3){
                            displayWinner(isPlayerX);
                            setTimeout(clearBoard, 2000);
                            break checkWin;
                        }
                        xPlayersTurn = true;
                    }
            }
        }//end for(winRow)
    }//end for(winColumn)
    if((xSquares.length + oSquares.length) === 9){
        displayWinner();
        setTimeout(clearBoard, 2000);
    }
}}/* END checkWin*/

function displayWinner(whoWon){
    endGameMessage.className += " " + 'endGame';
    if(whoWon != null){
        if(whoWon){
            endGameMessage.innerHTML = 'X WON!';
        }
        else if(!whoWon){
            endGameMessage.innerHTML = 'O WON!';
        }
    }
    else if(whoWon == null){
        endGameMessage.innerHTML = 'Tie';
    }
}

function clearBoard(){
    
    xForTheWin = [0,0,0,0,0,0,0,0];
    oForTheWin = [0,0,0,0,0,0,0,0];
    xSquares = [];
    oSquares = [];
    xPlayersTurn = true;
    
    endGameMessage.innerHTML = '';
    endGameMessage.className -= " " + 'endGame';
    
    
    for(var squareNumber = 0; squareNumber < gameBoard.length; squareNumber++){
        gameBoard[squareNumber].parentNode.className = '';
        gameBoard[squareNumber].parentNode.className += 'flip-squ';
        gameBoard[squareNumber].innerHTML = '';
    }
    
}
//function artyfartyIntelligence(){
//    while(isUsedNum){
//        
//        
//        randomNumber = Math.floor(Math.random() * (9 - 1 +1)) + 1;      //Random square
//        
//        if(xSquares.indexOf(randomNumber) != randomNumber ||  oSquares.indexOf(randomNumber) != randomNumber){      //If square number is not occupied
//            isUsedNum = false; 
//            
//        }
//        
//    }
//    
//    
//    return randomNumber;
//    
//}

})();