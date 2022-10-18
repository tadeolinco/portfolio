import { ExerciseCategory } from '@prisma/client';
import { api } from 'lib/api/api';
import { useQuery } from 'react-query';

export const useGetExerciseCategories = () => {
  const query = useQuery(['exerciseCategories'], () => {
    return api.get<ExerciseCategory[]>(`/exerciseCategories`);
  });

  return {
    ...query,
    exerciseCategories: query.data?.data,
  };
};
