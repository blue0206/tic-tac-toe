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
        gameboard[position] = input;
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

    return { resetBoard, updateBoard, checkSpaceVacancy, validateMove, checkMatch };
})();

const Player = function(name, choice) {
    let score = 0;
    
    const incrementScore = () => score++;

    const getScore = () => score;

    const resetScore = () => score = 0;

    const playerInput = () => {
        let position = parseInt(prompt("Enter position:"));
        if (Gameboard.validateMove(position))
        {
            return position;
        }
        else
        {
            playerInput();
        }
    };

    const playerMove = () => {
        Gameboard.updateBoard(choice, playerInput());
    };

    return { name, choice, incrementScore, getScore, resetScore, playerMove };
};

const ScreenController = (function() {

    let playerXName = "Player X";
    let playerOName = "Player O";

    const setPlayerXName = (xName) => playerXName = xName;

    const setPlayerOName = (oName) => playerOName = oName;

    const getPlayerXName = () => playerXName;

    const getPlayerOName = () => playerOName;

    const reset = () => {
        
    };

    const updateScore = () => {
        
    };
    
    const updateScreenBoard = () => {
        
    };

    return { setPlayerXName, setPlayerOName, getPlayerXName, getPlayerOName, reset };

})();

const GameController = (function() {
    const playerX = Player(ScreenController.getPlayerXName(), "X");
    const playerO = Player(ScreenController.getPlayerOName(), "O");
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
                break;
            }
        }
        return result;
    };

    return { playGame };
})();




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