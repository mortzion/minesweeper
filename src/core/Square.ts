export { Square };

class Square {
  private flagged: boolean;
  private opened: boolean;
  private neighborBombs: number;
  private hasBomb: boolean;

  constructor() {
    this.flagged = this.opened = this.hasBomb = false;
    this.neighborBombs = 0;
  }

  /**
   * Marks the square as opened and returns a boolean indicating if a bomb exploded
   *
   * @returns {boolean} boolean indicating if a bomb exploded.
   */
  public open(): boolean {
    if (this.hasFlag()) {
      return false;
    }
    this.opened = true;
    return this.hasBomb;
  }

  public toggleFlag() {
    this.flagged = !this.flagged;
  }

  public isEmpty() {
    return this.neighborBombs === 0 && !this.hasBomb;
  }

  public setNeighborBombs(neighborBombs: number) {
    this.neighborBombs = neighborBombs;
  }

  public getNeighborBombs(): number {
    return this.neighborBombs;
  }

  public hasFlag(): boolean {
    return this.flagged;
  }

  public isOpen(): boolean {
    return this.opened;
  }

  public isBomb(): boolean {
    return this.hasBomb;
  }

  public setBomb(hasBomb: boolean) {
    this.hasBomb = hasBomb;
  }
}


