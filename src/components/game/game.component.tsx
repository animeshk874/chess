import React from 'react';
import Board from '../board/board.component';
import './game.component.css';
import { ChessBoardConfig } from '../../models/chessBoardConfig';
import FenParser from '../../utilities/fen-parser';

export default class Game extends React.Component{
  props: any;
  state: any;
  boardMatrix: any = [];
  constructor(props: any){
    super(props);
    this.initializeBoardMatrix();
    this.state = {
      boardData: this.boardMatrix,
      fenString: ''
    };
  }

  render(){
    return (
      <div className="game-container">
        <div className='board-container'>
          <Board boardData={this.state.boardData}></Board>
          <input type="text" value={this.state.fenString} placeholder='Enter you FEN string here' onChange={(e) => this.handleFenStringUpdate(e)} />
          <button onClick={() => this.handleFenStringSubmit()}>Generate Board Config</button>
        </div>
      </div>
    )
  }

  handleFenStringUpdate($event: any){
    const fenString = $event.target.value;
    this.setState({fenString: fenString});
    console.log(fenString);
  }

  handleFenStringSubmit(){
    const fenParser = new FenParser(this.state.fenString);
    this.setState({boardData: fenParser.boardMatrix});
  }

  initializeBoardMatrix(){
    this.boardMatrix = (new ChessBoardConfig()).boardMatrix;
  }
}