import { expect, test } from 'vitest';
import { divide, multiply } from '#/supermath/advanced-math.js';

test('multiplies', () => {
  expect(multiply(2, 3)).toBe(6);
});

test('divides', () => {
  expect(divide(6, 3)).toBe(2);
});

test('throws when attempting to divide by zero', () => {
  expect(() => divide(2, 0)).toThrow('nope');
});
