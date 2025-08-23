import { activateStraight, activateUpDown } from "./actions";
import { mainWindow } from "./mainWindow";


const shortcutBuildModeOnStraight: ShortcutDesc = {
    id: "pathbuilder.mainwindow.buildstraight",
    text: "Footpath Erector ON, straight",
    bindings: ["CTRL+F"],
    callback: () => activateStraight()
}

const shortcutBuildModeOnUpDown: ShortcutDesc = {
    id: "pathbuilder.mainwindow.buildupdown",
    text: "Footpath Erector ON, up-down",
    bindings: ["CTRL+G"],
    callback: () => activateUpDown()
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