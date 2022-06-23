//prettier-ignore
import { isAllUpper, isInitialUpper, matchConverter, matchNameList,} from '../src/matcher';

test('isAllUpper', () => {
  expect(isAllUpper('UPPER')).toBe(true);
  expect(isAllUpper('Lower')).toBe(false);
});

test('isInitialUpper', () => {
  expect(isInitialUpper('UPPER')).toBe(false);
  expect(isInitialUpper('Lower')).toBe(true);
});

test('matchConverter', () => {
  expect(matchConverter('タナカ', 'tanaka')).toBe(true);
  expect(matchConverter('タナカ', 'teneke')).toBe(false);
});

test('matchNameList', () => {
  const list = new Map([['オオタケ', ['OTAKE']]]);
  expect(matchNameList('オオタケ', 'OOTAKE', list)).toBe(false);
  expect(matchNameList('オオタケ', 'OTAKE', list)).toBe(true);
});
