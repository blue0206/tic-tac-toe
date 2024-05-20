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
    const updateBoard = (input, slot) => {
        gameboard[slot] = input;
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

    const validateMove = (slot) => {
        return gameboard[slot] == "empty" ? true : false;
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

    return { resetBoard, updateBoard, checkSpaceVacancy, validateMove, checkMatch };
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

    return { 
        getName,
        setName,
        getChoice,
        setChoice,
        incrementScore, 
        getScore, 
        resetScore
    };
};

const ScreenController = (function() {

    let playerXName = document.querySelector('.players h2:first-child');
    let playerOName = document.querySelector('.players h2:last-child');
    const playerXScore = document.querySelector(".score h2:first-child");
    const playerOScore = document.querySelector(".score h2:last-child");

    const boardSlots = document.querySelectorAll(".board-row button");
    
    const board = document.querySelector(".board");
    let playerXTurn = true;
    board.addEventListener("click", (evnt) => {
        let slot = evnt.target.id.split("")[1];
        switch(slot)
        {
            case undefined:
                break;
            default:
                if (playerXTurn)
                {
                    GameController.playerXMove(slot);
                }
                else
                {
                    GameController.playerOMove(slot);
                }
                console.log(playerXTurn);
        }
    });

    const switchMove = () => {
        playerXTurn = playerXTurn == true ? false : true;
    };

    const setPlayerXName = (xName) => {
        playerXName.textContent = xName;
    }
        
    const setPlayerOName = (oName) => {
        playerOName.textContent = oName
    };

    const resetGameBoard = () => {
        for (let i=0; i<boardSlots.length; i++)
        {
            boardSlots[i].textContent = "";
        }
    };

    const resetScoreBoard = () => {
        playerXScore.textContent = 0;
        playerOScore.textContent = 0;
    };

    const updateXScore = (score) => {
        playerXScore.textContent = score;
    };
    
    const updateOScore = (score) => {   
        playerOScore.textContent = score;
    };
    
    const updateGameBoard = (input, slot) => {
        boardSlots[slot].textContent = input;
    };

    const displayResult = (result) => {
        const display = document.querySelector('.commentary');
        const resultDiv = document.querySelector('.result');
        display.style.visibility = 'visible';
        resultDiv.textContent = result;

        display.addEventListener('click', () => {
            display.style.visibility = 'hidden';
            resultDiv.textContent = "";
            GameController.resetGameBoard();
        });
    };

    return { 
        switchMove,
        setPlayerXName, 
        setPlayerOName, 
        resetGameBoard,
        resetScoreBoard,
        updateXScore,
        updateOScore,
        updateGameBoard,
        displayResult
    };

})();

const GameController = (function() {
    const playerX = Player("Player X", "X");
    const playerO = Player("Player O", "O");

    let result = "";

    const setPlayerXName = (name) => {
        playerX.setName(name);
        ScreenController.setPlayerXName(name);
    };

    const setPlayerOName = (name) => {
        playerO.setName(name);
        ScreenController.setPlayerOName(name);
    };

    const playerXMove = (slot) => {
        if (Gameboard.validateMove(slot))
        {
            Gameboard.updateBoard(playerX.getChoice(), slot);
            ScreenController.updateGameBoard(playerX.getChoice(), slot);
            ScreenController.switchMove();
        }
        postMoveChecksX();
    };

    const playerOMove = (slot) => {
        if (Gameboard.validateMove(slot))
        {
            Gameboard.updateBoard(playerO.getChoice(), slot);
            ScreenController.updateGameBoard(playerO.getChoice(), slot);
            ScreenController.switchMove();
        }
        postMoveChecksO();
    };

    const postMoveChecksX = () => {
        if (Gameboard.checkMatch())
        {
            result = `${playerX.getName()} WINS!`;
            playerX.incrementScore();
            ScreenController.updateXScore(playerX.getScore());
            ScreenController.displayResult(result);
        }
        else if (!Gameboard.checkSpaceVacancy())
        {
            ScreenController.displayResult(result = "DRAW");
        }
    };

    const postMoveChecksO = () => {
        if (Gameboard.checkMatch())
        {
            result = `${playerO.getName()} WINS!`;
            playerO.incrementScore();
            ScreenController.updateOScore(playerO.getScore());
            ScreenController.displayResult(result);
        }
        else if (!Gameboard.checkSpaceVacancy())
        {
            ScreenController.displayResult(result = "DRAW");
        }
    };

    const resetGameBoard = () => {
        Gameboard.resetBoard();
        ScreenController.resetGameBoard();
    };

    const resetScoreBoard = () => {
        playerX.resetScore();
        playerO.resetScore();
        ScreenController.resetScoreBoard();
    };

    const reset = () => {
        resetGameBoard();
        resetScoreBoard();
    };

    return {
        setPlayerXName,
        setPlayerOName,
        playerXMove,
        playerOMove,
        resetGameBoard,
        reset
    };
})();




//----------------DOM MANIPULATION----------------

// Sidebar Toggling
const sidebarToggleBtn = document.querySelector('.sidebar-toggle');
const sidebarToggleIcon = document.querySelector('img.toggle');
const sidebar = document.querySelector('aside');
sidebarToggleBtn.addEventListener('click', () => {
    if (sidebar.style.getPropertyValue('position') == 'absolute' && 
        sidebar.style.getPropertyValue('visibility') == 'hidden')
    {
        sidebar.style.removeProperty('position');
        sidebar.style.removeProperty('visibility');
        sidebarToggleIcon.src = "./files/icons/close.svg";
        sidebarToggleIcon.alt = "Close Sidebar";
    }
    else
    {
        sidebar.style.position = 'absolute';
        sidebar.style.visibility = 'hidden';
        sidebarToggleIcon.src = "./files/icons/left-panel-open.svg";
        sidebarToggleIcon.alt = "Open Sidebar";
    }
});


// Attach event listener to 'Start Game' form button.
const submitBtn = document.querySelector('button[type="reset"]');
submitBtn.addEventListener('click', () => {
    let nameX = document.querySelector('#player-x').value;
    let nameO = document.querySelector('#player-o').value;
    nameX = nameX == "" ? "Player X" : nameX;
    nameO = nameO == "" ? "Player O" : nameO;
    GameController.setPlayerXName(nameX);
    GameController.setPlayerOName(nameO);
    GameController.reset();

    sidebarToggleBtn.dispatchEvent(new MouseEvent('click'));
});


// Attach event listener to the game RESET button.
const resetBtn = document.querySelector('.configure button');
resetBtn.addEventListener('click', () => {
    GameController.reset();
});