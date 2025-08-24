import { absolute, button, Colour, groupbox, label, LayoutDirection, spinner, twoway, window } from "openrct2-flexui";
import { SpriteIds } from "./spriteIds";
import { buttonStraightFreeformPress, buttonStraightMainPress, buttonStraightWidthPress, buttonUpDownPress } from "./actions";
import { viewModel } from "./viewModel";
import { infoWindow } from "./infoWindow";
import { bFreeformSqTooltip, bLeveledTooltip, currentLanguage, defaultKeysLabel, fixedWidthTip, leveledPathsGroupBoxText, selectWidthTip } from "./localisation";



/**
 * Main window user interface
 */
export const mainWindow = window({
    title: "PathBuilder",
    width: 174,
    height: 400,
    colours: [Colour["DarkBrown"], Colour["DarkBrown"]],
    content: [
        groupbox({
            text: defaultKeysLabel.get(currentLanguage),
            content: [
                label({ //(idea) read current shortcuts
                    height: 55,
                    text: "Level build:{NEWLINE}| CTRL+F | CTRL+G |{NEWLINE}{NEWLINE}Sloped build: {NEWLINE}|  ALT+F  |"
                }),
            ]
        }),
        

        groupbox({
            text: leveledPathsGroupBoxText.get(currentLanguage),
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
                            border: false,
                            disabled: viewModel.groupLeveled.buttonMainDisabled,
                            image: SpriteIds.SPR_CONSTRUCTION_FOOTPATH_LAND,
                            tooltip: bLeveledTooltip.get(currentLanguage),
                            onClick: () => buttonStraightMainPress(),


                        }),
                        button({
                            x: 0,
                            y: 40,
                            width: 46,
                            height: 34,
                            image: SpriteIds.SPR_G2_LAND_TOOL_SIZE_6,
                            border: false,
                            tooltip: bFreeformSqTooltip.get(currentLanguage),
                            isPressed: viewModel.groupLeveled.buttonFreeformPressed,
                            onClick: () => buttonStraightFreeformPress(),
                        }),
                        button({
                            x: 80,
                            y: 45,
                            width: 25,
                            height: 25,
                            image: SpriteIds.SPR_MIRROR_ARROW,
                            border: false,
                            tooltip: fixedWidthTip.get(currentLanguage),
                            isPressed: viewModel.groupLeveled.buttonWidthPressed,
                            onClick: () => buttonStraightWidthPress(),

                        }),
                        spinner({
                            x: 110,
                            y: 48,
                            width: 40,
                            height: 16,
                            minimum: 1,
                            value: twoway(viewModel.groupLeveled.spinnerWidthVal),
                            maximum: 9,
                            onChange: () => buttonStraightWidthPress(),
                            tooltip: selectWidthTip.get(currentLanguage)
                        })
                    ]
                }),
            ]
        }),
        
        groupbox({
            text: "Sloped paths",
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
                            border: false,
                            disabled: viewModel.groupUpDown.buttonMainDisabled,
                            image: SpriteIds.SPR_CONSTRUCTION_FOOTPATH_BRIDGE,
                            tooltip: "Build sloped paths",
                            isPressed: viewModel.groupUpDown.buttonMainPressed,
                            onClick: () => buttonUpDownPress()
                        }),
                        button({
                            x: 0,
                            y: 40,
                            width: 30,
                            height: 34,
                            image: SpriteIds.SPR_G2_MAP_GEN_TERRAIN_TAB,
                            border: false,
                            tooltip: "Copy terrain",
                            isPressed: viewModel.groupUpDown.buttonCopyTerrainPressed,
                            onClick: () => buttonUpDownPress(),
                        }),
                    ]
                }),  
            ]
        }),


        groupbox({
            text: "Info & About",
            direction: LayoutDirection.Horizontal,
            content: [
                label({ //(todo) read somewhat version
                    text: "{YELLOW}PathBuilder{NEWLINE}{TOPAZ}v. 0.1"
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