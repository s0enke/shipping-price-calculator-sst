export function getMostInexpensiveRate(weight_g: number, length_cm: number, width_cm: number, height_cm: number) {
  if (weight_g > 10000) {
    return '31.5 kg - Paket';
  }
  if (weight_g > 5000) {
    return '10 kg - Paket';
  }
  if (weight_g > 2000) {
    return '5 kg - Paket';
  }
  if (length_cm > 35 || width_cm > 25 || height_cm > 10) {
    return '2 kg - Päckchen M'
  }
  return '2 kg - Päckchen S';
}