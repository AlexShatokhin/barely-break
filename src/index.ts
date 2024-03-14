import Board from "./ts/board/Board";
import GameData from "./ts/game/Game";
import "./index.scss"

document.addEventListener("DOMContentLoaded", () => {

    const shuffleBtn = document.querySelector(".shuffle");
    const startGameBtn = document.querySelector(".start");

    const set = new Board();

    set.renderNewGame();
    shuffleBtn?.addEventListener("click", () => {
        set.renderNewGame();

    })

    startGameBtn?.addEventListener("click", () => {
        set.renderNewGame();
    })

})