import { store } from "openrct2-flexui";

export const viewModel = {
    buttonLeveledMainDisabled: store<boolean>(false),
    buttonLeveledFreeformPressed: store<boolean>(false),
    buttonLeveledWidthPressed: store<boolean>(true),
    spinnerWidthVal: store<number>(1),

    buttonUpDownMainDisabled: store<boolean>(false),
    buttonUpDownMainPressed: store<boolean>(false),
    buttonUpDownCopyTerrainPressed: store<boolean>(false)
}


