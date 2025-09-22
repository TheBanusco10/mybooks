export const getRgbColorFromOklch = (varName: string) => {
  const rootStyles = getComputedStyle(document.documentElement);
  const oklchValue = rootStyles.getPropertyValue(varName).trim();

  const testDiv = document.createElement("div");
  testDiv.style.color = `oklch(${oklchValue})`;
  document.body.appendChild(testDiv);

  const computedColor = getComputedStyle(testDiv).color;
  document.body.removeChild(testDiv);

  return computedColor;
};
