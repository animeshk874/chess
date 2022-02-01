import { BlockData } from './blocks';
import { Pieces } from './pieces';
import { Colors } from './colors';

export class ChessBoardConfig{
  boardMatrix = [];
  constructor(skipPiecesConfig){
    this.boardMatrix = Array(8).fill(0).map(() => Array(8).fill(0));
    this.boardMatrix.forEach((boardRow, i) => this.boardMatrix[i] = boardRow.map(() => { return new BlockData();}));
    !skipPiecesConfig && this.assignPieces();
    this.assignBlockColors();
  }

  assignPieces(){
    this.boardMatrix[0].forEach((square, cellIndex) => {
      assignPiecesForColor.call(this, Colors.BLACK, 0, cellIndex);
    });
    this.boardMatrix[7].forEach((square, cellIndex) => {
      assignPiecesForColor.call(this, Colors.WHITE, 7, cellIndex);
    });
    this.boardMatrix[1] = this.boardMatrix[1].map(() => { return new BlockData(Pieces.PAWN, Colors.BLACK, null); });
    this.boardMatrix[6] = this.boardMatrix[6].map(() => { return new BlockData(Pieces.PAWN, Colors.WHITE, null); });

    function assignPiecesForColor(colorType, rowIndex, cellIndex){
      if(cellIndex == 0 || cellIndex == 7) this.boardMatrix[rowIndex][cellIndex] = new BlockData(Pieces.ROOK, colorType, null);
      else if(cellIndex == 1 || cellIndex == 6) this.boardMatrix[rowIndex][cellIndex] = new BlockData(Pieces.KNIGHT, colorType, null);
      else if(cellIndex == 2 || cellIndex == 5) this.boardMatrix[rowIndex][cellIndex] = new BlockData(Pieces.BISHOP, colorType, null);
      else if(cellIndex == 3) this.boardMatrix[rowIndex][cellIndex] = new BlockData(Pieces.QUEEN, colorType, null);
      else this.boardMatrix[rowIndex][cellIndex] = new BlockData(Pieces.KING, colorType, null);
    }
  }

  assignBlockColors(){
    this.boardMatrix.forEach((boardRow, row) => {
      boardRow.forEach((boardSquare, col) => {
        boardSquare.blockColor = (row + col) % 2 ? Colors.BLACK : Colors.WHITE;
      });
    });
  }

}