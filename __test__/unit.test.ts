// import { nameList } from '~/maps';
import { indexFromTitle, formatNameList } from '../src/nameHandler';
import { spellCheck } from '../src/listHandler';

test('create title', () => {
  const testData = 'namef,ローマ字NOM（姓）,ローマ字Prenom（名）';
  const input = testData.split(',');
  expect(indexFromTitle(input)).toEqual({ namef: 0, nom: 1, prenom: 2 });
  input.unshift('No');
  expect(indexFromTitle(input)).toEqual({
    key: 0,
    namef: 1,
    nom: 2,
    prenom: 3,
  });
});

test('csv to Map', () => {
  const testData = `namef,ローマ字NOM（姓）,ローマ字Prenom（名）
モリタ ヨシトシ,MORITA,Yositoshi
ソウマ エリ,SOUMA,Eri
`;
  const iter = formatNameList(testData, true).values();
  expect(iter.next().value).toEqual({
    myoji: 'モリタ',
    namae: 'ヨシトシ',
    nom: 'MORITA',
    prenom: 'Yositoshi',
  });
  expect(iter.next().value).toEqual({
    myoji: 'ソウマ',
    namae: 'エリ',
    nom: 'SOUMA',
    prenom: 'Eri',
  });
});

test('spellCheck', () => {
  const testData = new Map([
    //prettier-ignore
    [1, { myoji: 'モリタ', namae: 'ヨシトシ', nom: 'Morita', prenom: 'Yositoshi'},],
    [2, { myoji: 'ソウマ', namae: 'エリ', nom: 'SOUMA', prenom: 'eri' }],
    [
      3,
      {
        myoji: 'フジハラ',
        namae: 'サダヒサ',
        nom: 'FUJUWARA',
        prenom: 'Sadahisa',
      },
    ],
    [4, { myoji: 'タニ', namae: 'ユウカ', nom: 'TANI', prenom: 'Yiika' }],
  ]);
  const iter = spellCheck(testData).values();
  expect(iter.next().value).toEqual({
    correctNomUpper: false,
    matchedNomSpell: true,
    listedNomSpell: true,
    correctPreNomUpper: true,
    matchedPrenomSpell: true,
    listedPrenomSpell: true,
  });
  expect(iter.next().value).toEqual({
    correctNomUpper: true,
    matchedNomSpell: true,
    listedNomSpell: true,
    correctPreNomUpper: false,
    matchedPrenomSpell: true,
    listedPrenomSpell: true,
  });
  expect(iter.next().value).toEqual({
    correctNomUpper: true,
    matchedNomSpell: false,
    listedNomSpell: false,
    correctPreNomUpper: true,
    matchedPrenomSpell: true,
    listedPrenomSpell: true,
  });
  expect(iter.next().value).toEqual({
    correctNomUpper: true,
    matchedNomSpell: true,
    listedNomSpell: true,
    correctPreNomUpper: true,
    matchedPrenomSpell: false,
    listedPrenomSpell: false,
  });
});
