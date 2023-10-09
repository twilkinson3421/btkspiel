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

export function getESRB(ESRB: number) {
  switch (ESRB) {
    case 0:
      return 'Early_Childhood';
    case 1:
      return 'Everyone';
    case 2:
      return 'Everyone_10+';
    case 3:
      return 'Teen';
    case 4:
      return 'Mature_17+';
    case 5:
      return 'Adults_Only_18+';
    case 6:
      return 'RP';
    default:
      return 'Unknown';
  }
}
