import { GENDER } from '@/interfaces';
import prisma from './prisma';

export const getProduct = async (id: string) => {
  const product = await prisma.product.findFirst({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      description: true,
      price: true,
      createdAt: true,
      categoryId: true,
      categoryUriName: true,
      genderName: true,
    },
  });
  return product;
};

export const getGender = async (genderName: GENDER) => {
  const gender = await prisma.gender.findFirst({
    where: {
      name: genderName,
    },
    select: {
      id: true,
      name: true,
      featuredCollection: true,
    },
  });
  return gender;
};

export const getFeaturedProducts = async () => {
  const featuredProducts = await prisma.featuredCollection.findFirst({
    where: {
      name: 'FeaturedProducts',
    },
    include: {
      products: {
        select: {
          imageUrl: true,
          price: true,
          name: true,
          description: true,
          genderName: true,
          categoryUriName: true,
        },
      },
    },
  });
  return featuredProducts;
};

export const getCategoryByID = async (categoryID: string) => {
  const genderFromDB = await prisma.category.findFirst({
    where: {
      id: categoryID,
    },
    include: {
      products: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
          description: true,
          price: true,
          categoryId: true,
          categoryUriName: true,
          genderName: true,
        },
      },
    },
  });
  return genderFromDB;
};

export const getCategoryByUriNameAndGender = async (
  gender: GENDER,
  uri: string
) => {
  const genderFromDB = await prisma.category.findFirst({
    where: {
      uriName: uri,
      genderName: gender,
    },
    include: {
      products: {
        select: {
          id: true,
          name: true,
          imageUrl: true,
          description: true,
          price: true,
        },
      },
    },
  });
  return genderFromDB;
};

export const getGenderCategories = async (gender: GENDER) => {
  const genderFromDB = await prisma.gender.findFirst({
    where: {
      name: gender,
    },
    include: {
      categories: {
        select: {
          id: true,
          name: true,
          genderName: true,
          uriName: true,
          bentoUrls: true,
        },
      },
    },
  });
  return genderFromDB;
};

export const getGenderCategoriesAndFeaturedProducts = async (
  gender: GENDER
) => {
  const genderFromDB = await prisma.gender.findFirst({
    where: {
      name: gender,
    },
    include: {
      featuredCollection: {
        select: {
          id: true,
          name: true,
          products: true,
        },
      },
      categories: {
        select: {
          id: true,
          name: true,
          genderName: true,
          uriName: true,
          bentoUrls: true,
        },
      },
    },
  });
  return genderFromDB;
};
