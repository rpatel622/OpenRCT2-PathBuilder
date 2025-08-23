# OpenRCT2-PathBuilder

An [OpenRCT2](https://github.com/OpenRCT2/OpenRCT2) plugin focusing on building paths. Preview version known as Footpath Erector. (*)

### Building paths natural way, with mouse drag.

![gif video of early version working](https://github.com/user-attachments/assets/feaa1567-02c3-4b36-adf2-ee13263bb673)

## Current state and goals of the project

- [x] Dropper style sucking of legacy paths (get style from object already present on map) (improve: differentiate tool icon when sucking in style/building)
- [ ] Dropper for new paths
- [x] Build straight paths with mouse controled tool
- [ ] Build freeform leveled rectangles of footpath (todo: gui)
- [ ] Build ZigZags for Queueues
- [ ] Build paths in continuous slope up or down
- [ ] Build path copying terraing and placing "bridegs" ova water
- [ ] Dropper sucking path furnishments (benches, bins...)
- [ ] Build modes above with path furnisments
- [ ] Dropper sucking nearest wall (fence)
- [ ] Build modes above with fence
- [ ] Build walls (feces) alone without path by using above mentioned
- Open to suggestions, collaboration and etc.

## Building from source

Since this is early stage, no releases yet, you have to build from source for yourself.

It should be as easy as:

```
$ npm install
$ npm install openrct2-flexui@next
$ npm run build:dev
```

This plugin uses [Simple OpenRCT2 plugin template with Typescript](https://github.com/Basssiiie/OpenRCT2-Simple-Typescript-Template) by [Basssiiie](https://github.com/Basssiiie). Detailed build instructions to be found in 'typescript-template-README.md'. It also uses [FlexUi](https://github.com/Basssiiie/OpenRCT2-FlexUI) by [Basssiiie](https://github.com/Basssiiie). It is not noted in build instructions that you need FlexUi (TODO, include FlexUi in install script)

## Contributing, bug reporting etc.

This project considers itself part of OpenRCT2 ecosystem and as such - you are welcome to submit bug reports in issues or collaborate via PRs the way you are used to in OpenRCT2. 

If you are notable/seasoned/experienced OpenRCT2 contributor/dev team member and want to cooperate on this, I (tygrysek90) am willing to add you as collaborator.

___________
(*) Honorably sounding name had to be changed due to lewd innuendos.
