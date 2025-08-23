import { BuildType } from "./commonTypes"
import { mainWindow } from "./mainWindow"
import { MapSelectionTool, ToolMode } from "./mapSelectionTool"
import { onMapSelect } from "./onMapSelect"

export var tool = new MapSelectionTool("proxy-pather", "path_down")
export var toolMode = <ToolMode>("off")
export var buildType =  <BuildType>("up-down")

export function activate() : void {
    mainWindow.open()
    tool.setConstraint(1)
    tool.activate()
    tool.onSelect = (selection): void => onMapSelect(selection, buildType);   
}

export function activateUpDown():void {
    buildType = "up-down"
    activate()
}

export function activateStraight(): void {
    buildType = "straight"
    activate()
}

export function startBuildStraightFreeform(): void {
    buildType = "straight"
    tool.remConstraint()
    tool.activate()
    tool.onSelect = (selection): void => onMapSelect(selection, buildType);   
}

export function startBuildUpDown(): void {
    buildType = "up-down"
    activate()
}