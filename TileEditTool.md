## Compatibility Note: Keyboard Events
- For OpenRCT2 scripting, keyboard events are handled via `context.input.on('keydown', ...)`.
## Keyboard Editing
- When editing start or end, arrow keys adjust x/y, and Z/X adjust altitude.
- All changes are reflected in the state and UI readout for auditability.
## Compatibility Notes
- Polyfills are used for `Math.sign` and context access to ensure the tool works in all OpenRCT2 scripting environments.
# Tile Edit Tool: Living Documentation

## Purpose
This document tracks the design, implementation, and usage of the advanced tile selection and path-building tool for OpenRCT2-PathBuilder. It is updated as the code evolves.

## Features
- Select start and end tiles for path building.
- Edit start/end after selection (arrow keys for x/y, z for altitude).
- Readout shows if start/end is already a path.
- Option to copy style from start or end.
- One button to auto-build a path between start and end with selected style.

## State Management
- All state is stored in `tileEditStore.ts` for recoverability and debugging.
- UI is in `tileEditWindow.ts`.

## Integration
- The tool is designed to be modular and auditable. All actions update the state store and are reflected in the UI.


## Style Copy Logic
- The UI provides buttons to copy style from the start or end tile.
- When pressed, the tool checks if the selected tile has a path and copies its style to the store.
- The readout is updated to reflect the copy action or if no path is present.


## Auto-Build Path Logic
- The "Auto Build Path" button uses the stored start, end, and style to build a straight path between the two tiles.
- The tool places footpath tiles along the line, using the copied style for each tile.
- The readout is updated to reflect success or missing prerequisites.

## Next Steps
- Integrate with map selection and keyboard events.
- Add error handling and polish UI.

---
_Last updated: 2025-09-13_
