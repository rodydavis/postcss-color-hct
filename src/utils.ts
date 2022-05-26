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
  const color = Hct.from(Number(h), Number(c), Number(t));
  const hex = hexFromArgb(color.toInt());
  const opacity = values.length > 3 ? values[3] : undefined;
  return hexToRgb(hex, opacity);
}

function hexToRgb(hex: string, opacity?: number): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (result) {
    const { r, g, b } = {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16),
    };
    if (opacity) {
      return `rgba(${r}, ${g}, ${b}, ${opacity})`;
    }
    return `rgb(${r}, ${g}, ${b})`;
  }
  return hex;
}
