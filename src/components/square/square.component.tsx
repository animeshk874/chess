import React from 'react';
import { Pieces } from '../../models/pieces';
import './square.component.css';
import Piece from '../piece/piece.component';
import { Colors } from '../../models/colors';

export default class Square extends React.Component{
  props: any;
  render(){
    return (
      <div className={`chess-block ${this.props.squareColor == Colors.WHITE ? 'block-white' : 'block-black'} ${this.props.isPieceOnSquare && 'piece-available'}`}>
        {this.props.isPieceOnSquare && <Piece pieceType={this.props.pieceType} pieceColor={this.props.pieceColor}></Piece>}
      </div>
    )
  }
}