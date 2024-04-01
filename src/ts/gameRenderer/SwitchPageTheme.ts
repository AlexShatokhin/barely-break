type ThemeType = "white" | "black";

class SwitchPageTheme {
    static theme : ThemeType = "white"
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
        const newTheme : ThemeType = SwitchPageTheme.theme === "white" ? "black" : "white"
        document.documentElement.style.backgroundColor = newTheme === "white" ? "#FFFFFF" : "#404040";        

        const themeButtonsTitle = document.querySelector(".themes-switcher__title");
        const menuContent = document.querySelector(".menu-content__information");
        const board = document.querySelector(".board");

        this.toggleElementsTheme(themeButtonsTitle, SwitchPageTheme.theme, newTheme);
        this.toggleElementsTheme(menuContent, SwitchPageTheme.theme, newTheme);
        this.toggleElementsTheme(board, SwitchPageTheme.theme, newTheme);

        SwitchPageTheme.theme = newTheme;

    }

    private toggleElementsTheme(element: Element | null, oldTheme : ThemeType, newTheme : ThemeType){
        element?.classList.remove(`theme_${oldTheme}`);
        element?.classList.add(`theme_${newTheme}`);
    }

    static getTheme() : ThemeType{
        return SwitchPageTheme.theme;
    }
}

export default SwitchPageTheme