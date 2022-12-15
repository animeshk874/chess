import React from 'react';
import { Colors } from '../../models/colors';
import { Pieces, PieceProps } from '../../models/pieces';
import store from '../../models/state/state';
import { BoardAction, BoardActionEnum } from '../../models/state/state-models';
import { getLegalMovesForPiece } from '../../utilities/moves';
import { utils } from '../../utilities/utils';
import './piece.component.css';


export default function Piece(props: PieceProps){
  return (
    <div 
      className={`piece piece-${utils.getPieceName(props)} piece-${props.pieceColor === Colors.WHITE ? 'white' : 'black'}`}
      draggable
      onDragStart={(event: any) => handleDragStart(event, props)}
      onDragEnd={handleDragEnd}
      data-row-id={props.pieceCoordinates.rowIndex}
      data-column-id={props.pieceCoordinates.columnIndex}
      onMouseDown={(event: any) => handleOnMouseDown(event, props)}
    >
      <img
        src={utils.getImageTagFromPieceTypeAndColor(props)}
        data-row-id={props.pieceCoordinates.rowIndex}
        data-column-id={props.pieceCoordinates.columnIndex}
      />
    </div>
  );
}

function handleDragStart(event: any, props: PieceProps) {
  const pieceCoordinates = 
  event.dataTransfer.dropEffect = 'move';
  event.dataTransfer.setData('rowIndex', props.pieceCoordinates.rowIndex);
  event.dataTransfer.setData('columnIndex', props.pieceCoordinates.columnIndex);

  const divElement: HTMLDivElement = event.target;
  divElement.style.opacity = '0'; 
}

function handleDragEnd(event: any){
  const divElement: HTMLDivElement = event.target;
  divElement.style.opacity = '1'; 
}

function handleOnMouseDown(event: any, props: PieceProps) {
  const legalMoves: number[] = getLegalMovesForPiece(props);
  console.log(props);
  
  // For updating highlighted blocks in the store
  const action: BoardAction = {
    type: BoardActionEnum.UPDATE_HIGHLIGHTED_BLOCKS,
    payload: {
      blockNumbers: legalMoves || []
    }
  };
  store.dispatch(action);
}

