# ClipCraft Frontend

Frontend-only starter structure for the ClipCraft video editing UI.

## Team ownership

- **Rushikesh** → Application Shell, navigation, header/sidebar, common UI, entry flow
- **Nutan Dhepe** → Editing Workspace, preview, timeline, playback, editing controls, editor states
- **Rupesh** → Responsive/mobile layouts, UI consistency, browser validation and QA

## Tech baseline

HTML5 + CSS3 + JavaScript

Tools: VS Code, Git, GitHub, Browser DevTools

## How to run

Open this folder in VS Code and use a local server (for example, VS Code Live Server).

Main entry:
`index.html`

## Working rule

Each person works mainly inside their own module folder:

- `src/modules/shell/`
- `src/modules/editor/`
- `src/modules/responsive/`

Shared files should be changed carefully and communicated to the team before editing.

## Git branch examples

- `feature/application-shell`
- `feature/editor-workspace`
- `feature/responsive-mobile`
- `feature/ui-quality`

## Integration target

Keep modules loosely coupled so the frontend remains ready for future backend/API integration.
