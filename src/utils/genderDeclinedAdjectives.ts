export enum AdjectiveGender {
  singularMasculine,
  singularFeminine,
  singularNeuter,
  notMasculinePersonal,
  masculinePersonal,
}

type AdjectiveGenders = Record<AdjectiveGender, string>;

export enum Adjective {
  Current,
}

const adjectives: Record<Adjective, AdjectiveGenders> = {
  [Adjective.Current]: {
    [AdjectiveGender.singularMasculine]: 'aktualny',
    [AdjectiveGender.singularFeminine]: 'aktualna',
    [AdjectiveGender.singularNeuter]: 'aktualne',
    [AdjectiveGender.notMasculinePersonal]: 'aktualne',
    [AdjectiveGender.masculinePersonal]: 'aktualni',
  },
};

export enum NounGender {
  MasculinePersonal,
  MasculineNonPersonal,
  Feminine,
  Neuter,
}

export const nounGenders: Record<string, NounGender> = {
  miniaturka: NounGender.Feminine,
  avatar: NounGender.MasculineNonPersonal,
};

export function genderDeclension(
  value: Adjective,
  gender: NounGender,
  plural = false,
  capitalize = false
) {
  let adjective = '';
  if (plural)
    adjective =
      gender === NounGender.MasculinePersonal
        ? adjectives[value][AdjectiveGender.masculinePersonal]
        : adjectives[value][AdjectiveGender.notMasculinePersonal];
  else
    adjective =
      gender === NounGender.MasculineNonPersonal ||
      gender === NounGender.MasculinePersonal
        ? adjectives[value][AdjectiveGender.singularMasculine]
        : gender === NounGender.Feminine
        ? adjectives[value][AdjectiveGender.singularFeminine]
        : adjectives[value][AdjectiveGender.singularNeuter];

  if (capitalize) adjective = adjective[0].toUpperCase() + adjective.slice(1);

  return adjective;
}
