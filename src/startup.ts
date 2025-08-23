import { mainWindow } from "./mainWindow";
import { viewModel } from "./viewModel";


const shortcutBuildModeOnStraight: ShortcutDesc = {
    id: "pathbuilder.mainwindow.buildstraight",
    text: "Footpath Erector ON, straight",
    bindings: ["CTRL+F"],
    callback: () => viewModel.activateStraight()
}

const shortcutBuildModeOnUpDown: ShortcutDesc = {
    id: "pathbuilder.mainwindow.buildupdown",
    text: "Footpath Erector ON, up-down",
    bindings: ["CTRL+G"],
    callback: () => viewModel.activateUpDown()
}

ui.registerShortcut(shortcutBuildModeOnStraight)
ui.registerShortcut(shortcutBuildModeOnUpDown)


export function startup() {


  if (typeof ui !== "undefined") {
    const menuItemName = "PathBuilder";
    ui.registerMenuItem(menuItemName, () => mainWindow.open());
    // ui.registerToolboxMenuItem(menuItemName, () => allWidgets.open());
  }
}