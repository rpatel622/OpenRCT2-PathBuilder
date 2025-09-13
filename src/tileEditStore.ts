import { store } from "openrct2-flexui";
import { getPathProperties } from "./getPathProperties";
import { MapSelection } from "./mapSelection";

export interface TileCoord {
    x: number;
    y: number;
    z: number;
}

export const tileEditStore = {
    start: store<TileCoord|null>(null),
    end: store<TileCoord|null>(null),
    editing: store<"start"|"end"|null>(null),
    style: store<any|null>(null),
    canBuild: store<boolean>(false),
    readout: store<string>("")
};

export function updateTileReadout() {
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
