// Keyboard event handler for editing start/end tile coordinates
// @ts-ignore
function handleTileEditKey(e) {
    const editing = tileEditStore.editing.get();
    if (!editing) return;
    const coord = tileEditStore[editing].get();
    if (!coord) return;
    let changed = false;
    switch (e.key) {
        case 'ArrowUp': coord.y -= 1; changed = true; break;
        case 'ArrowDown': coord.y += 1; changed = true; break;
        case 'ArrowLeft': coord.x -= 1; changed = true; break;
        case 'ArrowRight': coord.x += 1; changed = true; break;
        case 'z': case 'Z': coord.z += 1; changed = true; break;
        case 'x': case 'X': coord.z -= 1; changed = true; break;
    }
    if (changed) {
        tileEditStore[editing].set({ ...coord });
        updateTileReadout(getMap());
    }
}

// Register keyboard event listener when window is open
// Register keyboard event listener for OpenRCT2 scripting
const ctx = getContext();
if (ctx && ctx.input && ctx.input.on) {
    ctx.input.on('keydown', handleTileEditKey);
}
// Polyfill for Math.sign for compatibility
function sign(x: number): number {
    return x > 0 ? 1 : x < 0 ? -1 : 0;
}

// Helper to get context object
function getContext() {
    // @ts-ignore
    return typeof context !== 'undefined' ? context : globalThis.context;
}
import { button, Colour, groupbox, label, window } from "openrct2-flexui";
import { tileEditStore, updateTileReadout } from "./tileEditStore";
// Helper to get the map object (OpenRCT2 provides it globally)
function getMap() {
    // @ts-ignore
    return typeof map !== 'undefined' ? map : context.map;
}
import { getPathProperties } from "./getPathProperties";

/**
 * tileEditWindow provides the UI for selecting/editing start/end tiles, copying style, and building the path.
 * All actions update tileEditStore for full auditability.
 */
export const tileEditWindow = window({
    title: "Tile Path Tool",
    width: 200,
    height: 180,
    colours: [Colour["DarkBrown"], Colour["DarkBrown"]],
    content: [
        groupbox({
            text: "Tile Selection",
            content: [
                label({
                    height: 40,
                    text: tileEditStore.readout
                }),
                button({
                    width: 90, height: 25,
                    text: "Select Start",
                    onClick: () => tileEditStore.editing.set("start")
                }),
                button({
                    width: 90, height: 25,
                    text: "Select End",
                    onClick: () => tileEditStore.editing.set("end")
                }),
                button({
                    width: 90, height: 25,
                    text: "Copy Style from Start",
                    onClick: () => {
                        const start = tileEditStore.start.get();
                        if (start) {
                            const tile = getMap().getTile(start.x, start.y);
                            const style = getPathProperties(tile);
                            if (style) {
                                tileEditStore.style.set(style);
                                tileEditStore.readout.set(tileEditStore.readout.get() + "\n[Style copied from Start]");
                            } else {
                                tileEditStore.readout.set(tileEditStore.readout.get() + "\n[No path at Start]");
                            }
                        }
                    }
                }),
                button({
                    width: 90, height: 25,
                    text: "Copy Style from End",
                    onClick: () => {
                        const end = tileEditStore.end.get();
                        if (end) {
                            const tile = getMap().getTile(end.x, end.y);
                            const style = getPathProperties(tile);
                            if (style) {
                                tileEditStore.style.set(style);
                                tileEditStore.readout.set(tileEditStore.readout.get() + "\n[Style copied from End]");
                            } else {
                                tileEditStore.readout.set(tileEditStore.readout.get() + "\n[No path at End]");
                            }
                        }
                    }
                }),
                button({
                    width: 190, height: 30,
                    text: "Auto Build Path",
                    onClick: () => {
                        const start = tileEditStore.start.get();
                        const end = tileEditStore.end.get();
                        const style = tileEditStore.style.get();
                        if (!start || !end || !style) {
                            tileEditStore.readout.set(tileEditStore.readout.get() + "\n[Set start, end, and style first]");
                            return;
                        }
                        // Build a straight path between start and end using the copied style
                        let xStep = start.x;
                        let yStep = start.y;
                        const dx = sign(end.x - start.x);
                        const dy = sign(end.y - start.y);
                        while (xStep !== end.x || yStep !== end.y) {
                            const fPA = { ...style, x: xStep, y: yStep, z: start.z };
                            getContext().executeAction("footpathplace", fPA);
                            if (xStep !== end.x) xStep += dx;
                            if (yStep !== end.y) yStep += dy;
                        }
                        // Place last tile
                        const fPA = { ...style, x: end.x, y: end.y, z: end.z };
                        getContext().executeAction("footpathplace", fPA);
                        tileEditStore.readout.set(tileEditStore.readout.get() + "\n[Path built]");
                    }
                })
            ]
        })
    ]
});
