export type CellColor = string | null;

export interface GridData {
    width: number;
    height: number;
    cells: CellColor[];
}

export interface GridConfig {
    width: number;
    height: number;
}

export const PRESET_COLORS = [
    '#f5c2e7', // Pink
    '#cba6f7', // Mauve
    '#89b4fa', // Blue
    '#94e2d5', // Teal
    '#a6e3a1', // Green
    '#f9e2af', // Yellow
    '#fab387', // Peach
    '#eba0ac', // Maroon
    '#b4befe', // Lavender
]; 