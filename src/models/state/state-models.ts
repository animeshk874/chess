import { BoardData } from "../board";
import { Colors } from "../colors";
import { PieceCoordinates } from "../pieces";

export interface BoardState {
  boardData: BoardData,
  playerTurn: Colors,
  highlightedBlockNumbers: number[]
}

export enum BoardActionEnum {
  UPDATE = 'BOARD/UPDATE',
  UPDATE_HIGHLIGHTED_BLOCKS = 'BOARD/UPDATE_HIGHLIGHTED_BLOCKS'
}

// models for board update action:
interface BoardUpdateActionPayload {
  pieceConfig: {
    startCoordinates?: PieceCoordinates,
    endCoordinates?: PieceCoordinates,
    fenString?: string
  }
}

export interface BoardUpdateAction {
  type: BoardActionEnum.UPDATE,
  payload: BoardUpdateActionPayload
};

// models for board update highlighted block action:
interface BoardUpdateHighlightedBlocksActionPayload {
  blockNumbers: number[]
}

export interface BoardUpdateHighlightedBlocksAction {
  type: BoardActionEnum.UPDATE_HIGHLIGHTED_BLOCKS,
  payload: BoardUpdateHighlightedBlocksActionPayload
};


export type BoardAction = BoardUpdateAction | BoardUpdateHighlightedBlocksAction;