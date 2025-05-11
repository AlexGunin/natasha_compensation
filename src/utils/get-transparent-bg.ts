export const getTransparentBg = (color: string, alpha = 95) =>
  `color-mix(in srgb, ${color}, transparent ${100 - alpha}%)`;
