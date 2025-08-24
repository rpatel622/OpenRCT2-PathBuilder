import { store } from "openrct2-flexui";

export const viewModel = {
    groupLeveled: {
    buttonMainDisabled: store<boolean>(false),
    buttonFreeformPressed: store<boolean>(false),
    buttonWidthPressed: store<boolean>(true),
    spinnerWidthVal: store<number>(1),
    }
    ,
    groupUpDown: {
    buttonMainDisabled: store<boolean>(true),
    buttonMainPressed: store<boolean>(false),
    buttonCopyTerrainPressed: store<boolean>(false)
    }
}


