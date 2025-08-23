import { BuildType } from "./commonTypes"
import { MapSelectionTool, ToolMode } from "./mapSelectionTool"
import { onMapSelect } from "./onMapSelect"
import { viewModel } from "./viewModel"

export var tool = new MapSelectionTool("proxy-pather", "path_down")
export var toolMode = <ToolMode>("off")
export var buildType =  <BuildType>("straight")

viewModel.spinnerWidthVal.subscribe((number) => tool.setConstraint(number))


/// todo: clean up this mess
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
    tool.setConstraint(viewModel.spinnerWidthVal.get())
    tool.activate()
    tool.onSelect = (selection): void => onMapSelect(selection, buildType);   
}

/**
 * OnClick for main "Build Leveled" Button
 * chooses freeform rectangle or fixed width based on ui lower button of choice pressed
 */
export function buttonStraightMainPress(): void {
    if (viewModel.buttonStraightFreeformPressed.get() == true) {
        startBuildStraightFreeform()
    }
    if (viewModel.buttonStraightWidthPressed.get() == true) {
        startBuildStraightFixedWidth()
    }
}

/**
 * OnClick for Leveled freeform rectangle
 * Start Leveled freeform rectangle building
 */
export function buttonStraightFreeformPress(): void {
    viewModel.buttonStraightFreeformPressed.set(true)
    viewModel.buttonStraightWidthPressed.set(false)
    startBuildStraightFreeform()
}

/**
 * OnClick for Leveled fixed width
 * Start Leveled build with fixed width
 */
export function buttonStraightWidthPress(): void {
    viewModel.buttonStraightWidthPressed.set(true)
    viewModel.buttonStraightFreeformPressed.set(false)
    startBuildStraightFixedWidth()
}

