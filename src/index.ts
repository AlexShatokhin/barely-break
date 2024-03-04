import Board from "./ts/board/Board";
import "./index.scss"

document.addEventListener("DOMContentLoaded", () => {

    const shuffleBtn = document.querySelector(".shuffle");
    const solveBtn = document.querySelector(".solve");

    const set = new Board();

    set.render();
    shuffleBtn?.addEventListener("click", () => {
        set.render();
    })

    solveBtn?.addEventListener("click", () => {
    })

})