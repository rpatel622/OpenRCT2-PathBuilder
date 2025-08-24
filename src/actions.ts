import { BuildType } from "./commonTypes"
import { MapSelectionTool, ToolMode } from "./mapSelectionTool"
import { onMapSelectDoLeveledBuild } from "./onMapSelectDoLeveledBuild"
import { onMapSelectDoUpDownBuild } from "./onMapSelectDoUpDownBuild"
import { viewModel } from "./viewModel"

export var tool = new MapSelectionTool("proxy-pather", "path_down")
export var toolMode = <ToolMode>("off")
export var buildType =  <BuildType>("straight")

// interactive change of width
viewModel.spinnerWidthVal.subscribe((number) => tool.setConstraint(number))


export function startSelectingStraightFreeform(): void {
    tool.remConstraint()
    tool.activate()
    tool.onSelect = (selection): void => onMapSelectDoLeveledBuild(selection);   
}

export function startSelectingStraightFixedWidth(): void {
    tool.setConstraint(viewModel.spinnerWidthVal.get())
    tool.activate()
    tool.onSelect = (selection): void => onMapSelectDoLeveledBuild(selection);   
}

/**
 * OnClick for main "Build Leveled" Button
 * chooses freeform rectangle or fixed width based on ui lower button of choice pressed
 */
export function buttonStraightMainPress(): void {
    if (viewModel.buttonStraightFreeformPressed.get() == true) {
        startSelectingStraightFreeform()
    }
    if (viewModel.buttonStraightWidthPressed.get() == true) {
        startSelectingStraightFixedWidth()
    }
}

/**
 * OnClick for Leveled freeform rectangle button
 * Start Leveled freeform rectangle building
 */
export function buttonStraightFreeformPress(): void {
    viewModel.buttonStraightFreeformPressed.set(true)
    viewModel.buttonStraightWidthPressed.set(false)
    startSelectingStraightFreeform()
}

/**
 * OnClick for Leveled fixed width button
 * Start Leveled build with fixed width
 */
export function buttonStraightWidthPress(): void {
    viewModel.buttonStraightWidthPressed.set(true)
    viewModel.buttonStraightFreeformPressed.set(false)
    startSelectingStraightFixedWidth()
}

/**
 * OnClick for UpDown button
 */
export function buttonUpDownPress(): void {
    buildType = "up-down"
    tool.activate()
    tool.onSelect = (selection): void => onMapSelectDoUpDownBuild(selection);   
}