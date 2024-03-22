class FieldSet {

	protected fields:number[] = [];
	protected movesCount = 0;

	protected fillFields(): void{
		for(let i = 1; i < 16; i++){
			this.fields.push(i);
		}
		this.fields.push(0);
	}

	protected clearFields(): void{
		this.fields = [];
	}

	protected getZeroNeighbours(): number[]{
		const emptyIndex: number = this.fields.indexOf(0);
		const neighbours: number[] = [];

		if(Math.floor((emptyIndex - 1) / 4) === Math.floor(emptyIndex / 4))
			neighbours.push(emptyIndex - 1);

		if(Math.floor((emptyIndex + 1) / 4) === Math.floor(emptyIndex / 4))
			neighbours.push(emptyIndex + 1);

		if(emptyIndex + 4 <= 15)
			neighbours.push(emptyIndex + 4);

		if(emptyIndex - 4 >= 0)
			neighbours.push(emptyIndex - 4);

		return neighbours;
	}

	protected shuffleFields(): void {
		for(let shuffleMoves = 0; shuffleMoves < 60; shuffleMoves++){	
			const neighbours: number[] = this.getZeroNeighbours();
			const randomNeighbourIndex: number = Math.floor(Math.random() * neighbours.length);
			this.moveTile(this.fields[neighbours[randomNeighbourIndex]]);
		}
	}



	protected isGameWon():boolean {

		for (let i = 0; i < this.fields.length - 1; i++) {
			if (this.fields[i] !== i + 1)
				return false;
		}
		return true;
	}

	protected moveTile(movingField: number = 0) {
		if (this.isValidMove(movingField)) {
			const movingFieldIndex = this.fields.indexOf(movingField)
			const emptyIndex = this.fields.indexOf(0);

			[this.fields[movingFieldIndex], this.fields[emptyIndex]] =
			[this.fields[emptyIndex], this.fields[movingFieldIndex]];

			this.movesCount++;
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
			(emptyIndex - 4 === movingFieldIndex || emptyIndex + 4 === movingFieldIndex);

		return VerticalCheckingEmptyField || HorizontalCheckingEmptyField;
	}
}


export default FieldSet;