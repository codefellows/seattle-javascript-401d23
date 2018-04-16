'use strict';

describe('Showcasing TDD with Jest', () => {
  test('Different ways to use the expect function', () => {
    const aNumber = 5;
    expect(aNumber).toEqual(5);

    const aNullValue = null;
    expect(aNullValue).toBeNull();

    const fifty = 50;
    expect(fifty).toBeLessThan(100);
    expect(fifty).toBeGreaterThan(25);
  });
  test('Showcasing how to add another test', () => {
    const aTruthyValue = 'hi';
    expect(aTruthyValue).toBeTruthy();

    const aFalsyValue = 0;
    expect(aFalsyValue).toBeFalsy();
    expect(aFalsyValue).not.toBeTruthy();
  });
});
