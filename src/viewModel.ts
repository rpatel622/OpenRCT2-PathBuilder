import { store } from "openrct2-flexui";


export const viewModel = {
    currentLanguage: "",
    
    groupDefKeys: {
        /** groupbox top text */
        label1: "Default keys",
        /** label with default keyboard shortcut keys */
        label2: "Level build:{NEWLINE}| CTRL+F | CTRL+G |{NEWLINE}{NEWLINE}Sloped build: {NEWLINE}|  ALT+F  |",
    },
            
    groupLeveled: {
        text: "Leveled paths",

        buttonMainDisabled: store<boolean>(false),
        buttonMainTip: "Build leveled paths",

        buttonFreeformPressed: store<boolean>(false),
        buttonFreeformTip: "Build freeform rectangles",
        buttonWidthPressed: store<boolean>(false),
        buttonWidthTip: "Build fixed width paths",

        spinnerWidthVal: store<number>(1),
        spinnerWidthTip: "Set width in map squares"
    },

    groupUpDown: {
        text: "Sloped paths",
        
        buttonMainDisabled: store<boolean>(true),
        buttonMainPressed: store<boolean>(false),
        buttonMainTip: "Build sloped paths",

        buttonCopyTerrainPressed: store<boolean>(false),
        buttonCopyTerrainTip: "Copy terrain mode",

    },

    groupAbout: {
        text: "Info & About",
        buttonInfoTip: "Credits",
    }
}



