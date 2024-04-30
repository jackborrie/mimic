export function convertRemToPixels(rem: number = 1) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}
