# Team Workflow

## 1. Before coding
Pull the latest project changes and work on your assigned branch.

## 2. Module ownership

### Rushikesh
Path: `src/modules/shell/`
Focus:
- application shell
- header
- sidebar/navigation
- common UI
- entry/upload screen

### Nutan Dhepe
Path: `src/modules/editor/`
Focus:
- editor workspace
- video preview
- timeline
- playback
- editing controls
- processing/error states

### Rupesh
Path: `src/modules/responsive/`
Focus:
- desktop/tablet/mobile adaptation
- responsive controls
- spacing/sizing
- browser validation
- UI quality checklist

## 3. Shared code
Shared components and utilities are under:
`src/modules/shared/`

Do not make breaking changes to shared code without informing the team.

## 4. Integration
Feature branch → commits → review → integration → baseline.

## 5. Scope
Frontend only. Do not add backend or video-processing engine code to this repository.
