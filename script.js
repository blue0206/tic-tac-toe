//----------------GAME ALGORITHM----------------

const Gameboard = (function() {
    const gameboard = Array(9).fill("empty");
    const boardSize = 9;
    
    const resetBoard = () => {
        for (let i=0; i < boardSize; i++)
        {
            gameboard[i] = "empty";
        }
    };

    //Fill board slot with player input
    const updateBoard = (input, position) => {
        if (validateMove(position))
        {
            gameboard[position] = input;
        }
        console.log(gameboard);
    };

    const checkSpaceVacancy = () => {
        for (let i=0; i<boardSize; i++)
        {
            if (gameboard[i] == "empty")
            {
                return true;
            }
        }
        return false;
    };

    const validateMove = (position) => {
        return gameboard[position] == "empty" ? true : false;
    };

    const checkMatch = () => {
        //Board Outline:
        //
        //  0   1   2
        //  3   4   5
        //  6   7   8

        if (((gameboard[0] != "empty") && (gameboard[0] == gameboard[1]) && (gameboard[0] == gameboard[2])) ||  //Match ROW 0 1 2
            ((gameboard[3] != "empty") && (gameboard[3] == gameboard[4]) && (gameboard[3] == gameboard[5])) ||  //Match ROW 3 4 5
            ((gameboard[6] != "empty") && (gameboard[6] == gameboard[7]) && (gameboard[6] == gameboard[8])) ||  //Match ROW 6 7 8
            ((gameboard[0] != "empty") && (gameboard[0] == gameboard[3]) && (gameboard[0] == gameboard[6])) ||  //Match COL 0 3 6
            ((gameboard[1] != "empty") && (gameboard[1] == gameboard[4]) && (gameboard[1] == gameboard[7])) ||  //Match COL 1 4 7
            ((gameboard[2] != "empty") && (gameboard[2] == gameboard[5]) && (gameboard[2] == gameboard[8])) ||  //Match COL 2 5 8
            ((gameboard[0] != "empty") && (gameboard[0] == gameboard[4]) && (gameboard[0] == gameboard[8])) ||  //Match DIG 0 4 8
            ((gameboard[2] != "empty") && (gameboard[2] == gameboard[4]) && (gameboard[2] == gameboard[6])))    //Match DIG 2 4 6
        {
            return true;
        }

        return false;
    };

    return { resetBoard, updateBoard, checkSpaceVacancy, checkMatch };
})();

const Player = function(name, choice) {
    let score = 0;

    const getName = () => name;

    const setName = (newName) => name = newName;

    const getChoice = () => choice;

    const setChoice = (newChoice=choice) => choice = newChoice;
    
    const incrementScore = () => score++;

    const getScore = () => score;

    const resetScore = () => score = 0;

    const playerMove = () => {
        Gameboard.updateBoard(choice, ScreenController.playerInput);
    };

    return { 
        getName,
        setName,
        getChoice,
        setChoice,
        incrementScore, 
        getScore, 
        resetScore, 
        playerMove 
    };
};

const ScreenController = (function() {

    let playerXName = document.querySelector('.players h2:first-child');
    let playerOName = document.querySelector('.players h2:last-child');
    const playerXScore = document.querySelector(".score h2:first-child");
    const playerOScore = document.querySelector(".score h2:last-child");
    const playerX = Player("Blue", "X");
    const playerO = Player("Red", "O");

    const board = document.querySelector(".board");
    let boardSlot = "";
    board.addEventListener("click", (evnt) => {
      boardSlot = evnt.target.id.split("")[1];
    });

    const setPlayerXName = (xName) => {
        playerXName.textContent = xName;
        playerX.setName(xName);
    }
        
    const setPlayerOName = (oName) => {
        playerOName.textContent = oName
        playerO.setName(oName);
    };

    const getPlayerX = () => playerX;

    const getPlayerO = () => playerO;
    
    const playerInput = () => {
        return boardSlot;
    };

    const resetGameBoard = () => {
        Gameboard.resetBoard();
        const boardSlots = document.querySelectorAll('.board-row button');
        for (let i=0; i<boardSlots.length; i++)
        {
            boardSlots[i].textContent = "";
        }
    };

    const resetScoreBoard = () => {
        playerX.resetScore();
        playerO.resetScore();
        playerXScore.textContent = 0;
        playerOScore.textContent = 0;
    };

    const updateXScore = (score) => {
        playerXScore.textContent = score;
    };
    
    const updateOScore = (score) => {   
        playerOScore.textContent = score;
    };
    
    const updateScreenBoard = () => {
        
    };

    return { 
        setPlayerXName, 
        setPlayerOName, 
        getPlayerX, 
        getPlayerO,
        playerInput, 
        resetGameBoard,
        resetScoreBoard,
        updateXScore,
        updateOScore 
    };

})();

const GameController = (function(playerX, playerO) {
    let result = "DRAW";

    const playGame = () => {
        while (Gameboard.checkSpaceVacancy())
        {
            //Player X's turn
            playerX.playerMove();
            if (Gameboard.checkMatch())
            {
                console.log("The winner is X!");
                result = `${playerX.name} WINS!`;
                playerX.incrementScore();
                ScreenController.updateXScore(playerX.getScore());
                break;
            }
            if (!Gameboard.checkSpaceVacancy())
            {
                break;
            }

            //Player O's turn
            playerO.playerMove();
            if (Gameboard.checkMatch())
            {
                console.log("The winner is O!");
                result = `${playerO.name} WINS!`;
                playerO.incrementScore();
                ScreenController.updateOScore(playerO.getScore());
                break;
            }
        }
        return result;
    };

    return { playGame };
})(ScreenController.getPlayerX(), ScreenController.getPlayerO());




//----------------DOM MANIPULATION----------------

// Sidebar Toggling
const sidebarToggleBtn = document.querySelector('.sidebar-toggle');
const sidebar = document.querySelector('aside');
sidebarToggleBtn.addEventListener('click', () => {
    if (sidebar.style.getPropertyValue('position') == 'absolute' && 
        sidebar.style.getPropertyValue('visibility') == 'hidden')
    {
        sidebar.style.removeProperty('position');
        sidebar.style.removeProperty('visibility');
        sidebarToggleBtn.textContent = "X";
    }
    else
    {
        sidebar.style.position = 'absolute';
        sidebar.style.visibility = 'hidden';
        sidebarToggleBtn.textContent = "=";
    }
});


// Attach event listener to 'Start Game' form button.
const submitBtn = document.querySelector('button[type="reset"]');
submitBtn.addEventListener('click', () => {
    const nameX = document.querySelector('#player-x').value;
    const nameO = document.querySelector('#player-o').value;
    ScreenController.setPlayerXName(nameX);
    ScreenController.setPlayerOName(nameO);
    ScreenController.reset();

    sidebarToggleBtn.dispatchEvent(new MouseEvent('click'));
});


// Attach event listener to the game RESET button.
const resetBtn = document.querySelector('.configure button');
resetBtn.addEventListener('click', () => {
    ScreenController.resetGameBoard();
    ScreenController.resetScoreBoard();
});