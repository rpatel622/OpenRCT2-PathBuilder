# OpenRCT2-PathBuilder

An [OpenRCT2](https://github.com/OpenRCT2/OpenRCT2) plugin focusing on building paths. Preview version known as Footpath Erector. (*)

### Building paths natural way, with mouse drag

![PathBuilder-v0 1](https://github.com/user-attachments/assets/ea1fe656-a5cd-4d74-b1f4-4f46ca9c5655)


## Current state and goals of the project

- [x] Dropper style sucking of legacy paths (get style from object already present on map) 
- [ ] (improve: differentiate tool icon when sucking in style/building)
- [x] Dropper for new paths
- [x] Build straight paths with mouse controled tool
- [x] Build freeform leveled rectangles of footpath ~~(todo: gui)~~
- [ ] Build ZigZags for Queueues
- [x] Build paths in continuous slope up or down
- [x] Build path copying terraing and placing "bridegs" ova water
- [ ] Dropper sucking path furnishments (benches, bins...)
- [ ] Build modes above with path furnisments
- [ ] Dropper sucking nearest wall (fence)
- [ ] Build modes above with fence
- [ ] Build walls (feces) alone without path by using above mentioned
- Open to suggestions, collaboration and etc.
- [x] Able to be localised ... (almost forgot!) todo: half done



## Releases
Althought this is early stage, there is first release published (look right and a bit up --->) or [here for v0.1 "Slopy ways"](https://github.com/tygrysek90/OpenRCT2-PathBuilder/releases/tag/v0.1)


## Build from source

### Start by hand
You have to **manualy statisfy** dependency to **`openrct2.d.ts`**, which is not included, as not to clutter the internet wires - you should have it on your system already, just copy or link it to `lib` - next to `put-openrct2.d.ts-here.md` - on systems with gnu command line tools it is of course possible to `$ wget https://raw.githubusercontent.com/OpenRCT2/OpenRCT2/develop/distribution/openrct2.d.ts`

### Finnish by script
(in root directory - where `rollup.config.js` resides)
```
$ npm install
$ npm run build:dev
```

## Internal dependencies 

This plugin uses [Simple OpenRCT2 plugin template with Typescript](https://github.com/Basssiiie/OpenRCT2-Simple-Typescript-Template) by [Basssiiie](https://github.com/Basssiiie). Detailed build instructions to be found in 'typescript-template-README.md'. It also uses [FlexUi](https://github.com/Basssiiie/OpenRCT2-FlexUI) by [Basssiiie](https://github.com/Basssiiie). 

## Contributing, bug reporting etc.

This project considers itself part of OpenRCT2 ecosystem and as such - you are welcome to submit bug reports in issues or collaborate via PRs the way you are used to in OpenRCT2. 

If you are notable/seasoned/experienced OpenRCT2 contributor/dev team member and want to cooperate on this, I (tygrysek90) am willing to add you as collaborator.

___________
(*) Honorably sounding name had to be changed due to lewd innuendos.
