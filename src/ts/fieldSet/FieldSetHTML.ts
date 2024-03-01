import FieldSet from "./FieldSet";
import "./field.scss"

class FieldSetHTML extends FieldSet {

    private convertFieldToHTMLElement(field: number):HTMLDivElement{
        const element = document.createElement("div");
        element.classList.add("field__item");
        element.textContent = field === 0 ? "" : field.toString();

        return element;
    }

    protected renderFields(): HTMLDivElement[] {
        this.fillFields();
        this.shuffleFields();
        console.log(this.fields);
        return this.fields.map(this.convertFieldToHTMLElement);
    }

}

export default FieldSetHTML