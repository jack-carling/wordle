export const initializeBoard = () => {
  return [...Array(30)].map(() => '');
};

export const initializeKeyboard = () => {
  const keys = 'QWERTYUIOPASDFGHJKL§ZXCVBNM'.split('').map((key) => {
    if (key === '§') return { key: 'ENTER' };
    return { key, evaluation: null };
  });
  keys.push({ key: 'DELETE' });
  return keys;
};
