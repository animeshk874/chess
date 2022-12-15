
import { BoardData } from '../models/board';

export default class FenGenerator {
  constructor(private boardData: BoardData) {
    if(!boardData?.length) {
      throw new Error('Please provide the board data');
    }
    this.generateFenString();
  }

  generateFenString() {
    // this.b
  }

}