import calc from '../src';

describe('#tokenize', () => {
  test('simple math expression', () => {
    const expression = '1+2';

    expect(calc(expression)).toEqual(3);
  });

  test('priority test', () => {
    const expression = ' 2.5  + (1 + ---1 + 4) * 3 ** 2 * 2 / (2 + 4)**2 + 1 - 1';

    expect(calc(expression)).toEqual(4.5);
  });

  test('invalid math expression', () => {
    const mathExpression1 = '(-5.99 + 1';
    const mathExpression2 = '10 + 3 /*1';

    expect(() => {
      calc(mathExpression1);
    }).toThrow();
    expect(() => {
      calc(mathExpression2);
    }).toThrow();
  });
});
