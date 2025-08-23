import { store } from "openrct2-flexui";

export const viewModel = {
    buttonStraightFreeformPressed: store<boolean>(false),
    buttonStraightWidthPressed: store<boolean>(true),
    spinnerWidthVal: store<number>(1),
    

}


