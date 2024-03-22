import FieldSet from "../fieldSet/FieldSet";

class GameData extends FieldSet {
    protected isGameBegan: boolean = false;

    public newGame(){
        this.clearFields();
        this.fillFields();
        this.movesCount = 0;
        this.isGameBegan = false;
    }
}

export default GameData;