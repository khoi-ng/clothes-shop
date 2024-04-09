import { Cloudinary } from '@cloudinary/url-gen/index';
import { PrismaClient } from '@prisma/client';

const cloudinaryClientSingleton = () => {
  return new Cloudinary({
    cloud: {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUDNAME,
    },
  });
};

declare global {
  var cloudinaryGlobal:
    | undefined
    | ReturnType<typeof cloudinaryClientSingleton>;
}

const cloudinary = globalThis.cloudinaryGlobal ?? cloudinaryClientSingleton();

export default cloudinary;

if (!globalThis.cloudinaryGlobal) globalThis.cloudinaryGlobal = cloudinary;
