// script.js

const Gameboard = (function() {
    const board = ["", "", "", "", "", "", "", "", ""];
  
    const getBoard = () => board;
  
    const makeMove = (index, marker) => {
      if (board[index] === "") {
        board[index] = marker;
        return true;
      }
      return false;
    };
  
    const resetBoard = () => {
      for (let i = 0; i < board.length; i++) {
        board[i] = "";
      }
    };
  
    return { getBoard, makeMove, resetBoard };
  })();
  
  const Player = (name, marker) => {
    return { name, marker };
  };
  
  const GameController = (function() {
    const player1 = Player("Player 1", "X");
    const player2 = Player("Player 2", "O");
    let currentPlayer = player1;
  
    const switchPlayer = () => {
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    };
  
    const getCurrentPlayer = () => currentPlayer;
  
    const makeMove = (index) => {
      if (Gameboard.makeMove(index, currentPlayer.marker)) {
        switchPlayer();
        return true;
      }
      return false;
    };
  
    const checkWinner = () => {
      const board = Gameboard.getBoard();
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
        }
      }
  
      return board.includes("") ? null : "tie";
    };
  
    const resetGame = () => {
      Gameboard.resetBoard();
      currentPlayer = player1;
    };
  
    return { getCurrentPlayer, makeMove, checkWinner, resetGame };
  })();
  
  const DisplayController = (function() {
    const gameboardDiv = document.getElementById("gameboard");
  
    const render = () => {
      const board = Gameboard.getBoard();
      gameboardDiv.innerHTML = "";
      board.forEach((cell, index) => {
        const cellDiv = document.createElement("div");
        cellDiv.textContent = cell;
        cellDiv.addEventListener("click", () => {
          if (GameController.makeMove(index)) {
            render();
            const winner = GameController.checkWinner();
            if (winner) {
              alert(winner === "tie" ? "It's a tie!" : `${winner} wins!`);
              GameController.resetGame();
              render();
            }
          }
        });
        gameboardDiv.appendChild(cellDiv);
      });
    };
  
    return { render };
  })();
  
  DisplayController.render();
  