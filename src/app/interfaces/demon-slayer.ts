export interface NamedEntity {
  id?: number;
  name: string;
  title?: string;
}

export interface DemonSlayerCharacter {
  id: number;
  name: string;
  img?: string;
  image?: string;
  race?: string;
  gender?: string;
  age?: number | string;
  description?: string;
  affiliation?: string | NamedEntity;
  combat_style?: string | NamedEntity | NamedEntity[];
  quote?: string;
}
