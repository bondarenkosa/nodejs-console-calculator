import runCalc from '../src';

test('run calc', () => {
  const expected = 'hello';
  expect(runCalc()).toEqual(expected);
});
