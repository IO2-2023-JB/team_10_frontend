interface WordData {
  nominativeSingular: string;
  nominativePlural: string;
  genitivePlural: string;
}

export enum Word {
  View,
  Subscription,
}

const words: Record<Word, WordData> = {
  [Word.View]: {
    nominativeSingular: 'wyświetlenie',
    nominativePlural: 'wyświetlenia',
    genitivePlural: 'wyświetleń',
  },
  [Word.Subscription]: {
    nominativeSingular: 'subskrypcja',
    nominativePlural: 'subskrypcje',
    genitivePlural: 'subskrypcji',
  },
};

export function getNumberWithLabel(value: number, word: Word) {
  const wordData = words[word];
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

  return `${value} ${label}`;
}
