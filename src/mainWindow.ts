import { absolute, button, Colour, groupbox, label, LayoutDirection, spinner, twoway, window } from "openrct2-flexui";
import { SpriteIds } from "./spriteIds";
import { buttonStraightFreeformPress, buttonStraightMainPress, buttonStraightWidthPress } from "./actions";
import { viewModel } from "./viewModel";
import { infoWindow } from "./infoWindow";

export const mainWindow = window({
    title: "PathBuilder",
    width: 174,
    height: 400,
    colours: [Colour["DarkBrown"], Colour["DarkBrown"]],
    content: [
        groupbox({
            text: "Deafult shortcuts",
            content: [
                label({ //(idea) read current shortcuts
                    height: 55,
                    text: "Level build:{NEWLINE}| CTRL+F | CTRL+G |{NEWLINE}{NEWLINE}{GREY}Slopy build: (future){NEWLINE}|   ????     |"
                }),
            ]
        }),
        

        groupbox({
            text: "Leveled paths",
            content: [
                absolute({
                    width:150,
                    height: 80,
                    content: [
                        button({
                            x: 58,  // 150/2-1/2*34
                            y: 0,
                            width: 34,
                            height: 34,
                            border: true,
                            image: SpriteIds.SPR_CONSTRUCTION_FOOTPATH_LAND,
                            tooltip: "Build leveled",
                            onClick: () => buttonStraightMainPress(),


                        }),
                        button({
                            x: 0,
                            y: 40,
                            width: 46,
                            height: 34,
                            image: SpriteIds.SPR_G2_LAND_TOOL_SIZE_6,
                            border: true,
                            tooltip: "Freeform square",
                            isPressed: viewModel.buttonStraightFreeformPressed,
                            onClick: () => buttonStraightFreeformPress(),
                        }),
                        button({
                            x: 80,
                            y: 45,
                            width: 25,
                            height: 25,
                            image: SpriteIds.SPR_MIRROR_ARROW,
                            border: true,
                            tooltip: "Fixed width",
                            isPressed: viewModel.buttonStraightWidthPressed,
                            onClick: () => buttonStraightWidthPress(),

                        }),
                        spinner({
                            x: 110,
                            y: 48,
                            width: 40,
                            height: 16,
                            minimum: 1,
                            value: twoway(viewModel.spinnerWidthVal),
                            maximum: 9,
                            onChange: () => buttonStraightWidthPress(),
                            tooltip: "Select width"
                        })
                    ]
                }),
            ]
        }),
        
        groupbox({
            text: "Slopy paths",
            content: [
                absolute({
                    width:150,
                    height: 115,
                    content: [
                        button({
                            x: 58,  // 150/2-1/2*34
                            y:0
                            ,width: 34,
                            height: 34,
                            image: SpriteIds.SPR_CONSTRUCTION_FOOTPATH_BRIDGE,
                            tooltip: "(future) Build slopes or copy a terrain",
                            disabled: true
                        })
                    ]
                }),  
            ]
        }),


        groupbox({
            text: "Info & About",
            direction: LayoutDirection.Horizontal,
            content: [
                label({ //(todo) read somewhat version
                    text: "{YELLOW}PathBuilder{NEWLINE}{TOPAZ}v. 0-preview"
                }),
                button({
                    width: 30,
                    height: 28,
                    image: SpriteIds.SPR_TAB_KIOSKS_AND_FACILITIES_0,
                    border: true,
                    onClick: () => infoWindow.open(),
                    tooltip: "About this plugin"
                })
            ]
        })
    ]
})