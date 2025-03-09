import React from 'react';

interface ControlsProps {
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  onNewGame: () => void;
  remainingMines: number;
  timer: number;
}

const Controls: React.FC<ControlsProps> = ({
  difficulty,
  setDifficulty,
  onNewGame,
  remainingMines,
  timer
}) => {
  return (
    <div className="mb-6 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="px-3 py-2 border rounded bg-white"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
          <button
            onClick={onNewGame}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            New Game
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-center">
        <div className="bg-black text-red-500 px-4 py-2 rounded font-mono text-xl">
          {String(remainingMines).padStart(3, '0')}
        </div>
        <div className="bg-black text-red-500 px-4 py-2 rounded font-mono text-xl">
          {String(timer).padStart(3, '0')}
        </div>
      </div>
    </div>
  );
}

export default Controls;