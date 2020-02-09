import P from './lib/parser';
import { getSortedOperationsLexemes } from './operations';

const SPACES = P.many1(P.char(' '))
  .map((val) => ({ type: 'space', value: val.join('') }));

const OPAREN = P.char('(')
  .map((value) => ({ type: 'openParenthesis', value }));

const CPAREN = P.char(')')
  .map((value) => ({ type: 'closeParenthesis', value }));

const DIGIT = P.anyFromString('0123456789');

const INT = P.many1(DIGIT)
  .map((nums) => Number(nums.join('')));

const SEPARATOR = P.char('.');

const FLOAT = P.many1(DIGIT)
  .chain((intPart) => SEPARATOR.chain((sep) => P.many1(DIGIT)
    .map((fractPart) => Number([...intPart, sep, ...fractPart].join('')))));

const NUM = FLOAT.or(INT)
  .map((value) => ({ type: 'number', value }));

const opsLexs = getSortedOperationsLexemes();
const OP = P.any(opsLexs.map(P.char))
  .map((value) => ({ type: 'operator', value }));

export default (input) => {
  if (input === '') {
    return [];
  }

  const TOKENS = P.any(SPACES, NUM, OP, OPAREN, CPAREN);
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
