import { mainWindow } from "./mainWindow";
import { viewModel } from "./viewModel";


const shortcutErectModeOnStraight: ShortcutDesc = {
    id: "footpatherector.mainwindow.buildstraight",
    text: "Footpath Erector ON, straight",
    bindings: ["CTRL+F"],
    callback: () => viewModel.activateStraight()
}

const shortcutErectModeOnUpDown: ShortcutDesc = {
    id: "footpatherector.mainwindow.buildupdown",
    text: "Footpath Erector ON, up-down",
    bindings: ["CTRL+G"],
    callback: () => viewModel.activateUpDown()
}

ui.registerShortcut(shortcutErectModeOnStraight)
ui.registerShortcut(shortcutErectModeOnUpDown)


export function startup() {


  if (typeof ui !== "undefined") {
    const menuItemName = "Footpath Erector";
    ui.registerMenuItem(menuItemName, () => mainWindow.open());
    // ui.registerToolboxMenuItem(menuItemName, () => allWidgets.open());
  }
}