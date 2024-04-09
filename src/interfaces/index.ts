import { Decimal } from '@prisma/client/runtime/library';

export interface FeaturedProduct {
  name: string;
  imageUrl: string;
  description: string | null;
  price: Decimal;
}
