import tokenize from '../src/tokenize';

describe('#tokenize', () => {
  test('empty', () => {
    expect(tokenize('')).toEqual([]);
  });

  test('simple valid math expression', () => {
    const mathExpression = '1+2';
    const expected = [
      { type: 'number', value: 1 },
      { type: 'operator', value: '+' },
      { type: 'number', value: 2 },
    ];

    expect(tokenize(mathExpression)).toEqual(expected);
  });

  test('math expression with valid tokens', () => {
    const mathExpression = ' - (-5.9 + 2** 2) *10/2- 0';
    const expected = [
      { type: 'operator', value: '-' },
      { type: 'openParenthesis', value: '(' },
      { type: 'operator', value: '-' },
      { type: 'number', value: 5.9 },
      { type: 'operator', value: '+' },
      { type: 'number', value: 2 },
      { type: 'operator', value: '**' },
      { type: 'number', value: 2 },
      { type: 'closeParenthesis', value: ')' },
      { type: 'operator', value: '*' },
      { type: 'number', value: 10 },
      { type: 'operator', value: '/' },
      { type: 'number', value: 2 },
      { type: 'operator', value: '-' },
      { type: 'number', value: 0 },
    ];

    expect(tokenize(mathExpression)).toEqual(expected);
  });

  test('math expression with invalid tokens', () => {
    const mathExpression1 = '(-5.99.10';
    const mathExpression2 = '10 + s';

    expect(() => {
      tokenize(mathExpression1);
    }).toThrow();
    expect(() => {
      tokenize(mathExpression2);
    }).toThrow();
  });
});
