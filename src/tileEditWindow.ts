import { absolute, button, Colour, groupbox, label, LayoutDirection, spinner, twoway, window } from "openrct2-flexui";
import { tileEditStore, updateTileReadout } from "./tileEditStore";

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
                    text: twoway(tileEditStore.readout)
                }),
                button({
                    x: 0, y: 45, width: 90, height: 25,
                    text: "Select Start",
                    onClick: () => tileEditStore.editing.set("start")
                }),
                button({
                    x: 100, y: 45, width: 90, height: 25,
                    text: "Select End",
                    onClick: () => tileEditStore.editing.set("end")
                }),
                button({
                    x: 0, y: 75, width: 90, height: 25,
                    text: "Copy Style from Start",
                    onClick: () => {/* logic to copy style from start */}
                }),
                button({
                    x: 100, y: 75, width: 90, height: 25,
                    text: "Copy Style from End",
                    onClick: () => {/* logic to copy style from end */}
                }),
                button({
                    x: 0, y: 110, width: 190, height: 30,
                    text: "Auto Build Path",
                    isPressed: twoway(tileEditStore.canBuild),
                    onClick: () => {/* logic to build path */}
                })
            ]
        })
    ]
});
