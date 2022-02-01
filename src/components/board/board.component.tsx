import React from 'react';
import {Pieces} from '../../models/pieces';
import Square from '../square/square.component';
import './board.component.css';

export default class Board extends React.Component{
  props: any;
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
                  ></Square>
                );
              })}
            </div>
          );
        }))}
      </div>) || <div>Loading...</div>
    )
  }
}