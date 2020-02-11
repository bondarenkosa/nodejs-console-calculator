import P from './lib/parser';
import getOperations from './operations';

const makeTokenParserByType = (requiredType) => P.token(({ type }) => requiredType === type);

const makeOperatorParser = (opName, opFn) => P.token(({ type, value }) => (
  type === 'operator' && value === opName
))
  .map(() => opFn);

const makeOperatorsParser = (ops) => P.any(
  ops.map((op) => makeOperatorParser(op.operator, op.fn)),
);

const makeUnaryOperationChain = (term, unaryOp) => unaryOp
  .chain((opFn) => term
    .map((x) => opFn(x)));

const makeBinaryOperationChain = (term1, term2, binaryOp) => term1
  .chain((x) => binaryOp
    .chain((opFn) => term2
      .map((y) => opFn(x, y))));

const makeExpressionParser = (initialParser) => {
  const operations = getOperations();

  const sorted = operations.sort((a, b) => {
    if (a.precedence === b.precedence) {
      return 0;
    }
    return a.precedence < b.precedence ? 1 : -1;
  });

  const opsWithParsers = sorted.map((op) => ({ ...op, parser: makeOperatorsParser(op.operators) }));
  const exprParser = opsWithParsers.reduce((acc, { type, parser: opsParser }) => {
    let chain;
    switch (type) {
      case 'unary':
        chain = makeUnaryOperationChain(P.lazy(() => chain), opsParser)
          .or(acc);
        break;
      case 'binary':
        chain = makeBinaryOperationChain(acc, P.lazy(() => chain), opsParser)
          .or(acc);
        break;
      default:
        throw new SyntaxError(`Unexpected operation type: ${type}`);
    }

    return chain;
  }, initialParser);

  return exprParser;
};


const NUM = makeTokenParserByType('number');

const OPAREN = makeTokenParserByType('openParenthesis');

const CPAREN = makeTokenParserByType('closeParenthesis');

const FACTOR = P.any(
  NUM.map(({ value }) => Number(value)),
  // eslint-disable-next-line
  OPAREN.chain(() => P.lazy(() => EXPR)
    .chain((exp) => CPAREN
      .map(() => exp))),
);

const EXPR = makeExpressionParser(FACTOR);

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
