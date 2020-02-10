export const operations = {
  uMinus: {
    type: 'unary',
    precedence: 16,
    operator: '-',
    fn: (num) => -num,
  },
  add: {
    type: 'binary',
    precedence: 13,
    operator: '+',
    fn: (x, y) => x + y,
  },
  sub: {
    type: 'binary',
    precedence: 13,
    operator: '-',
    fn: (x, y) => x - y,
  },
  pow: {
    type: 'binary',
    precedence: 15,
    operator: '**',
    fn: (x, y) => x ** y,
  },
  mult: {
    type: 'binary',
    precedence: 14,
    operator: '*',
    fn: (x, y) => x * y,
  },
  div: {
    type: 'binary',
    precedence: 14,
    operator: '/',
    fn: (x, y) => x / y,
  },
};

export const getSortedOperationsLexemes = () => Object.keys(operations)
  .map((op) => operations[op].operator)
  .sort((a, b) => b.length - a.length);

export const getOperationsByType = (type) => Object.keys(operations)
  .filter((op) => operations[op].type === type)
  .map((op) => operations[op]);

export const getBinaryOperationsByPrecedence = (pr) => getOperationsByType('binary')
  .filter(({ precedence }) => precedence === pr);
