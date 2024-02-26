import "./field.scss"

class Field {

    value: number;

    constructor(fieldValue: number = 0) {
        this.value = fieldValue
    }

    getFieldValue() : number {
        return this.value;
    }

    render(): HTMLDivElement {
        const field = document.createElement("div");
        field.classList.add("field")
        field.innerHTML = this.value.toString();
        return field;
    }
}

export default Field