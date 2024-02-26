import Field from "./ts/field/Field";
import Board from "./ts/board/Board";

document.addEventListener("DOMContentLoaded", ():void => {

    const content = document.querySelector(".content");
    const field = new Field();
    const board = new Board();
    board.fillFields();

    content?.append(board.render())

})