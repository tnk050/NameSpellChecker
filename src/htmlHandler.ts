import { nameList } from './maps';
import { formatNameList } from './nameHandler';
import { spellCheck, createErrorList, createCautionList } from './listHandler';

// @ts-ignore TS6133: 'doGet' is declared but its value is never read.
function doGet() {
  const page = HtmlService.createTemplateFromFile('form');
  page.url = ScriptApp.getService().getUrl();
  return page.evaluate();
}

// @ts-ignore TS6133: 'doPost' is declared but its value is never read.
function doPost(e: GoogleAppsScript.Events.DoPost) {
  const param = e.parameter;
  const showCaution = param['show-caution'] === 'on';
  const includeTitle = param['include-title'] === 'on';
  const inputCsv = param.input.replaceAll('\t', ',');
  const inputList = formatNameList(inputCsv, includeTitle);
  const resultList = spellCheck(inputList, nameList);
  const errorList = createErrorList(inputList, resultList);
  const page = HtmlService.createTemplateFromFile('result');
  page.errorList = errorList;
  if (showCaution) {
    const cautionList = createCautionList(inputList, resultList);
    page.cautionList = cautionList;
  }
  return page.evaluate();
}
