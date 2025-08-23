import { BuildType } from "./commonTypes"
import { MapSelectionTool, ToolMode } from "./mapSelectionTool"
import { onMapSelect } from "./onMapSelect"
import { viewModel } from "./viewModel"

export var tool = new MapSelectionTool("proxy-pather", "path_down")
export var toolMode = <ToolMode>("off")
export var buildType =  <BuildType>("straight")

export function activate() : void {
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

export function startBuildStraightFixedWidth(): void {
    buildType = "straight"
    tool.setConstraint(1)
    tool.activate()
    tool.onSelect = (selection): void => onMapSelect(selection, buildType);   
}

export function startBuildUpDown(): void {
    buildType = "up-down"
    activate()
}

export function buttonStraightFreeformPress(): void {
    viewModel.buttonStraightFreeformPressed.set(true)
    viewModel.buttonStraightWidthPressed.set(false)
    startBuildStraightFreeform()
}

export function buttonStraightWidthPress(): void {
    viewModel.buttonStraightWidthPressed.set(true)
    viewModel.buttonStraightFreeformPressed.set(false)
    startBuildStraightFixedWidth()
}

export function buttonStraightPress(): void {
    if (viewModel.buttonStraightFreeformPressed.get() == true) {
        startBuildStraightFreeform()
    }
    if (viewModel.buttonStraightWidthPressed.get() == true) {
        startBuildStraightFixedWidth()
    }
}