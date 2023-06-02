import { getBalanceString } from '../types/UserTypes';

interface NumberDeclinedNounData {
  nominativeSingular: string;
  nominativePlural: string;
  genitivePlural: string;
}

export enum NumberDeclinedNoun {
  View,
  Subscription,
  Eurogombka,
}

const numerals: Record<NumberDeclinedNoun, NumberDeclinedNounData> = {
  [NumberDeclinedNoun.View]: {
    nominativeSingular: 'wyświetlenie',
    nominativePlural: 'wyświetlenia',
    genitivePlural: 'wyświetleń',
  },
  [NumberDeclinedNoun.Subscription]: {
    nominativeSingular: 'subskrypcja',
    nominativePlural: 'subskrypcje',
    genitivePlural: 'subskrypcji',
  },
  [NumberDeclinedNoun.Eurogombka]: {
    nominativeSingular: 'eurogombka',
    nominativePlural: 'eurogombki',
    genitivePlural: 'eurogombek',
  },
};

export function getNumberWithLabel(
  value: number,
  noun: NumberDeclinedNoun,
  isFloat: boolean = false
) {
  const wordData = numerals[noun];
  let label = '';

  if (value === 0) label = wordData.genitivePlural;
  else if (value === 1) label = wordData.nominativeSingular;
  else if (value <= 4) label = wordData.nominativePlural;
  else if (value <= 21) label = wordData.genitivePlural;
  else {
    const lastDigit = value.toString().at(-1) ?? '';
    if (['2', '3', '4'].includes(lastDigit)) label = wordData.nominativePlural;
    else label = wordData.genitivePlural;
  }

  if (isFloat) return `${getBalanceString(value)} ${label}`;
  else return `${value} ${label}`;
}
