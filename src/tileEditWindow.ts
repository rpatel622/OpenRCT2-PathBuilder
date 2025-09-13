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
import { button, Colour, groupbox, label, window, dropdown, twoway } from "openrct2-flexui";
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
                    height: 20,
                    text: "Algorithm:"
                }),
                dropdown({
                    height: 25,
                    width: 180,
                    items: ["Straight Line", "Manhattan", "A* (experimental)", "Zigzag (demo)", "Max Straight Edges"],
                    selectedIndex: twoway(tileEditStore.algorithmIndex),
                }),
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
                        const algoIndex = tileEditStore.algorithmIndex.get();
                        const algo = ["Straight Line", "Manhattan", "A* (experimental)", "Zigzag (demo)", "Max Straight Edges"][algoIndex];
                        if (!start || !end || !style) {
                            tileEditStore.readout.set(tileEditStore.readout.get() + "\n[Set start, end, and style first]");
                            return;
                        }
                        // Algorithm selection
                        // All algorithms: robust obstacle dodging
                        // Helper to check if a tile is buildable (not an obstacle)
                        function isBuildable(x: number, y: number): boolean {
                            const tile = getMap().getTile(x, y);
                            // Check for footpath or other obstacles (customize as needed)
                            return !tile.elements.some((e: { type: string }) => e.type === "footpath" || e.type === "ride" || e.type === "scenery");
                        }

                        if (algo === "Straight Line") {
                            // Try straight line, dodge obstacles by sidestepping in y then x if blocked
                            let xStepSL: number = start.x;
                            let yStepSL: number = start.y;
                            const dxSL: number = sign(end.x - start.x);
                            const dySL: number = sign(end.y - start.y);
                            while (xStepSL !== end.x || yStepSL !== end.y) {
                                if (isBuildable(xStepSL, yStepSL)) {
                                    const fPA = { ...style, x: xStepSL, y: yStepSL, z: start.z };
                                    getContext().executeAction("footpathplace", fPA);
                                }
                                // Try to move both, but if blocked, try y then x
                                if (xStepSL !== end.x && isBuildable(xStepSL + dxSL, yStepSL)) xStepSL += dxSL;
                                else if (yStepSL !== end.y && isBuildable(xStepSL, yStepSL + dySL)) yStepSL += dySL;
                                else if (xStepSL !== end.x) xStepSL += dxSL;
                                else if (yStepSL !== end.y) yStepSL += dySL;
                            }
                            // Place last tile
                            if (isBuildable(end.x, end.y)) {
                                const fPA = { ...style, x: end.x, y: end.y, z: end.z };
                                getContext().executeAction("footpathplace", fPA);
                            }
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
                        } else if (algo === "Manhattan") {
                            // Manhattan: x then y, dodge obstacles
                            let xStepM: number = start.x;
                            let yStepM: number = start.y;
                            const dxM: number = sign(end.x - start.x);
                            const dyM: number = sign(end.y - start.y);
                            while (xStepM !== end.x) {
                                if (isBuildable(xStepM, yStepM)) {
                                    const fPA = { ...style, x: xStepM, y: yStepM, z: start.z };
                                    getContext().executeAction("footpathplace", fPA);
                                }
                                if (isBuildable(xStepM + dxM, yStepM)) xStepM += dxM;
                                else break;
                            }
                            while (yStepM !== end.y) {
                                if (isBuildable(xStepM, yStepM)) {
                                    const fPA = { ...style, x: xStepM, y: yStepM, z: start.z };
                                    getContext().executeAction("footpathplace", fPA);
                                }
                                if (isBuildable(xStepM, yStepM + dyM)) yStepM += dyM;
                                else break;
                            }
                            // Place last tile
                            if (isBuildable(end.x, end.y)) {
                                const fPA = { ...style, x: end.x, y: end.y, z: end.z };
                                getContext().executeAction("footpathplace", fPA);
                            }
                            // First x, then y
                            let xStep = start.x;
                            let yStep = start.y;
                            const dx = sign(end.x - start.x);
                            const dy = sign(end.y - start.y);
                            while (xStep !== end.x) {
                                const fPA = { ...style, x: xStep, y: yStep, z: start.z };
                                getContext().executeAction("footpathplace", fPA);
                                xStep += dx;
                            }
                            while (yStep !== end.y) {
                                const fPA = { ...style, x: xStep, y: yStep, z: start.z };
                                getContext().executeAction("footpathplace", fPA);
                                yStep += dy;
                            }
                            // Place last tile
                            const fPA = { ...style, x: end.x, y: end.y, z: end.z };
                            getContext().executeAction("footpathplace", fPA);
                        } else if (algo === "Zigzag (demo)") {
                            // Zigzag, dodge obstacles
                            let xStepZ: number = start.x;
                            let yStepZ: number = start.y;
                            const dxZ: number = sign(end.x - start.x);
                            const dyZ: number = sign(end.y - start.y);
                            let toggleZ: boolean = true;
                            while (xStepZ !== end.x || yStepZ !== end.y) {
                                if (isBuildable(xStepZ, yStepZ)) {
                                    const fPA = { ...style, x: xStepZ, y: yStepZ, z: start.z };
                                    getContext().executeAction("footpathplace", fPA);
                                }
                                if (toggleZ && xStepZ !== end.x && isBuildable(xStepZ + dxZ, yStepZ)) xStepZ += dxZ;
                                else if (!toggleZ && yStepZ !== end.y && isBuildable(xStepZ, yStepZ + dyZ)) yStepZ += dyZ;
                                else if (xStepZ !== end.x) xStepZ += dxZ;
                                else if (yStepZ !== end.y) yStepZ += dyZ;
                                toggleZ = !toggleZ;
                            }
                            if (isBuildable(end.x, end.y)) {
                                const fPA = { ...style, x: end.x, y: end.y, z: end.z };
                                getContext().executeAction("footpathplace", fPA);
                            }
                            // Zigzag between x and y
                            let xStep = start.x;
                            let yStep = start.y;
                            const dx = sign(end.x - start.x);
                            const dy = sign(end.y - start.y);
                            let toggle = true;
                            while (xStep !== end.x || yStep !== end.y) {
                                const fPA = { ...style, x: xStep, y: yStep, z: start.z };
                                getContext().executeAction("footpathplace", fPA);
                                if (toggle && xStep !== end.x) xStep += dx;
                                else if (!toggle && yStep !== end.y) yStep += dy;
                                toggle = !toggle;
                            }
                            // Place last tile
                            const fPA = { ...style, x: end.x, y: end.y, z: end.z };
                            getContext().executeAction("footpathplace", fPA);
                        } else if (algo === "A* (experimental)") {
                            // Placeholder: just place start and end for now
                            getContext().executeAction("footpathplace", { ...style, x: start.x, y: start.y, z: start.z });
                            getContext().executeAction("footpathplace", { ...style, x: end.x, y: end.y, z: end.z });
                        } else if (algo === "Max Straight Edges") {
                            // Maximize straight edges: go x or y all the way, then the other (whichever is longer)
                            let xStepS: number = start.x;
                            let yStepS: number = start.y;
                            const dxS: number = sign(end.x - start.x);
                            const dyS: number = sign(end.y - start.y);
                            if (Math.abs(end.x - start.x) > Math.abs(end.y - start.y)) {
                                // Go x first
                                while (xStepS !== end.x) {
                                    if (isBuildable(xStepS, yStepS)) {
                                        const fPA = { ...style, x: xStepS, y: yStepS, z: start.z };
                                        getContext().executeAction("footpathplace", fPA);
                                    }
                                    if (isBuildable(xStepS + dxS, yStepS)) xStepS += dxS;
                                    else break;
                                }
                                while (yStepS !== end.y) {
                                    if (isBuildable(xStepS, yStepS)) {
                                        const fPA = { ...style, x: xStepS, y: yStepS, z: start.z };
                                        getContext().executeAction("footpathplace", fPA);
                                    }
                                    if (isBuildable(xStepS, yStepS + dyS)) yStepS += dyS;
                                    else break;
                                }
                            } else {
                                // Go y first
                                while (yStepS !== end.y) {
                                    if (isBuildable(xStepS, yStepS)) {
                                        const fPA = { ...style, x: xStepS, y: yStepS, z: start.z };
                                        getContext().executeAction("footpathplace", fPA);
                                    }
                                    if (isBuildable(xStepS, yStepS + dyS)) yStepS += dyS;
                                    else break;
                                }
                                while (xStepS !== end.x) {
                                    if (isBuildable(xStepS, yStepS)) {
                                        const fPA = { ...style, x: xStepS, y: yStepS, z: start.z };
                                        getContext().executeAction("footpathplace", fPA);
                                    }
                                    if (isBuildable(xStepS + dxS, yStepS)) xStepS += dxS;
                                    else break;
                                }
                            }
                            if (isBuildable(end.x, end.y)) {
                                const fPA = { ...style, x: end.x, y: end.y, z: end.z };
                                getContext().executeAction("footpathplace", fPA);
                            }
                        }
                        tileEditStore.readout.set(tileEditStore.readout.get() + `\n[Path built with ${algo}]`);
                    }
                })
            ]
        })
    ]
});
