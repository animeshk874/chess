import React from 'react';
import { BoardData } from '../../models/board';
import { Pieces } from '../../models/pieces';
import { utils } from '../../utilities/utils';
import Square from '../square/square.component';
import './board.component.css';

interface BoardProps {
  boardData: BoardData,
  highlightedBlockNumbers: number[]
}
export default class Board extends React.Component{
  props: BoardProps;
  render(){
    return (
      (this.props.boardData && <div className={'chess-board'}>
        {this.props.boardData.map(((boardRow: any, rowNum: any) => {
          return (
            <div className='board-row' key={rowNum}>
              {boardRow.map((square: any, colNum: any) => { return (
                  <Square
                    key={colNum}
                    pieceType={square.pieceType}
                    pieceColor={square.pieceColor}
                    squareColor={square.blockColor}
                    isPieceOnSquare={square.pieceType !== Pieces.NONE}
                    pieceCoordinates={{rowIndex: rowNum, columnIndex: colNum}}
                    isSquareHighlighted={this.isSquareHighlighted(rowNum, colNum)}
                  ></Square>
                );
              })}
            </div>
          );
        }))}
      </div>) || <div>Loading...</div>
    )
  }

  isSquareHighlighted(rowNum: number, colNum: number){
    const blockNumber = utils.getBlockNumberFromCoordinates({rowIndex: rowNum, columnIndex: colNum});
    return (this.props.highlightedBlockNumbers.includes(+blockNumber));
  }
}