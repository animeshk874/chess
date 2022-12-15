import { Colors } from "./colors";

export enum Pieces{
  NONE = 0,
  PAWN = 1,
  QUEEN = 2,
  KING = 3,
  ROOK = 4,
  BISHOP = 5,
  KNIGHT = 6
}

export enum FenMapping {
  p = 'PAWN',
  r = 'ROOK',
  n = 'KNIGHT',
  b = 'BISHOP',
  q = 'QUEEN',
  k = 'KING',
};

export interface PieceProps {
  pieceType: Pieces,
  pieceColor: Colors,
  pieceCoordinates: PieceCoordinates
};

export interface PieceCoordinates {
  rowIndex: number;
  columnIndex: number;
}

export const PieceMoves: {[key: string]: Array<number>} = {
  [Pieces.ROOK]: [-8, -1, 1, 8],
  [Pieces.BISHOP]: [-9, -7, 7, 9],
  [Pieces.QUEEN]: []
}
PieceMoves[Pieces.QUEEN] = [...PieceMoves[Pieces.ROOK], ...PieceMoves[Pieces.BISHOP]];