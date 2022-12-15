import { Colors } from "./colors";
import { Pieces } from "./pieces";

export class BlockData{
  constructor(
    public pieceType: Pieces = Pieces.NONE,
    public pieceColor: Colors = null,
    public blockColor: Colors = null
  ){
    this.pieceType = pieceType;
    this.pieceColor = pieceColor;
    this.blockColor = blockColor;
  }

  clearPieceInfo(){
    this.pieceType = Pieces.NONE;
    this.pieceColor = null;
  }
}