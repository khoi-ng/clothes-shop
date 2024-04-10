import { Decimal } from '@prisma/client/runtime/library';

export interface FeaturedProduct {
  name: string;
  imageUrl: string;
  description: string | null;
  price: Decimal;
}

export type GENDER = 'MEN' | 'WOMEN';

export interface Categories {
  id: string;
  name: string;
  genderName: GENDER;
  uriName: string;
}

export interface Gender {
  id: string;
  name: string;
  updatedAt: string;
  categories: Categories[] | null;
}

export interface Products {
  id: string;
  name: string;
  imageUrl: string;
  description: string | null;
  price: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  genderName: string;
  uriName: string;
  products: Products[];
}
