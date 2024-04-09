// will use prisma for that later

export type Gender = 'men' | 'women';

export type CATEGORY = {
  id: number;
  displayTitle: string;
  pathName: string;
};

export const GENDERS: Gender[] = ['men', 'women'];

export const CATEGORIES: CATEGORY[] = [
  { id: 0, displayTitle: 'T-Shirts & Tops', pathName: '0' },
  { id: 1, displayTitle: 'Pants/Shorts', pathName: '1' },
  { id: 2, displayTitle: 'Jackets & Coats', pathName: '2' },
  { id: 3, displayTitle: 'Hoodes & Sweatshirts', pathName: '3' },
  { id: 4, displayTitle: 'Accessoires', pathName: '4' },
  { id: 5, displayTitle: 'Underwear', pathName: '5' },
  { id: 6, displayTitle: 'Blazer', pathName: '6' },
  { id: 7, displayTitle: 'Bags', pathName: '7' },
];

export const MEN_CATEGORIES: CATEGORY[] = [...CATEGORIES];
export const WOMEN_CATEGORIES: CATEGORY[] = [
  ...CATEGORIES,
  { id: 8, displayTitle: 'Dress & Skirt', pathName: '8' },
];

export const MEN_ITEMS = [
  {
    id: 0,
    name: 'White T-Shirt',
    category: 0,
  },
  {
    id: 1,
    name: 'Jeans',
    category: 1,
  },
];

export const WOMEN_ITEMS = [
  {
    id: 0,
    name: 'White T-Shirt',
    category: 0,
  },
  {
    id: 1,
    name: 'Jeans',
    category: 1,
  },
];

export function getAllProductsByCategory(gender: Gender, category: string) {
  const products = getProducts(gender);
  const categoryID = parseInt(category);

  if (!products) return null;
  return products.filter((product) => product.category === categoryID);
}

export function getCategories(gender: Gender) {
  switch (gender) {
    case 'men':
      return MEN_CATEGORIES;

    case 'women':
      return WOMEN_CATEGORIES;

    default:
      return null;
  }
}

export function getCategory(gender: Gender, categoryPath: string) {
  const genderCategory = getCategories(gender);
  if (genderCategory === null) return null;
  return genderCategory.find((category) => category.pathName === categoryPath);
}

export function getProducts(gender: Gender) {
  switch (gender) {
    case 'men':
      return MEN_ITEMS;

    case 'women':
      return WOMEN_ITEMS;

    default:
      return null;
  }
}

export function getOneProduct(gender: Gender, productId: string) {
  const id = parseInt(productId);
  const products = getProducts(gender);
  if (!products) return null;
  return products.find((product) => product.id === id);
}

export function existCategory(categoryID: string, gender: Gender) {
  const id = parseInt(categoryID);
  const categories = getCategories(gender);
  if (categories?.findIndex((category) => category.id === id) === -1) {
    return false;
  }
  return true;
}
