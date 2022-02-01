import { BlockData } from "../models/blocks";
import { ChessBoardConfig } from "../models/chessBoardConfig";
import { Colors } from "../models/colors";
import { Pieces, FenMapping } from "../models/pieces";

const startPosition = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR';


export default class FenParser {
  boardMatrix = [];

  constructor(fenString){
    if(this.isFenStringInvalid()){
      throw new Error('Invalid FEN string!');
    }
    this.getBoardData(fenString);
  }

  getBoardData(fenString){
    this.boardMatrix = (new ChessBoardConfig(true)).boardMatrix;
    const [ piecePositionString ] = fenString.split(' ');
    this.updatePostionsForPieces(piecePositionString);
  }

  updatePostionsForPieces(piecePositionString){
    const rowsData = piecePositionString.split('/');
    rowsData.forEach((rowData, rowIndex) => {
      const blocks = rowData.split('');
      let colIndex = -1;
      blocks.forEach((block) => {
        colIndex++;
        if(!Number.isNaN(+block)){
          colIndex = colIndex + (block - 1);
          console.log(`Row: ${rowIndex}, Col: ${colIndex}, Block Index: ${block}`);
          return;
        } else {
          const pieceName = FenMapping[block.toLowerCase()];
          const pieceType = Pieces[pieceName];
          const pieceColor = block.charCodeAt(0) >= 97 ? Colors.BLACK : Colors.WHITE;
          const blockData = this.boardMatrix[rowIndex][colIndex];
          this.boardMatrix[rowIndex][colIndex] = new BlockData(pieceType, pieceColor, blockData.blockColor);
        }
      });
    })
  }

  isFenStringInvalid(){
    // to be implemented later
  }

}