// Function to calculate relative luminance
function getLuminance(r: number, g: number, b: number) {
  const normalize = (c: number) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };

  const R = normalize(r);
  const G = normalize(g);
  const B = normalize(b);

  return 0.2126 * R + 0.7152 * G + 0.0722 * B;
}

// Function to calculate contrast ratio
function getContrast(
  color1: [number, number, number],
  color2: [number, number, number]
) {
  const lum1 = getLuminance(color1[0], color1[1], color1[2]);
  const lum2 = getLuminance(color2[0], color2[1], color2[2]);

  return lum1 > lum2
    ? (lum1 + 0.05) / (lum2 + 0.05)
    : (lum2 + 0.05) / (lum1 + 0.05);
}

// Main function to find the most contrasting color
export function findMostContrastingColor(
  colors: [number, number, number][],
  targetColor: [number, number, number]
) {
  let maxContrast = -1;
  let mostContrastingColor = null;

  for (const color of colors) {
    const contrast = getContrast(color, targetColor);
    if (contrast > maxContrast) {
      maxContrast = contrast;
      mostContrastingColor = color;
    }
  }

  return mostContrastingColor;
}

export function getProjectSearchName(title: string) {
  return title
    .replace(/[^a-zA-Z0-9\s]/g, "") // Strip all non-alphanumeric characters except spaces
    .trim() // Remove leading/trailing whitespace
    .replace(/\s+/g, " ") // Replace multiple spaces with single space
    .replace(/\s/g, "-") // Replace spaces with dashes
    .toLowerCase(); // Convert to lowercase
}
