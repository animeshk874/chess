import React from 'react';
import { Colors } from '../../models/colors';
import { Pieces } from '../../models/pieces';
import './piece.component.css';

// interface PieceProps {
//   a: Colors.BLACK
// };

console.log(Colors);

export default class Piece extends React.Component{
  props: any;
  render(){
    return (
      <div className={`piece piece-${this.getPieceName()} piece-${this.props.pieceColor === Colors.WHITE ? 'white' : 'black'}`}>
        <img src={this.getImageTagFromPieceTypeAndColor(this.props.pieceType, this.props.pieceColor)} />
      </div>
    )
  }

  getPieceName(){
    switch(this.props.pieceType){
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
  }

  getImageTagFromPieceTypeAndColor(pieceType: any, pieceColor: any){
    return `${process.env.PUBLIC_URL}/chess-pieces/${this.getPieceName()}_${this.props.pieceColor === Colors.WHITE ? 'white' : 'black'}.svg`;
  }
}
