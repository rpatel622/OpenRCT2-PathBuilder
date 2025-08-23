import { activateUpDown, buttonStraightFreeformPress, buttonStraightWidthPress } from "./actions";
import { mainWindow } from "./mainWindow";


const shortcutBuildModeOnStraightFreeform: ShortcutDesc = {
    id: "pathbuilder.mainwindow.buildstraightfreeform",
    text: "PathBuilder: Leveled Freeform Rectangle",
    bindings: ["CTRL+F"],
    callback: () => buttonStraightFreeformPress()
}

const shortcutBuildModeOnStraightWidth: ShortcutDesc = {
    id: "pathbuilder.mainwindow.buildstraightwidth",
    text: "PathBuilder: Leveled Fixed Width",
    bindings: ["CTRL+G"],
    callback: () => buttonStraightWidthPress()
}

const shortcutBuildModeOnUpDown: ShortcutDesc = {
    id: "pathbuilder.mainwindow.buildupdown",
    text: "PathBuilder: future void",
    bindings: [""],
    callback: () => activateUpDown()
}

ui.registerShortcut(shortcutBuildModeOnStraightFreeform)
ui.registerShortcut(shortcutBuildModeOnStraightWidth)

ui.registerShortcut(shortcutBuildModeOnUpDown)


export function startup() {
  if (typeof ui !== "undefined") {
    const menuItemName = "PathBuilder";
    ui.registerMenuItem(menuItemName, () => mainWindow.open());
  }
}