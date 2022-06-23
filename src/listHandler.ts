//prettier-ignore
import { isAllUpper, isInitialUpper, matchConverter, matchNameList,} from './matcher';

export function spellCheck(
  inputList: InputList,
  nameList: NameList = new Map()
): ResultList {
  const resultList = new Map();
  inputList.forEach(({ myoji, namae, nom, prenom }, key) => {
    const correctNomUpper = isAllUpper(nom);
    const matchedNomSpell = matchConverter(myoji, nom);
    const listedNomSpell =
      matchedNomSpell || matchNameList(myoji, nom, nameList);
    const correctPreNomUpper = isInitialUpper(prenom);
    const matchedPrenomSpell = matchConverter(namae, prenom);
    const listedPrenomSpell =
      matchedPrenomSpell || matchNameList(namae, prenom, nameList);
    if (
      !(
        correctNomUpper &&
        listedNomSpell &&
        correctPreNomUpper &&
        listedPrenomSpell
      )
    ) {
      resultList.set(key, {
        correctNomUpper,
        matchedNomSpell,
        listedNomSpell,
        correctPreNomUpper,
        matchedPrenomSpell,
        listedPrenomSpell,
      });
    }
  });
  return resultList;
}

export function createErrorList(
  inputList: InputList,
  resultList: ResultList
): ErrorList {
  const nomUpperError = 'NOMが大文字ではありません';
  const prenomUpperError = 'prenomの大/小文字表記が正しくありません';
  const nomSpellError = '苗字とNOMのつづりが違います';
  const prenomSpellError = '名前とprenomのつづりが違います';
  const errorList = new Map();
  resultList.forEach((result, key) => {
    const {
      correctNomUpper,
      listedNomSpell,
      correctPreNomUpper,
      listedPrenomSpell,
    } = result;
    const errAry = [];
    !correctNomUpper && errAry.push(nomUpperError);
    !correctPreNomUpper && errAry.push(prenomUpperError);
    !listedNomSpell && errAry.push(nomSpellError);
    !listedPrenomSpell && errAry.push(prenomSpellError);
    const errMsg = errAry.join('\n');
    const names = inputList.get(key)!;
    const nameJpn = names.myoji + ' ' + names.namae;
    const nameEng = names.nom + ' ' + names.prenom;
    errorList.set(key, { nameJpn, nameEng, errMsg });
  });
  return errorList;
}

export function createCautionList(
  inputList: InputList,
  resultList: ResultList
): CautionList {
  const cautionList = new Map();
  resultList.forEach((result, key) => {
    const {
      matchedNomSpell,
      listedNomSpell,
      matchedPrenomSpell,
      listedPrenomSpell,
    } = result;
    if (!matchedNomSpell && listedNomSpell) {
      const names = inputList.get(key)!;
      const nameJpn = names.myoji;
      const nameEng = names.nom;
      cautionList.set(key + '苗字', { nameJpn, nameEng });
    }
    if (!matchedPrenomSpell && listedPrenomSpell) {
      const names = inputList.get(key)!;
      const nameJpn = names.namae;
      const nameEng = names.prenom;
      cautionList.set(key + '名前', { nameJpn, nameEng });
    }
  });
  return cautionList;
}
