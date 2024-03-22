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
        this.shuffleFieldsWithIntervals(0)
        .then(() => {
            this.isGameBegan = true;
            this.removeDisablingLayer();
        });
        this.renderThemeButtons();
        this.renderBoard();

        this.boardHTML.textContent = "";
        this.counterHTML.textContent = this.movesCount.toString();
        this.fields.map(field => this.convertFieldToHTMLElement(field))
    }

    protected rerender(){
        if(this.isGameBegan)
            this.boardHTML.textContent = ""
        else
            this.boardHTML.innerHTML = this.createDisablingLayer();
        this.fields.forEach(field => {
            this.convertFieldToHTMLElement(field)
        });
        
        this.counterHTML.textContent = this.movesCount.toString();



        if(this.isGameWon() && this.isGameBegan){
            this.boardHTML.innerHTML += `
            <div class = "board__content"> 
                <h1 class="board__title">Поздравляем!</h1>
                <p class="board__text">Вы собрали пятнашки за ${this.movesCount} ходов</p>
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

    private createDisablingLayer() : string {
        const shuffleBtn = document.querySelector(".shuffle") as HTMLButtonElement;
        shuffleBtn.disabled = true;
        return `<div class="disabling-layer"></div>`;
    }

    private removeDisablingLayer() : void {
        const shuffleBtn = document.querySelector(".shuffle") as HTMLButtonElement;
        const disablingLayer = document.querySelector(".disabling-layer");
        
        shuffleBtn.disabled = false;
        disablingLayer?.remove();
    }

    private renderThemeButtons() : void{
        const themeContent = document.querySelector(".themes-switcher__buttons") as HTMLElement;

        const html = buttons.map(button => {
            return `<button data-theme = "${button.data}" class="themes-switcher__button ${this.theme === button.data ? "theme-active" : ""}  ${button.data}"></button>`
        })
        themeContent.innerHTML = html.join("");

        this.switchTheme();
    }


	protected shuffleFieldsWithIntervals(index: number):Promise<number>{
		if(index >= 60) 
			return new Promise<number>((resolve) => resolve(0));
		else 
			return new Promise<number>((resolve) => {
				setTimeout(()=>{
					const neighbours: number[] = this.getZeroNeighbours();
					const randomNeighbourIndex: number = Math.floor(Math.random() * neighbours.length);
					this.moveTile(this.fields[neighbours[randomNeighbourIndex]]);
                    this.movesCount = 0;
					resolve(index + 1);
				}, 50)
			})
			.then((index: number) => {
                this.rerender();
                return this.shuffleFieldsWithIntervals(index)
            })
	}

}

export default GameRenderer;