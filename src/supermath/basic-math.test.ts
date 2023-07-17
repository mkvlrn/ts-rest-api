import { expect, test } from 'vitest';
import { subtract, sum } from '#/supermath/basic-math.js';

test('sums', () => {
  expect(sum(2, 2)).toBe(4);
});

test('subtracts', () => {
  expect(subtract(70, 1)).toBe(69);
});
