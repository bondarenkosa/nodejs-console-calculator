import P from './lib/parser';
import { getSortedOperationsLexemes } from './operations';

const SPACES = P.many1(P.char(' '));

const OPAREN = P.char('(');

const CPAREN = P.char(')');

const DIGIT = P.anyFromString('0123456789');

const INT = P.many1(DIGIT);

const SEPARATOR = P.char('.');

const FLOAT = P.many1(DIGIT)
  .chain((intPart) => SEPARATOR.chain((sep) => P.many1(DIGIT)
    .map((fractPart) => [...intPart, sep, ...fractPart])));

const NUM = FLOAT.or(INT);

const opsLexs = getSortedOperationsLexemes();
const OP = P.any(opsLexs.map(P.char));

export default (input) => {
  if (input === '') {
    return [];
  }

  const TOKENS = P.any(
    SPACES.map((val) => ({ type: 'space', value: val.join('') })),
    NUM.map((val) => ({ type: 'number', value: val.join('') })),
    OP.map((value) => ({ type: 'operator', value })),
    OPAREN.map((value) => ({ type: 'openParenthesis', value })),
    CPAREN.map((value) => ({ type: 'closeParenthesis', value }))
  );
  const tokenizer = P.many1(TOKENS);
  const parsed = tokenizer.parse(input);

  if (parsed === null) {
    throw new SyntaxError(`Unexpected input: '${input}'`);
  }

  const { result: tokens, rest } = parsed;

  if (rest !== '') {
    const unrecognizedPart = rest.slice(0, 5);
    throw new SyntaxError(`Unexpected value: '${unrecognizedPart}'...`);
  }

  const filtered = tokens.filter(({ type }) => type !== 'space');

  return filtered;
};
