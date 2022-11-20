export const getColor = (value: number) => {
  if (value < 10) {
    return "#660000";
  }
  if (value >= 10 && value < 20) {
    return "#ca0000";
  }
  if (value >= 20 && value < 30) {
    return "#ff6600";
  }
  if (value >= 30 && value < 40) {
    return "#ffff01";
  }
  if (value >= 40 && value < 50) {
    return "#ccff00";
  }
  if (value >= 50 && value < 60) {
    return "#00cc33";
  }
  if (value >= 60 && value < 70) {
    return "#008c59";
  }
  if (value >= 70 && value < 80) {
    return "#006699";
  }
  if (value >= 80 && value < 90) {
    return "#0233b2";
  }
  if (value >= 90 && value < 100) {
    return "#000099";
  }
};
