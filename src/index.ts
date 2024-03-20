import Game from "./ts/gameRenderer/GameRenderer";
import "./index.scss"

document.addEventListener("DOMContentLoaded", () => {


    const shuffleBtn = document.querySelector(".shuffle");
    const startGameBtn = document.querySelector(".start");

    const set = new Game();

    set.renderNewGame();
    shuffleBtn?.addEventListener("click", () => {
        set.renderNewGame();

    })

    startGameBtn?.addEventListener("click", () => {
        set.renderNewGame();
    })

})