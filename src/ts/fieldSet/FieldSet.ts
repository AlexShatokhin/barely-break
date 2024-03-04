class FieldSet {

	protected fields:number[] = [];

	protected fillFields(): void{
		for(let i = 0; i < 16; i++){
				this.fields.push(i);
		}
	}

	protected shuffleFields(): void {
		let temp: number;

		for (let i = this.fields.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));

			temp = this.fields[i];
			this.fields[i] = this.fields[j];
			this.fields[j] = temp;
		}
	}

	protected isGameWon():boolean {

		for (let i = 0; i < this.fields.length - 1; i++) {
			if (this.fields[i] !== i + 1) {
				return false;
			}
		}
		return true;
	}

	protected moveTile(movingField: number = 0) {
		if (this.isValidMove(movingField)) {
			const movingFieldIndex = this.fields.indexOf(movingField)
			const emptyIndex = this.fields.indexOf(0);

			[this.fields[movingFieldIndex], this.fields[emptyIndex]] =
			[this.fields[emptyIndex], this.fields[movingFieldIndex]];
		}
	}


	public isValidMove(movingField: number):boolean {
		const emptyIndex = this.fields.indexOf(0);
		const movingFieldIndex = this.fields.indexOf(movingField)

		const HorizontalCheckingEmptyField = 
			(Math.floor(emptyIndex / 4) === Math.floor(movingFieldIndex / 4)) &&
			(emptyIndex - 1 === movingFieldIndex || emptyIndex + 1 === movingFieldIndex);

		const VerticalCheckingEmptyField = 			
			(emptyIndex % 4 === movingFieldIndex % 4) &&
			(emptyIndex - 4 === movingFieldIndex || emptyIndex + 4 === movingFieldIndex);;

		return VerticalCheckingEmptyField || HorizontalCheckingEmptyField;
	}
}


export default FieldSet;