/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
 *
 * Operator precedence determines how operators are parsed concerning each other.
 * Operators with higher precedence become the operands of operators with lower precedence.
 */

const operations = [
  {
    type: 'unary',
    precedence: 17,
    operators: [
      {
        name: 'Unary Negation',
        operator: '-',
        fn: (num) => -num,
      },
    ],
  },
  {
    type: 'binary',
    precedence: 14,
    operators: [
      {
        name: 'Addition',
        operator: '+',
        fn: (x, y) => x + y,
      },
      {
        name: 'Subtraction',
        operator: '-',
        fn: (x, y) => x - y,
      },
    ],
  },
  {
    type: 'binary',
    precedence: 16,
    operators: [
      {
        name: 'Exponentiation',
        operator: '**',
        fn: (x, y) => x ** y,
      },
    ],
  },
  {
    type: 'binary',
    precedence: 15,
    operators: [
      {
        name: 'Multiplication',
        operator: '*',
        fn: (x, y) => x * y,
      },
      {
        name: 'Division',
        operator: '/',
        fn: (x, y) => x / y,
      },
    ],
  },
];

export const getSortedOperationsLexemes = () => operations
  .reduce((acc, { operators }) => [...acc, ...operators], [])
  .map(({ operator }) => operator)
  .sort((a, b) => b.length - a.length);

// export const getOperationsByType = (opType) => operations
//   .filter(({ type }) => type === opType)
//   .map(({ operators }) => operators)
//   .flat();

// export const getBinaryOperationsByPrecedence = (pr) => operations
//   .filter(({ type, precedence }) => type === 'binary' && precedence === pr)
//   .map(({ operators }) => operators)
//   .flat();

// export const getOperationsByPrecedence = (pr) => operations
//   .filter(({ precedence }) => precedence === pr);

export default () => operations;
