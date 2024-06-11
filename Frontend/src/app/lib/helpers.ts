export function convertRemToPixels(rem: number = 1) {
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize);
}


export function simplifyFileName (fileName: string): string {
    fileName = fileName.replaceAll(' ', '-');
    fileName = fileName.toLowerCase();
    fileName = fileName.replace(/[<>:"/\\|?*;,.]/g, '');

    return fileName;
}
