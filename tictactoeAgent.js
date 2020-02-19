/**
 * NAME: STEVE G. MWANGI
 * ASSIGNMENT 1.2: TIC_TAC_TOE
 * 
 * REFERRENCES:
 * 1. Coding Challenge 154 https://www.youtube.com/watch?v=trKjYdBASyQ
 * 2. https://mostafa-samir.github.io/Tic-Tac-Toe-AI/
 * 3. https://github.com/ElaMoscicka/Pet-projects/blob/master/.JavaScript%20Tic%20Tac%20Toe%20Project%20%20-%20Unbeatable%20AI%20with%20Minimax%20Algorithm/script.js
 */

var TREE_DEPTH = 0;
var PLAYER_ONE;
var PLAYER_TWO;
var MAXI_SCORE = -1000;
var MINI_SCORE = 1000;

var Agent = function () {
    this.playerOne;
    this.playerChar;
    this.isMaximizing;
    this.minimaxScore;
}

/**
 * Function to determine which player is X or O.
 * @param {*} board 
 */
function setPlayerOneAndTwo(board){
    if(TREE_DEPTH===1){
        if(board.X > board.O){
            PLAYER_ONE = 'X';
            PLAYER_TWO = 'O';
        } else {
            PLAYER_ONE = 'O';
            PLAYER_TWO = 'X';
        }
    } 
}

/**
 * Initiates Agent vals..
 */
Agent.prototype.setAgent = function(){
    if(TREE_DEPTH === 1){
        this.playerOne = true; // board.playerOne();
        this.playerChar = PLAYER_ONE;
        this.isMaximizing = true;
        this.minimaxScore = -1000;
        //console.log(this);
    } else if (TREE_DEPTH === 2){
        this.playerOne = false;
        this.playerChar = PLAYER_TWO;
        this.isMaximizing = false;
        this.minimaxScore = 1000;
        //console.log(this);
    }
}

/**
 * Function returns list of free cells.
 * @param {*} board 
 */
function getFreeCells(board){
    var freeCells = [];
    for (var i = 1; i < 10; i++) {
        if (board.cellFree(i)) freeCells.push(i);
    }
    // console.log(freeCells);
    return freeCells;
}

/**
 * Checks if Agent is Maximizing, otherwise Minimizing.
 */
Agent.prototype.isMaximizing = function(){
    return TREE_DEPTH % 2 === 1 ? true: false;
}

/**
 * To keep track of the free cell for the next move.
 * @param {*} board 
 * @param {*} isMaximizing 
 */
function checkFreeCells(board, isMaximizing){
    // displayGameboard("in checkFreeCells: ", board);
    // console.log("isMaxi: " + isMaximizing);
    var nextMove;
    var minimaxScore = isMaximizing ? MAXI_SCORE: MINI_SCORE;
    var freeCells = getFreeCells(board);
    for(var i = 0; i < freeCells.length; i++){
        var clonedBoard = board.clone();
        clonedBoard.move(freeCells[i]);
        // console.log("Clone_GB.X: " + clonedBoard.X);
        // console.log("Clone_GB.O: " + clonedBoard.O);
        var currentScore = minimax(clonedBoard, clonedBoard.playerOne);
        // console.log("CurrScore: " + currentScore);
        if(isMaximizing && (currentScore > minimaxScore)){
                minimaxScore = currentScore;
                nextMove = freeCells[i];
                //console.log("isMaxi Next Move: " + nextMove);
        } else if(!isMaximizing && (currentScore < minimaxScore)){
                minimaxScore = currentScore;
                nextMove = freeCells[i];
                //console.log("notIsMaxi Next Move: " + nextMove);
        }
    }
    return nextMove;
}

/**
 * Minimax returns the minimax score for the board given recursively
 * until the end.
 * @param {*} board 
 * @param {*} isMaxi 
 */
function minimax (board, isMaxi){
    var minimaxScore;
    var freeCells = getFreeCells(board);
    if(board.gameOver() === 0){ // Game Not Over
        if(isMaxi){
            minimaxScore = MAXI_SCORE;
            for(var i = 0; i < freeCells.length; i++){
                var clonedBoard = board.clone();
                clonedBoard.move(freeCells[i]);
                var currentScore = minimax(clonedBoard, clonedBoard.playerOne);
                if(currentScore > minimaxScore){
                    // displayGameboard("ClonedBoard in Minimax isMaxi: ", clonedBoard);
                    // console.log("Current Maxi Score: " + minimaxScore);
                    minimaxScore = currentScore;
                    // console.log("After Maxi Score: " + minimaxScore);
                }
            }
        } else {
            minimaxScore = MINI_SCORE;
            for(var i = 0; i < freeCells.length; i++){
                var clonedBoard = board.clone();
                clonedBoard.move(freeCells[i]);
                var currentScore = minimax(clonedBoard, clonedBoard.playerOne);
                if(currentScore < minimaxScore){
                    // console.log("Current Mini Score: " + minimaxScore);
                    // displayGameboard("ClonedBoard in Minimax NotisMaxi: ", clonedBoard);
                    minimaxScore = currentScore;
                    // console.log("After Mini Score: " + minimaxScore);
                }
            }
        }
    } else { // Terminating condition X_WIN: 1, O_WIN: 2, DRAW: 3
        var result = board.gameOver() > 1 ? board.gameOver() - 3 : 1;
        //console.log("Gameover int result: " + result);
        return result;
    }
    return minimaxScore;
}

/**
 * For debugg..
 * @param {*} section 
 * @param {*} board 
 */
function displayGameboard(section, board){
    console.log(section + " X: " + board.X);
    console.log(section + " O: " + board.O);
}

Agent.prototype.selectMove = function(board) {
    TREE_DEPTH ++;
    setPlayerOneAndTwo(board);
    this.setAgent();
    return checkFreeCells(board, this.isMaximizing);
}

// /**
//  * Default selectMove
//  */
// Agent.prototype.selectMove1 = function(board) {
//     var freeCells = [];
//     for (var i = 1; i < 10; i++) {
//         if (board.cellFree(i)) freeCells.push(i);
//     }

//     return freeCells[Math.floor(Math.random() * freeCells.length)];
// }
