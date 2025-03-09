import React, { useState, useEffect } from 'react';
import { Flag, Bomb } from 'lucide-react';
import GameBoard from './components/GameBoard';
import Controls from './components/Controls';
import { GameState, CellValue } from './types';

const INITIAL_GAME_STATE: GameState = {
  board: [],
  gameOver: false,
  won: false,
  mines: 0,
  flagged: 0
};

// Use environment variable for API base
const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

function App() {
  const [gameId, setGameId] = useState<number | null>(null);
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [difficulty, setDifficulty] = useState<string>('beginner');
  const [timer, setTimer] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let interval: number;
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startNewGame = async () => {
    try {
      setError(null);
      const response = await fetch(`${API_BASE}/new-game`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ difficulty })
      });

      if (!response.ok) {
        throw new Error('Server error occurred');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setGameId(data.gameId);
      setGameState(data.state);
      setTimer(0);
      setIsRunning(true);
    } catch (error) {
      setError('Failed to connect to game server. Please ensure the backend is running.');
      console.error('Failed to start new game:', error);
    }
  };

  const handleCellClick = async (x: number, y: number) => {
    if (!gameId || gameState.gameOver) return;

    try {
      setError(null);
      const response = await fetch(`${API_BASE}/reveal`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId, x, y })
      });

      if (!response.ok) {
        throw new Error('Server error occurred');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setGameState(data.state);
      if (data.state.gameOver) {
        setIsRunning(false);
      }
    } catch (error) {
      setError('Failed to reveal cell. Please try again.');
      console.error('Failed to reveal cell:', error);
    }
  };

  const handleCellRightClick = async (x: number, y: number) => {
    if (!gameId || gameState.gameOver) return;

    try {
      setError(null);
      const response = await fetch(`${API_BASE}/flag`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gameId, x, y })
      });

      if (!response.ok) {
        throw new Error('Server error occurred');
      }

      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }

      setGameState(data.state);
    } catch (error) {
      setError('Failed to toggle flag. Please try again.');
      console.error('Failed to toggle flag:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">Minesweeper</h1>
        
        {error && (
          <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <Controls
          difficulty={difficulty}
          setDifficulty={setDifficulty}
          onNewGame={startNewGame}
          remainingMines={gameState.mines - gameState.flagged}
          timer={timer}
        />

        {gameState.board.length > 0 && (
          <GameBoard
            board={gameState.board}
            onCellClick={handleCellClick}
            onCellRightClick={handleCellRightClick}
          />
        )}

        {gameState.gameOver && (
          <div className="mt-4 text-center">
            <p className="text-xl font-bold">
              {gameState.won ? (
                <span className="text-green-600">Congratulations! You won! 🎉</span>
              ) : (
                <span className="text-red-600">Game Over! 💥</span>
              )}
            </p>
            <button
              onClick={startNewGame}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
