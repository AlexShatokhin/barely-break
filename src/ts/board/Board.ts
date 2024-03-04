import FieldSetHTML from "../fieldSet/FieldSetHTML";
import "./board.scss"

class Board extends FieldSetHTML{
    
    board: HTMLElement = document.createElement("section");

    private convertFieldToHTMLElement = (field: number):void => {
        const element = document.createElement("div");
        element.classList.add("field__item");
        if(field === 0)
            element.classList.add("field__item-empty");

        element.textContent = field === 0 ? "" : field.toString();
        element.addEventListener("click", () => {
            this.moveTile(field)
            this.rerender()
        } );

        this.board.append(element);
    }

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
        this.renderFields();

        this.fields.map(field => this.convertFieldToHTMLElement(field))
    }

    private rerender(){
        this.board.textContent = "";
        this.fields.map(field => this.convertFieldToHTMLElement(field))
    }


}

export default Board;