export interface DigimonListItem {
  id: number;
  name: string;
  href: string;
  image: string;
}

export interface DigimonApiResponse {
  content: DigimonListItem[];
  pageable: {
    currentPage: number;
    elementsOnPage: number;
    totalElements: number;
    totalPages: number;
  };
}

export interface DigimonField {
  id: number;
  field: string;
  image: string;
}

export interface DigimonSkill {
  id: number;
  skill: string;
  translation?: string;
  description: string;
}

export interface DigimonDescription {
  origin: string;
  language: string;
  description: string;
}

export interface DigimonDetail {
  id: number;
  name: string;
  images: Array<{ href: string; transparent?: boolean }>;
  levels?: Array<{ id: number; level: string }>;
  types?: Array<{ id: number; type: string }>;
  attributes?: Array<{ id: number; attribute: string }>;
  fields?: DigimonField[];
  descriptions?: DigimonDescription[];
  skills?: DigimonSkill[];
}
