export interface DbzCharacterItem {
  id: number;
  name: string;
  ki: string;
  maxKi: string;
  race: string;
  gender: string;
  description: string;
  image: string;
  affiliation: string;
}

export interface DbzApiResponse {
  items: DbzCharacterItem[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export interface DbzTransformation {
  id: number;
  name: string;
  image: string;
  ki: string;
}

export interface DbzOriginPlanet {
  id: number;
  name: string;
  isDestroyed: boolean;
  description: string;
  image: string;
}

export interface DbzCharacterDetail extends DbzCharacterItem {
  originPlanet?: DbzOriginPlanet;
  transformations: DbzTransformation[];
}
