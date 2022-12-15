import { BlockData } from "../models/blocks";
import { Colors } from "../models/colors";
import { PieceProps, Pieces, PieceMoves, PieceCoordinates } from "../models/pieces";
import { BoardState } from "../models/state/state-models";
import { utils } from "./utils";


// Only this function should be exported from this module!!
export function getLegalMovesForPiece(pieceProps: PieceProps, skipMovesFilter: boolean = false) {
  let possibleMovesBlockNumbers: number[] = [];
  switch(pieceProps.pieceType) {
    case Pieces.ROOK:
      possibleMovesBlockNumbers = generateAllPossibleMovesForRook(pieceProps);
      break;
    case Pieces.BISHOP:
      possibleMovesBlockNumbers = generateAllPossibleMovesForBishop(pieceProps);
      break;
    case Pieces.QUEEN:
      const possibleMovesForQueen =  [...generateAllPossibleMovesForRook(pieceProps), ...generateAllPossibleMovesForBishop(pieceProps)];
      possibleMovesBlockNumbers = possibleMovesForQueen;
      break;
    default:
      possibleMovesBlockNumbers = [];
  }

  let legalMovesBlockNumbers: number[] = possibleMovesBlockNumbers;
  let oppositionColor: Colors = pieceProps.pieceColor == Colors.BLACK ? Colors.WHITE : Colors.BLACK;
  skipMovesFilter && (legalMovesBlockNumbers = filterOutPossibleMoves(oppositionColor));
  return legalMovesBlockNumbers;
}

// ---- Function to generate moves for Rook
function generateAllPossibleMovesForRook(piece: PieceProps){
  const { pieceColor, pieceCoordinates, pieceType } = piece;
  const possibleBlockNumbersForRook: Array<number> = [];
  const boardState: BoardState = utils.getBoardState();

  PieceMoves[Pieces.ROOK].forEach((direction: number) => recursivelyGetMovesForRook(pieceCoordinates, direction));

  function recursivelyGetMovesForRook(startingSquareCoordinate: PieceCoordinates, direction: number){
    const sourceBlockNumber: number = utils.getBlockNumberFromCoordinates(startingSquareCoordinate);
    const targetBlockNumber: number = sourceBlockNumber + direction;
    if(!utils.isBlockNumberValid(targetBlockNumber)){
      return;
    }
    const targetSquareCoordinates: PieceCoordinates = utils.getCoordinatesFromBlockNumber(targetBlockNumber);
    
    if (
      // If the next step is beyond the boundaries of the board
      Math.abs(targetSquareCoordinates.rowIndex - startingSquareCoordinate.rowIndex) > 1 ||
      Math.abs(targetSquareCoordinates.columnIndex - startingSquareCoordinate.columnIndex) > 1) {
        return;
      }

    const blockDataOnTargetSquare: BlockData = utils.getBlockDataByCoordinates(targetSquareCoordinates);
    if(blockDataOnTargetSquare.pieceType === Pieces.NONE || !blockDataOnTargetSquare.pieceType){
      possibleBlockNumbersForRook.push(targetBlockNumber);
      recursivelyGetMovesForRook(targetSquareCoordinates, direction);
      return;
    }
    if(blockDataOnTargetSquare.pieceColor == piece.pieceColor){
      return;
    }
    if(blockDataOnTargetSquare.pieceColor !== piece.pieceColor){
      possibleBlockNumbersForRook.push(targetBlockNumber);
      return;
    }
  }
  return possibleBlockNumbersForRook;
}

// ---- Function to generate moves for Bishop
function generateAllPossibleMovesForBishop(piece: PieceProps){
  const { pieceColor, pieceCoordinates, pieceType } = piece;
  const possibleBlockNumbersForBishop: Array<number> = [];
  const boardState: BoardState = utils.getBoardState();

  PieceMoves[Pieces.BISHOP].forEach((direction: number) => recursivelyGetMovesForBishop(pieceCoordinates, direction));

  function recursivelyGetMovesForBishop(startingSquareCoordinate: PieceCoordinates, direction: number){
    const sourceBlockNumber: number = utils.getBlockNumberFromCoordinates(startingSquareCoordinate);
    const targetBlockNumber: number = sourceBlockNumber + direction;
    if(!utils.isBlockNumberValid(targetBlockNumber)){
      return;
    }
    const targetSquareCoordinates: PieceCoordinates = utils.getCoordinatesFromBlockNumber(targetBlockNumber);

    if (
      // If the next step is beyond the boundaries of the board
      Math.abs(targetSquareCoordinates.rowIndex - startingSquareCoordinate.rowIndex) > 1 ||
      Math.abs(targetSquareCoordinates.columnIndex - startingSquareCoordinate.columnIndex) > 1) {
        return;
    }

    const blockDataOnTargetSquare: BlockData = utils.getBlockDataByCoordinates(targetSquareCoordinates);
    if(blockDataOnTargetSquare.pieceType === Pieces.NONE || !blockDataOnTargetSquare.pieceType){
      possibleBlockNumbersForBishop.push(targetBlockNumber);
      recursivelyGetMovesForBishop(targetSquareCoordinates, direction);
      return;
    }
    if(blockDataOnTargetSquare.pieceColor == piece.pieceColor){
      return;
    }
    if(blockDataOnTargetSquare.pieceColor !== piece.pieceColor){
      possibleBlockNumbersForBishop.push(targetBlockNumber);
      return;
    }
  }
  return possibleBlockNumbersForBishop;
}


// function for filtering out possibleMoves for pieces if a particular move brings the king under attack
function filterOutPossibleMoves(oppositionColor: Colors){
  return [0]; // TODO: remove this after the function implementation is done
  const colorPieces: PieceProps[] = utils.getActivePiecesForColor(oppositionColor);
  colorPieces.forEach((pieceProps: PieceProps) => {
    
  });
}


