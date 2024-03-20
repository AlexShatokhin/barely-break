import FieldSet from "../fieldSet/FieldSet";

class GameData extends FieldSet {
    protected isGameBegan: boolean = false;

    public newGame(){
        this.clearFields();
        this.fillFields();
        this.shuffleFields();
        this.movesCount = 0;
    }
}

export default GameData;