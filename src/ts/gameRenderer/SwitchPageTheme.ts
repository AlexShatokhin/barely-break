
class SwitchPageTheme {
    private theme = "white"
    public renderThemeButton(){
        const themeButton = document.createElement("button");
        themeButton.classList.add("menu-content__button", "theme-button");
        
        themeButton.textContent = "Сменить тему";
        themeButton.addEventListener("click", () => {
            this.switchTheme();
        });
        document.querySelector(".menu-content__buttons")?.append(themeButton);
    }

    private switchTheme(){
        const newTheme = this.theme === "white" ? "black" : "white"
        document.documentElement.style.backgroundColor = newTheme;
        this.theme = newTheme;
    }
}

export default SwitchPageTheme