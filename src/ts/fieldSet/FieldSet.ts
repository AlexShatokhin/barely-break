class FieldSet {

    protected fields:number[] = [];

    protected fillFields(): void{
        for(let i = 0; i < 4; i++){
            this.fields.push(i);
        }
    }

    protected shuffleFields(): void {
        let temp: number;

        for (let i = this.fields.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));

          temp = this.fields[i];
          this.fields[i] = this.fields[j];
          this.fields[j] = temp;
        }
    }

    protected isGameWon():boolean {

        for (let i = 0; i < this.fields.length - 1; i++) {
          if (this.fields[i] !== i + 1) {
            return false;
          }
        }
        return true;
    }

    protected moveTile(movingFieldIndex: number = 0) {
        if (this.isValidMove(movingFieldIndex)) {
          const emptyIndex = this.fields.indexOf(0);

          [this.fields[movingFieldIndex], this.fields[emptyIndex]] =
          [this.fields[emptyIndex], this.fields[movingFieldIndex]];
        }
      }


    private isValidMove(movingFieldIndex: number):boolean {
        const emptyIndex = this.fields.indexOf(0);

        return (
          (Math.abs(movingFieldIndex - emptyIndex) === 1 && Math.floor(movingFieldIndex / 4) === Math.floor(emptyIndex / 4)) ||
          (Math.abs(movingFieldIndex - emptyIndex) === 4 && movingFieldIndex % 4 === emptyIndex % 4)
        );
    }

    protected renderFields(): void{
        console.log(this.fields)
    }

    solve() {
        const visitedStates = new Set();
        const queue = [{ state: this.fields, moves: 0 }];
    
        while (queue.length > 0) {
        
            const updatedQueue = queue.shift();
            const { state, moves } = typeof updatedQueue === "undefined" ? { state: [], moves: 0 } : updatedQueue;
            visitedStates.add(state.toString());

            if (this.isSolved(state)) {
            return moves;
            }

            const zeroIndex = state.indexOf(0);

            this.getValidMoves(zeroIndex).forEach((move) => {
            const newState = this.swapTiles([...state], zeroIndex, move);
            if (!visitedStates.has(newState.toString())) {
                queue.push({ state: newState, moves: moves + 1 });
            }
            });
        }

        return -1; // Если решение не найдено
      }
    
      isSolved(state: number[]) {
        for (let i = 0; i < state.length - 1; i++) {
          if (state[i] !== i + 1) {
            return false;
          }
        }
        return true;
      }
    
      getValidMoves(zeroIndex:number) {
        const validMoves = [];
        if (zeroIndex % 4 !== 0) validMoves.push(zeroIndex - 1);
        if (zeroIndex % 4 !== 3) validMoves.push(zeroIndex + 1);
        if (zeroIndex >= 4) validMoves.push(zeroIndex - 4);
        if (zeroIndex < 12) validMoves.push(zeroIndex + 4);
        return validMoves;
      }
    
      swapTiles(state: number[], i:number, j:number) {
        [state[i], state[j]] = [state[j], state[i]];
        return state;
      }
    }


export default FieldSet;