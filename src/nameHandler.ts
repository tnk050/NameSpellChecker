export function formatNameList(
  input: string,
  includeTitle: boolean = false
): Map<number, Names> {
  const inputAry = input.split('\n').map((item) => item.split(','));
  if (!Array.isArray(inputAry)) throw new Error('input is empty');
  const indexList = includeTitle
    ? indexFromTitle(inputAry.shift()!)
    : { namef: 0, nom: 1, prenom: 2 };
  const nameList = new Map();
  inputAry.forEach((row, index) => {
    const nom = row[indexList.nom];
    const prenom = row[indexList.prenom];
    const namef = row[indexList.namef];
    const [myoji, namae] = namef.replace('　', ' ').split(' ');
    const key = indexList.key ? parseInt(row[indexList.key], 10) : index + 1;
    nameList.set(key, { myoji, namae, nom, prenom });
  });
  return nameList;
}

export function indexFromTitle(title: string[]): IndexList {
  const namef = title.findIndex(
    (item) => item.includes('namef') || item.includes('フリガナ')
  );
  const nom = title.findIndex(
    (item) => item.includes('NOM') || item.includes('性')
  );
  const prenom = title.findIndex(
    (item) => item.includes('prenom') || item.includes('名')
  );
  if (namef === -1 || nom === -1 || prenom === -1)
    throw new Error("can't find title");
  const response = { namef, nom, prenom };
  const key = title.findIndex((item) => /No\b|no\b|sid\b/.test(item));
  key !== -1 &&
    Object.defineProperty(response, 'key', { value: key, enumerable: true });
  return response;
}
