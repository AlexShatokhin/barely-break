import GameData from "../game/Game";
import { buttons } from "./buttons";
import "./board.scss"
import "../fieldSet/field.scss"

class GameRenderer extends GameData{
    
    boardHTML: HTMLElement = document.createElement("section");
    counterHTML = document.querySelector(".menu-content__counter") as HTMLElement;
    theme: string = "theme-white";

    private getCurrentTheme = (): string => {
        const activeThemeButton = document.querySelector(".theme-active") as HTMLElement;
        const theme = activeThemeButton.getAttribute("data-theme");

        this.theme = theme ? theme : "theme-white";
        
        return this.theme;
    }

    private convertFieldToHTMLElement = (field: number):void => {
        const element = document.createElement("div");
        element.classList.add("field__item");
        element.classList.add(this.getCurrentTheme());

        if(field === 0){
            element.classList.add("field__item-empty");
            element.classList.remove(this.getCurrentTheme());
        }

        element.textContent = field === 0 ? "" : field.toString();
        element.addEventListener("click", () => {
            this.moveTile(field)
            this.rerender()
        } );

        this.boardHTML.append(element);
        this.getCurrentTheme();
    }

    private renderBoard(){
        this.boardHTML.classList.remove("board__won");
        this.boardHTML.classList.add("board");

        document.querySelector(".game-content")?.append(this.boardHTML)
    }

    public renderNewGame(){
        this.newGame();
        this.renderThemeButtons();
        this.renderBoard();

        this.boardHTML.textContent = "";
        this.counterHTML.textContent = this.movesCount.toString();
        this.fields.map(field => this.convertFieldToHTMLElement(field))
    }

    protected rerender(){
        this.boardHTML.textContent = "";
        this.fields.forEach(field => {
            this.convertFieldToHTMLElement(field)
        });
        

        this.counterHTML.textContent = this.movesCount.toString();

        if(this.isGameWon()){
            this.boardHTML.innerHTML += `
            <div class = "board__content"> 
                <h1 class="board__title">Поздравляем!</h1>
                <p class="board__text">Вы собрали пазл за ${this.movesCount} ходов</p>
            </div>
            `;
            this.boardHTML.classList.add("board__won");

        }
    }


    private switchTheme() : void {
        const themes = document.querySelectorAll('.themes-switcher__button') as NodeListOf<HTMLElement>;

        themes.forEach(theme => {
            theme.addEventListener("click", () => {
                const activeThemeButton = document.querySelector('.theme-active') as HTMLElement;

                activeThemeButton.classList.remove("theme-active");
                theme.classList.add("theme-active");

                this.rerender();
            })
        })

    }

    private renderThemeButtons() : void{
        const themeContent = document.querySelector(".themes-switcher__buttons") as HTMLElement;

        const html = buttons.map(button => {
            return `<button data-theme = "${button.data}" class="themes-switcher__button ${this.theme === button.data ? "theme-active" : ""}  ${button.data}"></button>`
        })
        themeContent.innerHTML = html.join("");

        this.switchTheme();
    }


}

export default GameRenderer;