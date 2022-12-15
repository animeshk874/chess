import React from 'react';
import Board from '../board/board.component';
import './game.component.css';
import { ChessBoardConfig } from '../../models/chessBoardConfig';
import { BoardData } from '../../models/board';
import store from '../../models/state/state';
import { BoardAction, BoardActionEnum, BoardState } from '../../models/state/state-models';
import { Colors } from '../../models/colors';

interface GameState {
  boardData: BoardData,
  fenString: string,
  playerTurn: Colors,
  highlightedBlockNumbers: number[]
}
export default class Game extends React.Component{
  state: GameState;
  boardMatrix: BoardData = [];
  constructor(props: any){
    super(props);
    this.initializeBoardMatrix();
    this.state = {
      boardData: this.boardMatrix,
      fenString: '',
      playerTurn: Colors.WHITE,
      highlightedBlockNumbers: []
    };
  }

  componentDidMount(): void {
    store.subscribe(() => {
      const boardState: BoardState = store.getState();
      this.setState({boardData: boardState.boardData, playerTurn: boardState.playerTurn, highlightedBlockNumbers: boardState.highlightedBlockNumbers});
    });
  }

  render(){
    return (
      <div className="game-container">
        <div className='board-container'>
          <Board boardData={this.state.boardData} highlightedBlockNumbers={this.state.highlightedBlockNumbers}></Board>
          <input type="text" value={this.state.fenString} placeholder='Enter you FEN string here' onChange={(e) => this.handleFenStringUpdate(e)} />
          <button onClick={() => this.handleFenStringSubmit()}>Generate Board Config</button>
        </div>
      </div>
    )
  }

  handleFenStringUpdate($event: any){
    const fenString = $event.target.value;
    this.setState({fenString: fenString});
  }

  handleFenStringSubmit(){
    const action: BoardAction = {
      type: BoardActionEnum.UPDATE,
      payload: {
        pieceConfig: {
          fenString: this.state.fenString
        }
      }
    };
    store.dispatch(action);
  }

  initializeBoardMatrix(){
    this.boardMatrix = (new ChessBoardConfig()).boardMatrix;
  }
}