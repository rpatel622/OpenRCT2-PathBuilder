/**
 * Turns Tile with Footpath into FootpathPlaceArgs. The x,y,z in F~PlaceArgs are returned 0
 * 
 * @param onTile : Tile to read properties from
 * @returns FootpathPlaceArgs | null when there is no footpath on tile
 */
export function getPathProperties(onTile: Tile): (FootpathPlaceArgs | null) {

    /*
    @ OpenRCT2/src/openrct2/world/Footpath.h

    using PathConstructFlags = uint8_t;
    namespace OpenRCT2::PathConstructFlag
    {
        constexpr PathConstructFlags IsQueue = 1 << 0;
        constexpr PathConstructFlags IsLegacyPathObject = 1 << 1;
    }
    */

    let footpathPlaceArgs: FootpathPlaceArgs = {
    x: 0,
    y: 0,
    z: 0,
    direction: 0, 
    object: 0, 
    railingsObject: 0,
    slope: 0,
    constructFlags: 0,
    }

    let hasFootpath: boolean = false

    onTile.elements.forEach(element => {
        if (element.type == "footpath") {
            hasFootpath = true
            if (element.slopeDirection != null) { //todo maybe? investigate!
                footpathPlaceArgs.z = element.baseZ
            }
            else {
                footpathPlaceArgs.z = element.baseZ
            }
            
            if ((element.surfaceObject != null) && (element.railingsObject != null)) {
                footpathPlaceArgs.object = element.surfaceObject
                footpathPlaceArgs.railingsObject = element.railingsObject
                if (element.isQueue) {
                    footpathPlaceArgs.constructFlags = 0b01
                }
                else {
                    footpathPlaceArgs.constructFlags = 0
                }
            }
            if (element.object != null) {
                footpathPlaceArgs.object = element.object
                if (element.isQueue) {
                    footpathPlaceArgs.constructFlags = 0b11
                }
                else {
                    footpathPlaceArgs.constructFlags = 0b10
                }
            }
        }
    })
    
    if (hasFootpath) { 
        return footpathPlaceArgs
    }
    else {
        return null
    }

}