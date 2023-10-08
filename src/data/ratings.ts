export function getPEGI(ESRB: number) {
  switch (ESRB) {
    case 0:
      return '3';
    case 1:
      return '7';
    case 2:
      return '12';
    case 3:
      return '16';
    case 4:
      return '18';
    case 5:
      return '18';
    default:
      return 'Unknown';
  }
}
