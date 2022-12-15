import React, { DragEvent } from 'react';
import { Pieces, PieceCoordinates } from '../../models/pieces';
import './square.component.css';
import Piece from '../piece/piece.component';
import { Colors } from '../../models/colors';
import store from '../../models/state/state';
import { BoardAction, BoardActionEnum } from '../../models/state/state-models';
import { utils } from '../../utilities/utils';
import { BlockData } from '../../models/blocks';
import { getLegalMovesForPiece } from '../../utilities/moves';

interface SquareProps {
  pieceType: Pieces,
  squareColor: Colors,
  isPieceOnSquare: boolean,
  pieceColor: Colors,
  pieceCoordinates: PieceCoordinates,
  isSquareHighlighted: boolean
};


export default function Square(props: SquareProps) {
  return (
    <div
      className={`chess-block ${props.squareColor === Colors.WHITE ? 'block-white' : 'block-black'} ${props.isPieceOnSquare && 'piece-available'} ${props.isSquareHighlighted && 'highlighted-square'}`}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragStart={(event: any) => handleDragStart(event, props.isPieceOnSquare)}
      data-row-id={props.pieceCoordinates.rowIndex}
      data-column-id={props.pieceCoordinates.columnIndex}
    >
      {/* <span style={{color: '#555'}}>{utils.getBlockNumberFromCoordinates(props.pieceCoordinates)}</span> */}
      {props.isPieceOnSquare && <Piece pieceCoordinates={props.pieceCoordinates} pieceType={props.pieceType} pieceColor={props.pieceColor}></Piece>}
    </div>
  )
}

function handleDragStart(event: any, isPieceOnSquare: any){
  if(!isPieceOnSquare) {
    event.preventDefault();
    return false;
  }
}

function handleDragOver(event: any) {
  if (event.preventDefault) {
    event.preventDefault();
  }
  return false;
}

function handleDragEnter(event: any){
  event.preventDefault();
  return false;
}

function handleDragLeave(event: any) {
  event.preventDefault();
}

function handleDrop(event: any) {
  const startRowIndex: number = +event.dataTransfer.getData('rowIndex');
  const startColumnIndex: number = +event.dataTransfer.getData('columnIndex');
  const startPieceCoordinates: PieceCoordinates = {rowIndex: startRowIndex, columnIndex: startColumnIndex};
  const endRowIndex: number = +event.target.getAttribute('data-row-id');
  const endColumnIndex: number = +event.target.getAttribute('data-column-id');
  const endPieceCoordinates: PieceCoordinates = {rowIndex: endRowIndex, columnIndex: endColumnIndex};
  updateBoardState(startPieceCoordinates, endPieceCoordinates);
  event.stopPropagation()
  return false;
}

function updateBoardState(startPieceCoordinates: PieceCoordinates, endPieceCoordinates: PieceCoordinates){
  if(!utils.isTargetCoordinateValid(endPieceCoordinates)) {
    return;
  };
  const action: BoardAction = {
    type: BoardActionEnum.UPDATE,
    payload: {
      pieceConfig: {
        startCoordinates: startPieceCoordinates,
        endCoordinates: endPieceCoordinates,
      }
    }
  };
  store.dispatch(action);
  
  // reset the highlighted blocks after player has played a valid move
  resetHighlightedBlocks();
}

function resetHighlightedBlocks() {
  const legalMoves: number[] = getLegalMovesForPiece({ ...new BlockData(), pieceCoordinates: {rowIndex: 0, columnIndex: 0}});
  const action: BoardAction = {
    type: BoardActionEnum.UPDATE_HIGHLIGHTED_BLOCKS,
    payload: {
      blockNumbers: legalMoves || []
    }
  };
  store.dispatch(action);
}