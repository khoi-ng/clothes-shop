import { Decimal } from '@prisma/client/runtime/library';

export interface FeaturedProduct {
  name: string;
  imageUrl: string;
  description: string | null;
  price: Decimal;
}

export type GENDER = 'MEN' | 'WOMEN';

export interface Category {
  id: string;
  name: string;
  genderName: GENDER;
  uriName: string;
  products: Products[];
  bentoUrls: string[];
}

export interface Gender {
  id: string;
  name: string;
  updatedAt: string;
  categories: Category[] | null;
  bannerUrls: string[];
}

export interface Products {
  id: string;
  name: string;
  imageUrl: string;
  description: string | null;
  price: number;
  createdAt: string;
}
