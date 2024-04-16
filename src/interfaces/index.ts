import { Decimal } from '@prisma/client/runtime/library';

export interface FeaturedProduct {
  name: string;
  imageUrl: string;
  description: string | null;
  price: Decimal;
}

export type GENDER = 'MEN' | 'WOMEN';

export interface ICategory {
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
  categories: ICategory[] | null;
  bannerUrls: string[];
  featuredCollection?: FeaturedCollection;
}

export interface Products {
  id: string;
  name: string;
  imageUrl: string;
  description: string | null;
  price: number;
  createdAt: string;
  categoryId: string;
  genderName: string;
  categoryUriName: string;
}

export interface FeaturedCollection {
  id: string;
  name: string;
  products: Products[];
  genderId: string;
}
