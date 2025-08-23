import { button, label, window } from "openrct2-flexui";
import { viewModel } from "./viewModel";

export const mainWindow = window({
    title: "Footpath erector",
    width: 200,
    height: 100,
    content: [
        label({
            text: "some info"
        }),
        button({
            text: "Activate erecting mode straight",
            onClick() {
                viewModel.erectionType = "straight"
                viewModel.activate()
            },
        }),
        button({
            text: "Activate erecting mode up/down",
            onClick() {
                viewModel.erectionType = "up-down"
                viewModel.activate()
            }
        })
    ]
})