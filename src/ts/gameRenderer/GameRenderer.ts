import GameData from "../game/Game";
import "./board.scss"
import "../fieldSet/field.scss"

class GameRenderer extends GameData{
    
    boardHTML: HTMLElement = document.createElement("section");
    counterHTML = document.querySelector(".menu-content__counter") as HTMLElement;

    private getCurrentTheme = (): string => {
        const activeThemeButton = document.querySelector(".theme-active") as HTMLElement;
        const theme = activeThemeButton.getAttribute("data-theme");

        return theme ? theme : "#FFFFFF"
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
        this.counterHTML.textContent = `Moves: ${this.movesCount}`;
        this.fields.map(field => this.convertFieldToHTMLElement(field))
    }

    protected rerender(){
        this.boardHTML.textContent = "";
        this.fields.forEach(field => {
            this.convertFieldToHTMLElement(field)
        });
        

        this.counterHTML.textContent = `Moves: ${this.movesCount}`;

        if(this.isGameWon()){
            this.boardHTML.textContent = "You won!";
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
        themeContent.innerHTML = `
            <button data-theme = "theme-white" class="themes-switcher__button theme-white theme-active"></button>
            <button data-theme = "theme-blue" class="themes-switcher__button theme-blue"></button>
            <button data-theme = "theme-yellow" class="themes-switcher__button theme-yellow"></button>
            <button data-theme = "theme-lilac" class="themes-switcher__button theme-lilac"></button>
        `
        this.switchTheme();
    }


}

export default GameRenderer;