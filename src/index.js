import tokenize from './tokenize';
import parse from './parse';
import calc from './calculate';


const runCalc = () => '';

export default (strWithMathExpression) => {
  const tokens = tokenize(strWithMathExpression);
  const expression = parse(tokens);
  const result = calc(expression);
  console.log(result);
  return result;
};

export { runCalc };
