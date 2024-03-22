import Game from "./ts/gameRenderer/GameRenderer";
import SwitchPageTheme from "./ts/gameRenderer/SwitchPageTheme";
import "./index.scss"

document.addEventListener("DOMContentLoaded", () => {

    const shuffleBtn = document.querySelector(".shuffle");
    const theme = new SwitchPageTheme();
    const set = new Game();

    set.renderNewGame();
    theme.renderThemeButton();
    shuffleBtn?.addEventListener("click", () => set.renderNewGame())
})