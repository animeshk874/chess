import { BlockData } from "../models/blocks";
import { BoardData } from "../models/board";
import { Colors } from "../models/colors";
import { PieceCoordinates, PieceMoves, PieceProps, Pieces } from "../models/pieces";
import store from "../models/state/state";
import { BoardState } from "../models/state/state-models";
import { getLegalMovesForPiece } from './moves';

export const utils = {
  getPieceName(pieceProps: PieceProps){
    switch(pieceProps.pieceType){
      case Pieces.PAWN:
        return 'pawn';
      case Pieces.QUEEN:
        return 'queen';
      case Pieces.KING:
        return 'king';
      case Pieces.ROOK:
        return 'rook';
      case Pieces.BISHOP:
        return 'bishop';
      case Pieces.KNIGHT:
        return 'knight';
    }
    return 'empty';
  },
  
  getImageTagFromPieceTypeAndColor(pieceProps: PieceProps){
    return `${process.env.PUBLIC_URL}/chess-pieces/${this.getPieceName(pieceProps)}_${pieceProps.pieceColor === Colors.WHITE ? 'white' : 'black'}.svg`;
  },

  getBlockNumberFromCoordinates(pieceCoordinates: PieceCoordinates) {
    return pieceCoordinates.rowIndex * 8 + pieceCoordinates.columnIndex;
  },

  getCoordinatesFromBlockNumber(blockNumber: number): PieceCoordinates {
    return {
      rowIndex: Math.floor(blockNumber/8),
      columnIndex: blockNumber % 8,
    };
  },

  getBoardState(): BoardState{
    return store.getState();
  },

  getBlockDataByCoordinates(blockCoordinates: PieceCoordinates): BlockData {
    let boardData: BoardData = this.getBoardState().boardData;
    return boardData[blockCoordinates.rowIndex][blockCoordinates.columnIndex];
  },

  isBlockNumberValid(blockNumber: number): boolean {
    return blockNumber >= 0 && blockNumber <= 63;
  },
  
  isTargetCoordinateValid(targetCoordinates: PieceCoordinates){
    let highlightedBlockNumbers: number[] = this.getBoardState().highlightedBlockNumbers;
    let targetBlockNumber = this.getBlockNumberFromCoordinates(targetCoordinates);
    return highlightedBlockNumbers.includes(targetBlockNumber);
  },

  // this function gives the coordinates for the king of given color
  getKingPositionForColor(color: Colors): PieceCoordinates {
    let boardData: BoardData = this.getBoardState().boardData;
    let opponentColor: Colors = color ? Colors.BLACK : Colors.WHITE;
    for(let i = 0; i < boardData?.length; i++) {
      for (let j = 0; j < 8; j++) {
        if((boardData[i][j]?.pieceType == Pieces.KING) && (boardData[i][j]?.pieceColor == opponentColor)) {
          return {rowIndex: i, columnIndex: j};
        }
      }
    }
  },

  // this function checks if the given piece is attacking the opponent king
  isOpponentKingUnderAttack(pieceProps: PieceProps): boolean {
    let opponentKingPosition: PieceCoordinates = this.getKingPositionForColor(pieceProps.pieceColor);
    let opponentKingPositionNumber: number = this.getBlockNumberFromCoordinates(opponentKingPosition);
    
    let possibleMovesForPiece: number[] = getLegalMovesForPiece(pieceProps, true);

    return possibleMovesForPiece.includes(opponentKingPositionNumber);
  },

  // this function returns all the pieces for a given color
  getActivePiecesForColor(color: Colors): PieceProps[] {
    let boardData: BoardData = this.getBoardState().boardData;
    const pieces: PieceProps[] = [];
    for(let i = 0; i < boardData?.length; i++) {
      for (let j = 0; j < 8; j++) {
        if((boardData[i][j]?.pieceType !== Pieces.NONE) && (boardData[i][j]?.pieceColor == color)) {
          pieces.push( {
            pieceType: boardData[i][j]?.pieceType,
            pieceColor: color,
            pieceCoordinates: {rowIndex: i, columnIndex: j}
          });
        }
      }
    }
    return pieces;
  }
};


(window as any).utils = utils