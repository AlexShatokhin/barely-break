type ThemeType = "white" | "black";

interface ThemeSwitcher {
    renderThemeButton() : void;
    switchTheme() : void;
    toggleElementsTheme(element: Element | null, oldTheme : ThemeType, newTheme : ThemeType) : void;
}

class SwitchPageTheme implements ThemeSwitcher{
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

    switchTheme(){
        const newTheme : ThemeType = SwitchPageTheme.theme === "white" ? "black" : "white"
        const contentLayout = document.querySelector(".main") as HTMLElement;
        contentLayout.style.backgroundColor = newTheme === "white" ? "#FFFFFF" : "#404040";        

        const themeButtonsTitle = document.querySelector(".themes-switcher__title");
        const menuContent = document.querySelector(".menu-content__information");
        const board = document.querySelector(".board");
        const themeButtonsLayout = document.querySelector(".themes-switcher__buttons");

        this.toggleElementsTheme(themeButtonsTitle, SwitchPageTheme.theme, newTheme);
        this.toggleElementsTheme(menuContent, SwitchPageTheme.theme, newTheme);
        this.toggleElementsTheme(board, SwitchPageTheme.theme, newTheme);
        this.toggleElementsTheme(themeButtonsLayout, SwitchPageTheme.theme, newTheme);

        SwitchPageTheme.theme = newTheme;

    }

    toggleElementsTheme(element: Element | null, oldTheme : ThemeType, newTheme : ThemeType){
        element?.classList.remove(`theme_${oldTheme}`);
        element?.classList.add(`theme_${newTheme}`);
    }

    static getTheme() : ThemeType{
        return SwitchPageTheme.theme;
    }
}

export default SwitchPageTheme