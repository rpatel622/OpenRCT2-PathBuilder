/**
 * converted from OpenRCT2/src/openrct2/world/tile_element/Slope.h
 * @ https://github.com/OpenRCT2/OpenRCT2/blob/develop/src/openrct2/world/tile_element/Slope.h
 * 
 */

export const kTileSlopeFlat = 0;
export const kTileSlopeNCornerUp = 0b00000001;
export const kTileSlopeECornerUp = 0b00000010;
export const kTileSlopeSCornerUp = 0b00000100;
export const kTileSlopeWCornerUp = 0b00001000;
export const kTileSlopeRaisedCornersMask = 0b00001111;
export const kTileSlopeDiagonalFlag = 0b00010000;
export const kTileSlopeMask = (kTileSlopeDiagonalFlag | kTileSlopeRaisedCornersMask);

export const kTileSlopeWCornerDown = kTileSlopeRaisedCornersMask & ~kTileSlopeWCornerUp;
export const kTileSlopeSCornerDown = kTileSlopeRaisedCornersMask & ~kTileSlopeSCornerUp;
export const kTileSlopeECornerDown = kTileSlopeRaisedCornersMask & ~kTileSlopeECornerUp;
export const kTileSlopeNCornerDown = kTileSlopeRaisedCornersMask & ~kTileSlopeNCornerUp;

export const kTileSlopeNESideUp = kTileSlopeNCornerUp | kTileSlopeECornerUp;    // 0011
export const kTileSlopeSESideUp = kTileSlopeECornerUp | kTileSlopeSCornerUp;    // 0110
export const kTileSlopeNWSideUp = kTileSlopeNCornerUp | kTileSlopeWCornerUp;    // 1001
export const kTileSlopeSWSideUp = kTileSlopeSCornerUp | kTileSlopeWCornerUp;    // 1100

export const kTileSlopeWEValley = kTileSlopeECornerUp | kTileSlopeWCornerUp;
export const kTileSlopeNSValley = kTileSlopeNCornerUp | kTileSlopeSCornerUp;

