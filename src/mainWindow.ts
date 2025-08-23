import { absolute, button, label, window } from "openrct2-flexui";
import { viewModel } from "./viewModel";
import { SpriteIds } from "./spriteIds";

export const mainWindow = window({
    title: "PathBuilder",
    width: 156,
    height: 400,
    content: [
        label({ //(todo) read somewhat version
            text: "PathBuilder | v. 0-preview"
        }),
        label({ //(idea) read current shortcuts
            height: 30,
            text: "Default shortcuts: {NEWLINE}CTRL+F CTR+G"
        }),

        absolute({
            width:150,
            height: 120,
            content: [
                button({
                    x: 58,  // 150/2-1/2*34
                    y: 0,
                    width: 34,
                    height: 34,
                    image: SpriteIds.SPR_CONSTRUCTION_FOOTPATH_LAND,
                    tooltip: "Build leveled",
                    onClick() {
                        viewModel.buildType = "straight"
                        viewModel.activate()
                    },

                }),
                button({
                    x: 0,
                    y: 40,
                    width: 46,
                    height: 34,
                    image: SpriteIds.SPR_G2_LAND_TOOL_SIZE_6,
                    tooltip: "Freeform square",
                    onClick() {
                        
                    },

                })
            ]
        }),


        absolute({
            width:150,
            height: 120,
            content: [
                button({
                    x: 58,  // 150/2-1/2*34
                    y:0
                    ,width: 34,
                    height: 34,
                    image: SpriteIds.SPR_CONSTRUCTION_FOOTPATH_BRIDGE,
                    tooltip: "Build slopes or copy a terrain",
                    onClick() {
                        viewModel.buildType = "up-down"
                        viewModel.activate()
                    }
                })
            ]
        })
    ]
})