import { Hct, hexFromArgb } from "@material/material-color-utilities";

export function getColor(values: any[]): string {
  if (values === undefined || values.length === 0) {
    throw "HCT values are undefined";
  }
  if (values.some(isNaN)) {
    throw "HCT values are not numbers";
  }
  const [h, c, t] = values;
  if (isNaN(+h) || isNaN(+c) || isNaN(+t)) {
    throw 'Unable to parse HCT color: "' + values.join(",") + '"';
  }
  const hex = hctToHex(h, c, t);
  const opacity = values.length > 3 ? values[3] : undefined;
  return rgbToString(hexToRgb(hex), opacity);
}

type ColorValue = string | number;

export function hctToHex(h: ColorValue, c: ColorValue, t: ColorValue) {
  const color = Hct.from(Number(h), Number(c), Number(t));
  const hex = hexFromArgb(color.toInt());
  return hex;
}

export function hexToRgb(hex: string): number[] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  const { r, g, b } = {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
  };
  return [r, g, b]
}

function rgbToString(rgb: number[], opacity?: number): string {
  const [r, g, b] = rgb;
  if (opacity) {
    return `rgb(${r} ${g} ${b} / ${opacity})`;
  } else {
    return `rgb(${r} ${g} ${b})`;
  }
}