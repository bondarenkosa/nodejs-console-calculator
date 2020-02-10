import P from './lib/parser';
import { getOperationsByType, getBinaryOperationsByPrecedence } from './operations';

const makeTokenParserByType = (requiredType) => P.token(({ type }) => requiredType === type);

const makeOperatorParser = (opName, opFn) => P.token(({ type, value }) => (
  type === 'operator' && value === opName
))
  .map(() => opFn);

const makeOperationsParser = (ops) => P.any(
  ops.map((op) => makeOperatorParser(op.operator, op.fn)),
);


const NUM = makeTokenParserByType('number');

const OPAREN = makeTokenParserByType('openParenthesis');

const CPAREN = makeTokenParserByType('closeParenthesis');

const UNARY_OPS = makeOperationsParser(getOperationsByType('unary'));

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_Precedence
 *
 * Operator precedence determines how operators are parsed concerning each other.
 * Operators with higher precedence become the operands of operators with lower precedence.
 */
const BINARY_OPS_PR15 = makeOperationsParser(getBinaryOperationsByPrecedence(15));
const BINARY_OPS_PR14 = makeOperationsParser(getBinaryOperationsByPrecedence(14));
const BINARY_OPS_PR13 = makeOperationsParser(getBinaryOperationsByPrecedence(13));

const FACTOR = P.any(
  NUM.map(({ value }) => Number(value)),
  // eslint-disable-next-line
  OPAREN.chain(() => P.lazy(() => EXPR)
    .chain((exp) => CPAREN
      .map(() => (exp)))),
);

const T1 = P.any(
  UNARY_OPS.chain((opFn) => T1
    .map((x) => opFn(x))),

  FACTOR,
);

const T2 = P.any(
  T1.chain((x) => BINARY_OPS_PR15.chain((opFn) => T2
    .map((y) => opFn(x, y)))),

  T1,
);

const T3 = P.any(
  T2.chain((x) => BINARY_OPS_PR14.chain((opFn) => T3
    .map((y) => opFn(x, y)))),

  T2,
);

const EXPR = P.any(
  T3.chain((x) => BINARY_OPS_PR13.chain((opFn) => EXPR
    .map((y) => opFn(x, y)))),

  T3,
);


export default (tokens) => {
  const parsed = EXPR.parse(tokens);

  if (parsed === null) {
    throw new SyntaxError('Invalid math expression');
  }

  const { result, rest } = parsed;

  const hasUnrecognizedTokens = rest.length > 0;
  if (hasUnrecognizedTokens) {
    throw new SyntaxError('Invalid math expression');
  }

  return result;
};
