import { config } from 'react-spring'


// Top bar bg colours
export const SECTIONS_TOPBAR_BG = "#5600ff";
export const NOTES_TOPBAR_BG = "#5600ff";


export const SECTION_ITEM_HEIGHT = "64px";


// Note priority background colours.
export const NOTE_PRIO_BG_COLS = {
  0: "#7aff8e",
  1: "#f9ffa1"
}

// Note priority icon colours.
export const NOTE_PRIO_ICON_COLS = {
  0: "#3ad83a",
  1: "#ffcc23"
}


// Animations
export const SECTIONS_ANIM = {
  from: { x: -100, opacity: 0 },
  to: { x: 0, opacity: 1 },
  config: config.stiff
}

export const NOTES_ANIM = {
  from: { x: 100, opacity: 0 },
  to: { x: 0, opacity: 1 },
  config: config.stiff
}


export const EXPORTS_DIR_NAME = "notes_app_exports";