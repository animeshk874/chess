import { createStore, Store } from 'redux';
import FenParser from '../../utilities/fen-parser';
import { BlockData } from '../blocks';
import { ChessBoardConfig } from '../chessBoardConfig';
import { Colors } from '../colors';
import { PieceCoordinates, Pieces } from '../pieces';
import { BoardAction, BoardActionEnum, BoardState } from './state-models';

const defaultBoardState: BoardState = {
  boardData: (new ChessBoardConfig()).boardMatrix,
  playerTurn: Colors.WHITE,
  highlightedBlockNumbers: []
};

function boardReducer(state: BoardState = defaultBoardState, action?: BoardAction): BoardState {
  if(action.type === BoardActionEnum.UPDATE){
    const fenString: string = action.payload.pieceConfig.fenString;
    if(fenString){
      const fenParser = new FenParser(fenString);
      return { ...state, boardData: fenParser.boardMatrix };
    } else {
      const startCoordinates: PieceCoordinates = action.payload.pieceConfig.startCoordinates;
      const endCoordinates: PieceCoordinates = action.payload.pieceConfig.endCoordinates;
      const boardState: BoardState = updateBoardUsingCoordinates(JSON.parse(JSON.stringify(state)), startCoordinates, endCoordinates);
      return boardState;
    }
  }
  if(action.type === BoardActionEnum.UPDATE_HIGHLIGHTED_BLOCKS) {
    return {...state, highlightedBlockNumbers: action.payload.blockNumbers || []}
  }
  return state;
}

const store: Store = createStore(boardReducer);
export default store;



// ######------ Utility Functions ------######
function updateBoardUsingCoordinates(boardStateCopy: BoardState, startCoordinates: PieceCoordinates, endCoordinates: PieceCoordinates): BoardState {
  const startBlockData: BlockData = boardStateCopy.boardData[startCoordinates.rowIndex][startCoordinates.columnIndex];
  const endBlockData: BlockData = boardStateCopy.boardData[endCoordinates.rowIndex][endCoordinates.columnIndex];
  if((endBlockData.pieceType !== Pieces.NONE) && (startBlockData.pieceColor === endBlockData.pieceColor)) {
    // there's a piece of same color in the target block; P.S. -> This can be removed after we have figured out a way to calculate the possible moves for the selected piece
    return boardStateCopy;
  }

  boardStateCopy.playerTurn = startBlockData.pieceColor == Colors.WHITE ? Colors.BLACK : Colors.WHITE;
  boardStateCopy.boardData[startCoordinates.rowIndex][startCoordinates.columnIndex] = new BlockData(0, null, startBlockData.blockColor);
  boardStateCopy.boardData[endCoordinates.rowIndex][endCoordinates.columnIndex] = new BlockData(startBlockData.pieceType, startBlockData.pieceColor, endBlockData.blockColor);
  
  return boardStateCopy;
}