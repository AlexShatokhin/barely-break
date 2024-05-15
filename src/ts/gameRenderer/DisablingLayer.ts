

class DisablingLayer{


    public createDisablingLayer() : string {
        const shuffleBtn = document.querySelector(".shuffle") as HTMLButtonElement;
        shuffleBtn.disabled = true;
        return `<div class="disabling-layer"></div>`;
    }

    public removeDisablingLayer() : void {
        const shuffleBtn = document.querySelector(".shuffle") as HTMLButtonElement;
        const disablingLayer = document.querySelector(".disabling-layer");
        
        shuffleBtn.disabled = false;
        disablingLayer?.remove();
    }


}

export default DisablingLayer;