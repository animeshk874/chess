export class BlockData{
  constructor(
    pieceType = 0,
    pieceColor = null,
    blockColor = null
  ){
    this.pieceType = pieceType;
    this.pieceColor = pieceColor;
    this.blockColor = blockColor;
  }
}