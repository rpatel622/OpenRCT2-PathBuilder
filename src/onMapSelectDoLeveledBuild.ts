import { getPathProperties } from "./getPathProperties";
import { MapSelection, toMapRange } from "./mapSelection";
import { mapTileSize } from "./mapSelectionTool";

/**
 * Performs leveled footpaht build over selected area,
 * level height and type of path is determined by path on start of selection
 * @param selection MapSelection
 */
export function onMapSelectDoLeveledBuild(selection: MapSelection): void {
    let range = toMapRange(selection)

    if (range != null){
        let fPA = getPathProperties( map.getTile(selection.start.x/mapTileSize, selection.start.y/mapTileSize) )
        if (fPA != null) {

            for (let xStep = range.leftTop.x; xStep <= range.rightBottom.x; xStep = xStep+mapTileSize) {
                for (let yStep = range.leftTop.y; yStep <= range.rightBottom.y; yStep = yStep+mapTileSize) {
                    fPA.x = xStep,
                    fPA.y = yStep,
                    context.executeAction("footpathplace", fPA)
                }
            }
        }
    }
}
