import { stringLocalisabe } from "./stringLocalisabe";

export var currentLanguage:string = context.configuration.get("general.language") ?? 'en-GB'
// todo-low hook this to something to get change on language change run-time

export const defaultKeysLabel = new stringLocalisabe("Deafult keys")
defaultKeysLabel.cs_CZ = "Výchozí zkratky"
defaultKeysLabel.pl_PL = "Pomyślne skróty"

export const leveledPathsGroupBoxText = new stringLocalisabe("Leveled Paths")
leveledPathsGroupBoxText.cs_CZ = "Rovné cesty"
leveledPathsGroupBoxText.pl_PL = "Chodniki"

export const bLeveledTooltip = new stringLocalisabe("Build leveled")
bLeveledTooltip.cs_CZ = "Stavět v rovině"
bLeveledTooltip.pl_PL = "Tryb budowlany poziomowy"

export const bFreeformSqTooltip = new stringLocalisabe("Freeform square")
bFreeformSqTooltip.cs_CZ = "Libovolný obdelník"

export const bldgMustOriginFromExistingFootpath = 
                      new stringLocalisabe("Building area must originate from existing footpath")
bldgMustOriginFromExistingFootpath.cs_CZ = "Prostor pro stavbu musí být vyznačen od už stojícího chodníku"
bldgMustOriginFromExistingFootpath.pl_PL = "Od chodnika prosze zaczancz"