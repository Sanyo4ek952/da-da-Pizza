import { axiosInstance } from '@shared/api/client';
import { Ingredient } from '@prisma/client';
import { ApiRoutes } from '@shared/api/routes';

export const ingredients = async (): Promise<Ingredient[]> => {
  return (await axiosInstance.get<Ingredient[]>(ApiRoutes.INGREDIENTS)).data;
};
