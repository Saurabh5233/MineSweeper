import React from 'react';
import { Flag, Bomb } from 'lucide-react';
import { CellValue } from '../types';

interface GameBoardProps {
  board: CellValue[][];
  onCellClick: (x: number, y: number) => void;
  onCellRightClick: (x: number, y: number) => void;
}

const GameBoard: React.FC<GameBoardProps> = ({ board, onCellClick, onCellRightClick }) => {
  const handleContextMenu = (e: React.MouseEvent, x: number, y: number) => {
    e.preventDefault();
    onCellRightClick(x, y);
  };

  const getCellContent = (value: CellValue) => {
    if (value === null) return '';
    if (value === 'F') return <Flag className="w-4 h-4" />;
    if (value === -1) return <Bomb className="w-4 h-4" />;
    return value > 0 ? value : '';
  };

  const getCellColor = (value: CellValue) => {
    if (value === null || value === 'F') return 'bg-gray-200';
    if (value === -1) return 'bg-red-200';
    if (value === 0) return 'bg-gray-100';
    return 'bg-gray-100';
  };

  const getNumberColor = (value: number) => {
    const colors = [
      '',
      'text-blue-600',
      'text-green-600',
      'text-red-600',
      'text-purple-600',
      'text-yellow-600',
      'text-pink-600',
      'text-gray-600',
      'text-gray-800'
    ];
    return colors[value] || '';
  };

  return (
    <div className="grid gap-1" style={{ 
      gridTemplateColumns: `repeat(${board[0].length}, minmax(0, 1fr))` 
    }}>
      {board.map((row, y) => (
        row.map((cell, x) => (
          <button
            key={`${x}-${y}`}
            className={`
              w-8 h-8 flex items-center justify-center
              border border-gray-300 rounded
              ${getCellColor(cell)}
              ${typeof cell === 'number' && cell > 0 ? getNumberColor(cell) : ''}
              hover:bg-gray-300 transition-colors
              font-bold text-sm
            `}
            onClick={() => onCellClick(x, y)}
            onContextMenu={(e) => handleContextMenu(e, x, y)}
          >
            {getCellContent(cell)}
          </button>
        ))
      ))}
    </div>
  );
}

export default GameBoard;