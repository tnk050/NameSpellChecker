import convertRomanToKana from './converter';

const isAllUpper: CharCheck = (str) => {
  return str === str.toUpperCase();
};

const isInitialUpper: CharCheck = (str) => {
  const initial = str[0];
  const rest = str.slice(1);
  return initial === initial.toUpperCase() && rest === rest.toLowerCase();
};

const matchConverter: CharMatch = (jpn, eng) => {
  const converted = convertRomanToKana(eng);
  return jpn === converted;
};

const matchNameList: ListMatch = (jpn, eng, list) => {
  return list.has(jpn) && list.get(jpn)!.includes(eng);
};

export { isAllUpper, isInitialUpper, matchConverter, matchNameList };
