import tokenize from './tokenize';
import calc from './calculate';


const runCalc = () => '';

export default (strWithMathExpression) => {
  const tokens = tokenize(strWithMathExpression);
  const result = calc(tokens);
  return result;
};

export { runCalc };
