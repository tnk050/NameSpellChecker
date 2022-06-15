import convertRomanToKana from './converter';
import { nomList, prenomList } from './maps';

function isAllUpper(str: string): boolean {
  return str === str.toUpperCase();
}

function isInitialUpper(str: string): boolean {
  const initial = str[0];
  const rest = str.slice(1);
  return initial === initial.toUpperCase() && rest === rest.toLowerCase();
}

function matchConverter(jpn: string, eng: string): boolean {
  const converted = convertRomanToKana(eng);
  return jpn === converted;
}

function matchNameList(
  jpn: string,
  eng: string,
  list: Map<string, string[]>
): boolean {
  return list.has(jpn) && list.get(jpn)!.includes(eng);
}
