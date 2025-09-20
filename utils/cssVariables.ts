import Color from "colorjs.io";

export const getRgbColorFromOklch = (varName: string) => {
  const rootStyles = getComputedStyle(document.documentElement);
  const oklchValue = rootStyles.getPropertyValue(varName).trim();

  const color = new Color(`oklch(${oklchValue})`);

  const rgb = color.to("srgb").toString();

  return rgb;
};
