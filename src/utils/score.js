export const getPoints = (row) => {
  switch (row) {
    case 1:
      return 100;
    case 2:
      return 80;
    case 3:
      return 60;
    case 4:
      return 40;
    case 5:
      return 20;
    case 6:
      return 0;
    default:
      return null;
  }
};
