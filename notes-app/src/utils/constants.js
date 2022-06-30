import { config } from 'react-spring'


// Top bar bg colours
export const SECTIONS_TOPBAR_BG = "#5600ff";
export const NOTES_TOPBAR_BG = "#5600ff";
export const GYMWEIGHTS_TOPBAR_BG = "#0043ff";
export const SETTINGS_TOPBAR_BG = "#2c2c2c";


// Item heights
export const SECTION_ITEM_HEIGHT = "64px";
export const BODYPART_ITEM_HEIGHT = "64px";
export const EXERCISE_ITEM_HEIGHT = "50px";
export const SETTING_ITEM_HEIGHT = "64px";

// Item padding
export const EXERCISE_ITEM_PADDING_L = "8px";


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

export const GYM_WEIGHTS_ANIM = {
  from: { x: 100, opacity: 0 },
  to: { x: 0, opacity: 1 },
  config: config.stiff
}

export const SETTINGS_ANIM = {
  from: { x: 100, opacity: 0 },
  to: { x: 0, opacity: 1 },
  config: config.stiff,
  overflowY: "hidden"
}


// Database constants
export const DEFAULT_DATE_VAL = "CURRENT_TIMESTAMP";
export const DEFAULT_LOCATION_VAL = "\"0 0\"";


// Settings
export const SETTINGS_SAVE_LOCATION = "SETTINGS_SAVE_LOCATION";


// Misc
export const EXPORTS_DIR_NAME = "notes_app_exports";