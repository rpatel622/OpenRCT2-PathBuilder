import { getPathProperties } from "./getPathProperties";
import { debug } from "./logger";
import { MapSelection } from "./mapSelection";
import { mapTileSize } from "./mapSelectionTool";
import { kTileSlopeDiagonalFlag, kTileSlopeECornerDown, kTileSlopeECornerUp, kTileSlopeNCornerDown, kTileSlopeNCornerUp, kTileSlopeNESideUp, kTileSlopeNSValley, kTileSlopeNWSideUp, kTileSlopeSCornerDown, kTileSlopeSCornerUp, kTileSlopeSESideUp, kTileSlopeSWSideUp, kTileSlopeWCornerDown, kTileSlopeWCornerUp, kTileSlopeWEValley } from "./slopeH";

type DirectionWord = ("SW" | "NE" | "SE" | "NW" | null)

function wayToSlope(slope:DirectionWord):number {
    switch (slope) {
        case "SW": {
            return 4
        }
        case "NE": {
            return 6
        }
        case "SE": {
            return 7
        }
        case "NW": {
            return 5
        }
        default: {
            return 0
        }
    }
   
}

function opositeOfdirection(slope:DirectionWord):DirectionWord {
    switch (slope) {
        case "NE": {
            return "SW"
        }
        case "NW": {
            return "SE"
        }
        case "SE": {
            return "NW"
        }
        case "SW": {
            return "NE"
        }
        default: {
            return null
        }
    }
}

function dirEqualSlopeUp(dir: DirectionWord): number {
    switch (dir) {
        case "NE": {
            return kTileSlopeNESideUp
        }
        case "NW": {
            return kTileSlopeNWSideUp
        }
        case "SE": {
            return kTileSlopeSESideUp
        }
        case "SW": {
            return kTileSlopeSWSideUp
        }
        default: {
            return 0
        }
    }
}

function dirEqualCornerUp1(dir: DirectionWord): number {
    switch (dir) {
        case "NE": {
            return kTileSlopeNCornerUp
        }
        case "NW": {
            return kTileSlopeNCornerUp
        }
        case "SE": {
            return kTileSlopeSCornerUp
        }
        case "SW": {
            return kTileSlopeSCornerUp
        }
        default: {
            return 0
        }
    }
}

function dirEqualCornerUp2(dir: DirectionWord): number {
    switch (dir) {
        case "NE": {
            return kTileSlopeECornerUp
        }
        case "NW": {
            return kTileSlopeWCornerUp
        }
        case "SE": {
            return kTileSlopeECornerUp
        }
        case "SW": {
            return kTileSlopeWCornerUp
        }
        default: {
            return 0
        }
    }
}

function dirRightSlopeUp(dir: DirectionWord): number {
    switch (dir) {
        case "NE": {
            return kTileSlopeSESideUp
        }
        case "NW": {
            return kTileSlopeNESideUp
        }
        case "SE": {
            return kTileSlopeSWSideUp
        }
        case "SW": {
            return kTileSlopeNWSideUp
        }
        default: {
            return 0
        }
    }
}

function dirLeftSlopeUp(dir: DirectionWord): number {
    switch (dir) {
        case "NE": {
            return kTileSlopeNWSideUp
        }
        case "NW": {
            return kTileSlopeSWSideUp
        }
        case "SE": {
            return kTileSlopeNESideUp
        }
        case "SW": {
            return kTileSlopeSESideUp
        }
        default: {
            return 0
        }
    }
}

function dirCornerDown1(dir: DirectionWord): number {
    switch (dir) {
        case "NE": {
            return kTileSlopeNCornerDown
        }
        case "NW": {
            return kTileSlopeNCornerDown
        }
        case "SE": {
            return kTileSlopeSCornerDown
        }
        case "SW": {
            return kTileSlopeSCornerDown
        }
        default: {
            return 0
        }
    }
}


function dirCornerDown2(dir: DirectionWord): number {
    switch (dir) {
        case "NE": {
            return kTileSlopeECornerDown
        }
        case "NW": {
            return kTileSlopeWCornerDown
        }
        case "SE": {
            return kTileSlopeECornerDown
        }
        case "SW": {
            return kTileSlopeWCornerDown
        }
        default: {
            return 0
        }
    }
}

/**
 * Builds paths copying the terrain
 * @param selection MapSelection must be 1 title wide!
 */
export function onMapSelectDoUpDownBuild(selection: MapSelection): void {
    
    if (selection.end?.x != undefined && selection.end.y != undefined ) {
        let fPA = getPathProperties( map.getTile(selection.start.x/mapTileSize, selection.start.y/mapTileSize) )
        if (fPA != null) {
            debug("in updown")
            // prepare array for storing tiles
            
            let tiles: Array<Tile> = []
            // 1. determine order

            let direction:DirectionWord = null
            // find longer side
            if (Math.abs(selection.start.x - selection.end.x) > Math.abs(selection.start.y - selection.end.y)) {
                // find direction in that side
                if(selection.start.x > selection.end.x) {
                    for (let xStep = selection.start.x; xStep >= selection.end.x; xStep -= mapTileSize) {
                        // store tiles where path will be built in order of build
                        tiles.push(map.getTile(xStep/mapTileSize, selection.start.y/mapTileSize))
                        direction = "SW"
                    }
                }
                else { // selection.start.x < selection.end.x
                    for (let xStep = selection.start.x; xStep <= selection.end.x; xStep += mapTileSize) {
                        tiles.push(map.getTile(xStep/mapTileSize, selection.start.y/mapTileSize))
                        direction = "NE"
                    }
                }
            }
            else { // Math.abs(selection.start.x - selection.end.x) < Math.abs(selection.start.y - selection.end.y)
                if(selection.start.y > selection.end.y) {
                    for (let yStep = selection.start.y; yStep >= selection.end.y; yStep -= mapTileSize) {
                        tiles.push(map.getTile(selection.start.x/mapTileSize, yStep/mapTileSize))
                        direction = "SE"
                    }
                }
                else { // selection.start.y < selection.end.y
                    for (let yStep = selection.start.y; yStep <= selection.end.y; yStep += mapTileSize) {
                        tiles.push(map.getTile(selection.start.x/mapTileSize, yStep/mapTileSize))
                        direction = "NW"
                    }
                }
            }

            let fPA = getPathProperties( map.getTile(selection.start.x/mapTileSize, selection.start.y/mapTileSize) )


            tiles.forEach(tile => {
                    tile.elements.forEach(element => {
                        if (element.type == "surface") {


                            debug(`surface: ${element.baseZ}, slope bin ${element.slope.toString(2)}, , slope dec ${element.slope.toString()}`)
                            if (fPA != null) {
                                fPA.slope = 0
                                fPA.z = element.baseZ
                                fPA.x = tile.x*mapTileSize
                                fPA.y = tile.y*mapTileSize
                                
                                if (element.waterHeight == 0) {
                                    switch (element.slope) {
                                        case dirEqualSlopeUp(direction): {
                                            fPA.slope = wayToSlope(direction)
                                            fPA.z = element.baseZ
                                            break 
                                        }
                                        case dirEqualCornerUp1(direction): {
                                            fPA.slope = wayToSlope(direction)
                                            fPA.z = element.baseZ+6
                                            break
                                        }
                                        case dirEqualCornerUp2(direction): {
                                            fPA.slope = wayToSlope(direction)
                                            fPA.z = element.baseZ+6
                                            break
                                        }
                                        case dirCornerDown1(opositeOfdirection(direction))+kTileSlopeDiagonalFlag: {
                                            fPA.slope = wayToSlope(direction)
                                            fPA.z = element.baseZ+16
                                            break
                                        }
                                        case dirCornerDown2(opositeOfdirection(direction))+kTileSlopeDiagonalFlag: {
                                            fPA.slope = wayToSlope(direction)
                                            fPA.z = element.baseZ+16
                                            break
                                        }
                                        case dirRightSlopeUp(direction): {
                                            fPA.z = element.baseZ + 16
                                            break
                                        }
                                        case dirLeftSlopeUp(direction): {
                                            fPA.z = element.baseZ + 16
                                            break
                                        }
                                        case dirEqualSlopeUp(opositeOfdirection(direction)): {
                                            fPA.slope = wayToSlope(opositeOfdirection(direction))
                                            fPA.z = element.baseZ
                                            break
                                        }
                                        case dirEqualCornerUp1(opositeOfdirection(direction)): {
                                            fPA.slope = wayToSlope(opositeOfdirection(direction))
                                            fPA.z = element.baseZ+6
                                            break

                                        }
                                        case dirEqualCornerUp2(opositeOfdirection(direction)): {
                                            fPA.slope = wayToSlope(opositeOfdirection(direction))
                                            fPA.z = element.baseZ+6
                                            break

                                        }
                                        case dirCornerDown1(direction)+kTileSlopeDiagonalFlag: {
                                            fPA.slope = wayToSlope(opositeOfdirection(direction))
                                            fPA.z = element.baseZ+16
                                            break
                                        }
                                        case dirCornerDown2(direction)+kTileSlopeDiagonalFlag: {
                                            fPA.slope = wayToSlope(opositeOfdirection(direction))
                                            fPA.z = element.baseZ+16
                                            break
                                        }  
                                        // corners down
                                        case kTileSlopeNCornerDown: {
                                            fPA.slope = 0
                                            fPA.z = element.baseZ+16    
                                            break
                                        }
                                        case kTileSlopeECornerDown: {
                                            fPA.slope = 0
                                            fPA.z = element.baseZ+16    
                                            break
                                        }
                                        case kTileSlopeSCornerDown: {
                                            fPA.slope = 0
                                            fPA.z = element.baseZ+16    
                                            break
                                        }
                                        case kTileSlopeWCornerDown: {
                                            fPA.slope = 0
                                            fPA.z = element.baseZ+16    
                                            break
                                        }
                                        // grand canyons :)
                                        case kTileSlopeNSValley: {
                                            fPA.slope = 0
                                            fPA.z = element.baseZ+16    
                                            break
                                        }
                                        case kTileSlopeWEValley: {
                                            fPA.slope = 0
                                            fPA.z = element.baseZ+16    
                                            break
                                        }
                                    }
                                }
                                else { // just build on water... 
                                    fPA.z = element.waterHeight
                                }
                                context.executeAction("footpathplace", fPA)
                            }
                        }
                    });
            });
        }
    }
}