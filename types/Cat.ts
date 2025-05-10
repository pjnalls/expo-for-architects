export type Cat = {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  catBreed: CatBreed[];
  createdAt?: string;
  updatedAt?: string;
};

export type CatBreed = {
  id?: string;
  name: string;
  checked: boolean;
};

export type CatFact = {
  fact: string;
  length: number;
};
