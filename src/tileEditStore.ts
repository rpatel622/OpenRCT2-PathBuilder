import { store } from "openrct2-flexui";
import { getPathProperties } from "./getPathProperties";

/**
 * TileCoord represents a tile's x, y, z (altitude) in map units.
 */
export interface TileCoord {
    x: number;
    y: number;
    z: number;
}

/**
 * tileEditStore holds all state for the start/end tile selection, editing, style, and UI readout.
 * This enables recoverability and easy debugging.
 */
export const tileEditStore = {
    start: store<TileCoord|null>(null),
    end: store<TileCoord|null>(null),
    editing: store<"start"|"end"|null>(null),
    style: store<any|null>(null),
    canBuild: store<boolean>(false),
    readout: store<string>(""),
    algorithmIndex: store<number>(0), // 0: Straight Line, 1: Manhattan, 2: A*, 3: Zigzag, 4: Max Straight Edges
};

/**
 * Updates the readout string to show current start/end and if they are paths.
 * Call this after any change to start/end.
 */
export function updateTileReadout(map: Map): void {
    const start = tileEditStore.start.get();
    const end = tileEditStore.end.get();
    let readout = "";
    if (start) {
        const tile = map.getTile(start.x, start.y);
        const isPath = getPathProperties(tile) != null;
        readout += `Start: (${start.x},${start.y},${start.z}) ${isPath ? "[PATH]" : "[NO PATH]"}`;
    } else {
        readout += "Start: (not set)";
    }
    readout += "\n";
    if (end) {
        const tile = map.getTile(end.x, end.y);
        const isPath = getPathProperties(tile) != null;
        readout += `End:   (${end.x},${end.y},${end.z}) ${isPath ? "[PATH]" : "[NO PATH]"}`;
    } else {
        readout += "End:   (not set)";
    }
    tileEditStore.readout.set(readout);
}
