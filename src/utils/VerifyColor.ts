export class VerifyColor {
    public static color(hex: string): string {
        const r = parseInt(hex[1]+hex[2],16);
        const g = parseInt(hex[3]+hex[4],16);
        const b = parseInt(hex[5]+hex[6],16);

        const luminosity = ( r * 299 + g * 587 + b * 114) / 1000;

        return  luminosity >= 127.5 ? '#000000': '#FFFFFF';
    }
}