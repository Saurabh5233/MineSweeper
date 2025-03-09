from typing import List, Tuple, Set
import random

class Minesweeper:
    def __init__(self, width: int, height: int, mines: int):
        self.width = width
        self.height = height
        self.mines = mines
        self.board = [[0 for _ in range(width)] for _ in range(height)]
        self.revealed = [[False for _ in range(width)] for _ in range(height)]
        self.flagged = [[False for _ in range(width)] for _ in range(height)]
        self.mine_positions: Set[Tuple[int, int]] = set()
        self.game_over = False
        self.won = False
        self.initialize_board()

    def initialize_board(self) -> None:
        # Place mines randomly
        mine_count = 0
        while mine_count < self.mines:
            x = random.randint(0, self.width - 1)
            y = random.randint(0, self.height - 1)
            if (x, y) not in self.mine_positions:
                self.mine_positions.add((x, y))
                self.board[y][x] = -1  # -1 represents a mine
                mine_count += 1

        # Calculate numbers for adjacent cells
        for y in range(self.height):
            for x in range(self.width):
                if self.board[y][x] != -1:
                    mine_count = 0
                    for dy in [-1, 0, 1]:
                        for dx in [-1, 0, 1]:
                            if 0 <= y + dy < self.height and 0 <= x + dx < self.width:
                                if self.board[y + dy][x + dx] == -1:
                                    mine_count += 1
                    self.board[y][x] = mine_count

    def reveal(self, x: int, y: int) -> dict:
        if self.game_over or self.flagged[y][x]:
            return self.get_game_state()

        if not self.revealed[y][x]:
            self.revealed[y][x] = True

            if self.board[y][x] == -1:
                self.game_over = True
                return self.get_game_state()

            if self.board[y][x] == 0:
                self.reveal_adjacent(x, y)

        self.check_win()
        return self.get_game_state()

    def reveal_adjacent(self, x: int, y: int) -> None:
        for dy in [-1, 0, 1]:
            for dx in [-1, 0, 1]:
                new_x, new_y = x + dx, y + dy
                if (0 <= new_x < self.width and 
                    0 <= new_y < self.height and 
                    not self.revealed[new_y][new_x] and 
                    not self.flagged[new_y][new_x]):
                    self.revealed[new_y][new_x] = True
                    if self.board[new_y][new_x] == 0:
                        self.reveal_adjacent(new_x, new_y)

    def toggle_flag(self, x: int, y: int) -> dict:
        if not self.revealed[y][x] and not self.game_over:
            self.flagged[y][x] = not self.flagged[y][x]
        return self.get_game_state()

    def check_win(self) -> None:
        for y in range(self.height):
            for x in range(self.width):
                if self.board[y][x] != -1 and not self.revealed[y][x]:
                    return
        self.won = True
        self.game_over = True

    def get_game_state(self) -> dict:
        visible_board = []
        for y in range(self.height):
            row = []
            for x in range(self.width):
                if self.revealed[y][x]:
                    row.append(self.board[y][x])
                elif self.flagged[y][x]:
                    row.append('F')
                else:
                    row.append(None)
            visible_board.append(row)

        return {
            'board': visible_board,
            'gameOver': self.game_over,
            'won': self.won,
            'mines': self.mines,
            'flagged': sum(row.count(True) for row in self.flagged)
        }