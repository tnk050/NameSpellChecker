type IndexList = {
  key?: number;
  namef: number;
  nom: number;
  prenom: number;
};

type NameList = Map<string, string[]>;
type InputList = Map<number, Names>;
type ResultList = Map<number, SpellCheckResult>;
type ErrorList = Map<number, ErrorMsg>;
type CautionList = Map<string, CautionMsg>;

type Names = {
  myoji: string;
  namae: string;
  nom: string;
  prenom: string;
};

type SpellCheckResult = {
  correctNomUpper: boolean;
  matchedNomSpell: boolean;
  listedNomSpell: boolean;
  correctPreNomUpper: boolean;
  matchedPrenomSpell: boolean;
  listedPrenomSpell: boolean;
};

type CharCheck = (s: string) => boolean;
type CharMatch = (a: string, b: string) => boolean;
type ListMatch = (
  key: string,
  value: string,
  list: Map<string, string[]>
) => boolean;

type CautionMsg = {
  nameJpn: string;
  nameEng: string;
};
type ErrorMsg = CautionMsg & {
  errMsg: string;
};
