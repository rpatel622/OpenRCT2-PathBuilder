import { label, window } from "openrct2-flexui";

export const infoWindow = window({
    title: "PathBuilder - Info",
    width: 360,
    height: 200,
    position: "center",
    colours: [26, 26],
    content: [
        label({
            height:200,
            text: "{YELLOW}OpenRCT2-PathBuilder{TOPAZ} - v. 0-preview{NEWLINE}{NEWLINE}{WHITE}made 2025 by {BLACK}Ríša Szlachta (tygrysek90){WHITE}{NEWLINE}{NEWLINE}{PALEGOLD}https://github.com/tygrysek90/OpenRCT2-PathBuilder{NEWLINE}(come check for updates){WHITE}{NEWLINE}{NEWLINE}This plugin uses awesome works from {BLACK}Basssiiie{WHITE}:{NEWLINE}OpenRCT2-Simple-Typescript-Template{NEWLINE}OpenRCT2-FlexUI{NEWLINE}OpenRCT2-ProxyPather{NEWLINE}Thanks!{NEWLINE}"
        })
    ]

})