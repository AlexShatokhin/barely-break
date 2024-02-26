import Field from "../field/Field";
import "./board.scss"

class Board {
    fields: Field[] = [];

    fillFields():void{
        for(let i = 0; i < 15; i++){
            this.fields.push(new Field(i+1));
        }
        this.fields.push(new Field())
    }

    renderFields():HTMLDivElement[]{
        return this.fields.map((field) => field.render())
    }

    render():HTMLDivElement{
        const board = document.createElement("div");
        board.classList.add("board");


        this.renderFields().forEach(field => {
            board.append(field)
        })

        return board;

    }
}

export default Board;