import calc from '../src';

test('simple math expression', () => {
  const expression = '1+2';

  expect(calc(expression)).toEqual(3);
});
