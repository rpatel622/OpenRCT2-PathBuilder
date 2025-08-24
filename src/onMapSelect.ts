import { debug } from "./logger";
import { MapSelection, toMapRange } from "./mapSelection";
import { mapTileSize } from "./mapSelectionTool";

/**
 * Performs leveled footpaht build over selected area,
 * level height and type of path is determined by path on start of selection
 * @param selection MapSelection
 */
export function onMapSelectDoLeveledBuild(selection: MapSelection): void {
    let range = toMapRange(selection)

    //debug(`Selection from ${range?.leftTop.x}, ${range?.leftTop.y} to ${range?.rightBottom.x}, ${range?.rightBottom.y}`)

    if (range != null){
        let tile = map.getTile(selection.start.x/mapTileSize, selection.start.y/mapTileSize)

        let baseHeight = 0

        let surface = 0
        let railing = 0

        tile.elements.forEach(element => {
            if (element.type == "footpath") {
                baseHeight = element.baseZ
                debug(element.surfaceObject?.toString() ?? "null")
                debug(element.railingsObject?.toString() ?? "null")
                debug(element.object?.toString() ?? "null")
                if ((element.surfaceObject != null) && (element.railingsObject != null)) {
                    surface = element.surfaceObject
                    railing = element.railingsObject
                }
            }
        })

        for (let xStep = range.leftTop.x; xStep <= range.rightBottom.x; xStep = xStep+mapTileSize) {
            for (let yStep = range.leftTop.y; yStep <= range.rightBottom.y; yStep = yStep+mapTileSize) {
                let footpathPlaceArgs: FootpathPlaceArgs = {
                    x: xStep,
                    y: yStep,
                    z: baseHeight,
                    /** Direction or `0xFF` */
                    direction: 0xFF,
                    /** Surface object */
                    object: surface,
                    railingsObject: railing,
                    /**
                     * - `0`: Flat
                     * - `4`, `5`, `6`, `7`: Slope direction + 4
                     */
                    slope: 0,
                    constructFlags: 0, // 0 = path, 1 = Q...eueueue
                }
                context.executeAction("footpathplace", footpathPlaceArgs)
            }
        }
        
    }
}
