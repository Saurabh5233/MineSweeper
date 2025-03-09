export type CellValue = number | 'F' | null;

export interface GameState {
  board: CellValue[][];
  gameOver: boolean;
  won: boolean;
  mines: number;
  flagged: number;
}