export const operations = {
  uMinus: {
    operator: '-',
    fn: (num) => -num,
  },
  add: {
    operator: '+',
    fn: (x, y) => x + y,
  },
  sub: {
    operator: '-',
    fn: (x, y) => x - y,
  },
  pow: {
    operator: '**',
    fn: (x, y) => x ** y,
  },
  mult: {
    operator: '*',
    fn: (x, y) => x * y,
  },
  div: {
    operator: '/',
    fn: (x, y) => x / y,
  },
};

export const getSortedOperationsLexemes = () => {
  const operators = Object.keys(operations).map((op) => operations[op].operator);
  return operators.sort((a, b) => b.length - a.length);
};
