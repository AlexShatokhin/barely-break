import GameData from "../game/Game";
import "./board.scss"
import "../fieldSet/field.scss"

class GameRenderer extends GameData{
    
    boardHTML: HTMLElement = document.createElement("section");
    counterHTML = document.querySelector(".menu-content__counter") as HTMLElement;


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

        this.boardHTML.append(element);
    }

    private renderBoard(){
        this.boardHTML.classList.remove("board__won");
        this.boardHTML.classList.add("board");
        document.documentElement.append(this.boardHTML)
    }

    public renderNewGame(){
        this.newGame();
        this.renderBoard();

        this.boardHTML.textContent = "";
        this.counterHTML.textContent = `Moves: ${this.movesCount}`;
        this.fields.map(field => this.convertFieldToHTMLElement(field))
    }

    private rerender(){
        this.boardHTML.textContent = "";
        this.fields.map(field => this.convertFieldToHTMLElement(field))
        
        this.counterHTML.textContent = `Moves: ${this.movesCount}`;

        if(this.isGameWon()){
            this.boardHTML.textContent = "You won!";
            this.boardHTML.classList.add("board__won");
        }
    }


}

export default GameRenderer;