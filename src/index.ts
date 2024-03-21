import Game from "./ts/gameRenderer/GameRenderer";
import "./index.scss"

document.addEventListener("DOMContentLoaded", () => {

    const shuffleBtn = document.querySelector(".shuffle");
    const set = new Game();

    set.renderNewGame();
    shuffleBtn?.addEventListener("click", () => set.renderNewGame())
})