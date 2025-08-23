import { BuildType } from "./commonTypes";
import { debug } from "./logger";
import { MapSelection, toMapRange } from "./mapSelection";
import { mapTileSize } from "./mapSelectionTool";

export function onMapSelect(selection: MapSelection, erection: BuildType): void {
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
                //element.isGhost = true
                debug(element.surfaceObject?.toString() ?? "null")
                debug(element.railingsObject?.toString() ?? "null")
                debug(element.object?.toString() ?? "null")
                if ((element.surfaceObject != null) && (element.railingsObject != null)) {
                    surface = element.surfaceObject
                    railing = element.railingsObject
                }
            }
        })

        if (erection == "straight") {
            for (let xStep = range.leftTop.x; xStep <= range.rightBottom.x; xStep = xStep+mapTileSize) {
                for (let yStep = range.leftTop.y; yStep <= range.rightBottom.y; yStep = yStep+mapTileSize) {
                    let e: FootpathPlaceArgs = {
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
                    context.executeAction("footpathplace", e)
                }
            }
        }

        if (erection == "up-down") {
            debug("the tool is in up-down mode")
            // determine terrain profile from start point
            if (selection.end) {
                if (selection.start.x == selection.end.x) {
                    for (let yStep = selection.start.y; yStep <= selection.end.y; yStep += mapTileSize) {
                        let title = map.getTile(selection.start.x, yStep)
                        
                        debug(JSON.stringify(tile.elements))
                        title.elements.forEach( element => {
                            if (element.type == "surface") {
                                debug(element.baseZ.toString())
                                debug(element.slope.toString())
                            }
                        } )
                    }  
 
                }
 
            }


    
        }
    }
}