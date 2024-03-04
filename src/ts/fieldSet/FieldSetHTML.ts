import FieldSet from "./FieldSet";
import "./field.scss"

class FieldSetHTML extends FieldSet {

    protected renderFields(): void {
        this.fillFields();
        this.shuffleFields();
    }

}

export default FieldSetHTML