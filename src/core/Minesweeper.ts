import { Square } from './Square';

export { Minesweeper };

class Minesweeper {
  private board: Square[][];
  private bombsCount: number;
  private flagsCount: number = 0;
  private gameFinished: boolean = false;

  constructor(
    private width: number,
    private height: number,
    private bombsDensity: number,
  ) {
    this.bombsCount = Math.round(width * height * this.bombsDensity);
    this.board = this.createBoard(width, height);
    this.createBombs();
  }

  public toggleFlag(x: number, y: number) {
    if (this.isValidPoint(x, y)) {
      const square = this.board[x][y];
      this.board[x][y].toggleFlag();
      if (square.hasFlag()) {
        this.flagsCount++;
      } else {
        this.flagsCount--;
      }
    }
  }

  public getFlagsCount() {
    return this.flagsCount;
  }

  public getBombsCount() {
    return this.bombsCount;
  }

  public getSquare(x: number, y: number): Square {
    return this.board[x][y];
  }

  public openSquare(x: number, y: number): boolean {
    if (this.isValidPoint(x, y) && !this.gameFinished && !this.board[x][y].hasFlag()) {
      const square = this.board[x][y];
      const wasOpen = square.isOpen();
      this.gameFinished = square.open();
      if (square.isEmpty()) {
        this.openNeighborsOfEmpty(x, y);
      }
    }
    return this.gameFinished;
  }

  private createBoard(width: number, height: number): Square[][] {
    const board: Square[][] = [];

    for (let x = 0; x < width; x++) {
      board.push([]);
      for (let y = 0; y < height; y++) {
        board[x].push(new Square());
      }
    }
    return board;
  }

  private createBombs() {
    let countBombs = 0;
    while (countBombs < this.bombsCount) {
      const x = Math.round(Math.random() * (this.width - 1));
      const y = Math.round(Math.random() * (this.height - 1));

      if (!this.board[x][y].isBomb()) {
        countBombs++;
        this.board[x][y].setBomb(true);
        this.increaseNeighborBombCount(x, y);
      }
    }
  }

  private getNeighbors(x: number, y: number) {
    const neighbors = [];
    for (let xi = x - 1; xi <= x + 1; xi++) {
      for (let yi = y - 1; yi <= y + 1; yi++) {
        if (!this.isValidPoint(xi, yi) || (xi === x && yi === y)) {
          continue;
        }
        neighbors.push({
          square: this.board[xi][yi],
          coordinates: { x: xi, y: yi },
        });
      }
    }
    return neighbors;
  }

  private increaseNeighborBombCount(x: number, y: number) {
    this.getNeighbors(x, y).forEach(({ square }) => {
      square.setNeighborBombs(square.getNeighborBombs() + 1);
    });
  }


  private openNeighborsOfEmpty(x: number, y: number) {
    this.getNeighbors(x, y).forEach(({ square, coordinates }) => {
      if (square.isOpen() || square.hasFlag()) {
        return;
      }

      square.open();
      if (square.isEmpty()) {
        this.openNeighborsOfEmpty(coordinates.x, coordinates.y);
      }
    });
  }

  private isValidPoint(x: number, y: number) {
    return x >= 0 && x < this.width && y >= 0 && y < this.height;
  }
}
