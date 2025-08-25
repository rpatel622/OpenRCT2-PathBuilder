import { store } from "openrct2-flexui";

const NDEF = "Error: string not defined"

export const viewModel = {
    currentLanguage: "",
    
    groupDefKeys: {
        /** groupbox top text */
        label1: store<string>(NDEF),
        /** label with default keyboard shortcut keys */
        label2: store<string>(NDEF),
    },
            
    groupLeveled: {
        text: store<string>(NDEF),

        buttonMainDisabled: store<boolean>(false),
        buttonMainTip: store<string>(NDEF),

        buttonFreeformPressed: store<boolean>(false),
        buttonFreeformTip: store<string>(NDEF),
        buttonWidthPressed: store<boolean>(false),
        buttonWidthTip: store<string>(NDEF),

        spinnerWidthVal: store<number>(1),
        spinnerWidthTip: store<string>(NDEF)
    }
    ,
    groupUpDown: {
        buttonMainDisabled: store<boolean>(true),
        buttonMainPressed: store<boolean>(false),
        buttonCopyTerrainPressed: store<boolean>(false)
    }
}

function set_en_GB():void {
    viewModel.groupDefKeys.label1.set("Default keys")
    viewModel.groupDefKeys.label2.set("Level build:{NEWLINE}| CTRL+F | CTRL+G |{NEWLINE}{NEWLINE}Sloped build: {NEWLINE}|  ALT+F  |")
   
    viewModel.groupLeveled.text.set("Leveled paths")
    viewModel.groupLeveled.buttonMainTip.set("Build leveled paths")

    viewModel.groupLeveled.buttonFreeformTip.set("Build freeform rectangles")
    viewModel.groupLeveled.buttonWidthTip.set("Build fixed width paths")
    viewModel.groupLeveled.spinnerWidthTip.set("Set width in map squares")
}

export function setLocalisation(lang_country_code: string): void {
    set_en_GB()
    switch (lang_country_code) {
        case "cs-CZ": {
            break
        }
    }
}


