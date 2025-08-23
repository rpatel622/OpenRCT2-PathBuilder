import { ErectionType as BuildType } from "./commonTypes";
import { mainWindow } from "./mainWindow";
import { MapSelectionTool, ToolMode } from "./mapSelectionTool";
import { onMapSelect } from "./onMapSelect";



export const viewModel = {
    tool: new MapSelectionTool("proxy-pather", "path_down"),
	toolMode: <ToolMode>("off"),

    buildType: <BuildType>("up-down"),

    activate() : void {
        mainWindow.open()
        this.tool.setConstraint(1)
        this.tool.activate()
        this.tool.onSelect = (selection): void => onMapSelect(selection, this.buildType);   
    }

    ,activateUpDown():void {
        this.buildType = "up-down"
        this.activate()
    }

    ,activateStraight(): void {
        this.buildType = "straight"
        this.activate()
    }

}


