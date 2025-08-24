import { BuildType } from "./commonTypes"
import { MapSelectionTool, ToolMode } from "./mapSelectionTool"
import { onMapSelectDoLeveledBuild } from "./onMapSelectDoLeveledBuild"
import { onMapSelectDoUpDownBuild } from "./onMapSelectDoUpDownBuild"
import { viewModel } from "./viewModel"

export var tool = new MapSelectionTool("proxy-pather", "path_down")
export var toolMode = <ToolMode>("off")
export var buildType =  <BuildType>("straight")

// interactive change of width
viewModel.groupLeveled.spinnerWidthVal.subscribe((number) => tool.setConstraint(number))


export function startSelectingStraightFreeform(): void {
    tool.remConstraint()
    tool.activate()
    tool.onSelect = (selection): void => onMapSelectDoLeveledBuild(selection);
    tool.onCancel = () => onToolCancel()
}

export function startSelectingStraightFixedWidth(): void {
    tool.setConstraint(viewModel.groupLeveled.spinnerWidthVal.get())
    tool.activate()
    tool.onSelect = (selection): void => onMapSelectDoLeveledBuild(selection);   
    tool.onCancel = () => onToolCancel()

}

/**
 * OnClick for main "Build Leveled" Button
 * chooses freeform rectangle or fixed width based on ui lower button of choice pressed
 */
export function buttonStraightMainPress(): void {
    if (viewModel.groupLeveled.buttonFreeformPressed.get() == true) {
        startSelectingStraightFreeform()
    }
    if (viewModel.groupLeveled.buttonWidthPressed.get() == true) {
        startSelectingStraightFixedWidth()
    }
}

/**
 * OnClick for Leveled freeform rectangle button
 * Start Leveled freeform rectangle building
 */
export function buttonStraightFreeformPress(): void {
    viewModel.groupLeveled.buttonMainDisabled.set(false)
    viewModel.groupLeveled.buttonFreeformPressed.set(true)
    viewModel.groupLeveled.buttonWidthPressed.set(false)
    viewModel.groupUpDown.buttonMainDisabled.set(true)
    viewModel.groupUpDown.buttonCopyTerrainPressed.set(false)
    startSelectingStraightFreeform()
}

/**
 * OnClick for Leveled fixed width button
 * Start Leveled build with fixed width
 */
export function buttonStraightWidthPress(): void {
    viewModel.groupLeveled.buttonMainDisabled.set(false)
    viewModel.groupLeveled.buttonWidthPressed.set(true)
    viewModel.groupLeveled.buttonFreeformPressed.set(false)
    viewModel.groupUpDown.buttonMainDisabled.set(true)
    viewModel.groupUpDown.buttonCopyTerrainPressed.set(false)
    startSelectingStraightFixedWidth()
}

/**
 * OnClick for UpDown button
 */
export function buttonUpDownPress(): void {
    viewModel.groupLeveled.buttonMainDisabled.set(true)
    viewModel.groupLeveled.buttonWidthPressed.set(false)
    viewModel.groupLeveled.buttonFreeformPressed.set(false)
    //viewModel.groupUpDown.buttonMainPressed.set(true)
    viewModel.groupUpDown.buttonCopyTerrainPressed.set(true)
    viewModel.groupUpDown.buttonMainDisabled.set(false)
    tool.setConstraint(1)
    tool.activate()
    tool.onSelect = (selection): void => onMapSelectDoUpDownBuild(selection); 
    tool.onCancel = () => onToolCancel()
  
}

/**
 * When tool is canceled by ESC key
 */
export function onToolCancel(): void {
    // depress all buttons
    viewModel.groupLeveled.buttonFreeformPressed.set(false)
    viewModel.groupLeveled.buttonWidthPressed.set(false)
    viewModel.groupUpDown.buttonCopyTerrainPressed.set(false)

    // disable main in upper group
    viewModel.groupLeveled.buttonMainDisabled.set(true)
}