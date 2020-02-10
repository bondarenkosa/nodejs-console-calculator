import tokenize from './tokenize';
import calc from './calculate';
import chalk from 'chalk';
import readlineSync from 'readline-sync';


const runCalc = () => {
  let isRepeat = true;
  while (isRepeat) {
    const expression = readlineSync.question('Enter the expression: ');

    try {
      const result = calc(tokenize(expression));
      console.log(chalk.yellow(`Result: ${result}`));
    } catch(err) {
      console.log(chalk.red(err.message));
    }

    isRepeat = readlineSync.keyInYN('Repeat?');
  }
};

export default (strWithMathExpression) => {
  const tokens = tokenize(strWithMathExpression);
  const result = calc(tokens);
  return result;
};

export { runCalc };
