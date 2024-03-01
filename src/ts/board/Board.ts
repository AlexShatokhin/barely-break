import FieldSetHTML from "../fieldSet/FieldSetHTML";
import "./board.scss"

class Board extends FieldSetHTML{
    
    board: HTMLElement = document.createElement("section");

    private renderBoard(){
        this.board.classList.add("board");
        document.documentElement.append(this.board)
    }

    private clearFields(){
        this.fields = [];
        this.board.textContent = "";
    }

    public render(){
        this.clearFields();
        this.renderBoard();
        this.renderFields().map(field => this.board.append(field))
    }



    solvePuzzle():number{
        const moves = this.solve();
        this.board.textContent = "";
        this.renderFields().map(field => this.board.append(field))

        return moves;
    }

}

export default Board;