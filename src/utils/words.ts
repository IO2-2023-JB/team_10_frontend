interface WordData {
  nominativeSingular: string;
  nominativePlural: string;
  genitivePlural: string;
}

export function getNumberWithLabel(value: number, word: string) {
  const wordData = words[word];
  let label = word;

  if (wordData === undefined) {
    console.error(`Missing definition for word ${word}`);
    return `${value} ${word}`;
  }

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

const words: Record<string, WordData> = {
  wyświetlenie: {
    nominativeSingular: 'wyświetlenie',
    nominativePlural: 'wyświetlenia',
    genitivePlural: 'wyświetleń',
  },
  subskrypcja: {
    nominativeSingular: 'subskrypcja',
    nominativePlural: 'subskrypcje',
    genitivePlural: 'subskrypcji',
  },
};
