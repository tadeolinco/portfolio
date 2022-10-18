import { Exercise, ExerciseCategory, ExerciseSet } from '@prisma/client';
import { api } from 'lib/api/api';
import { useQuery } from 'react-query';

export const useGetExerciseCategory = (id: string) => {
  const query = useQuery(['exerciseCategories', id], () => {
    return api.get<
      ExerciseCategory & {
        Exercise: (Exercise & { ExerciseSet: [ExerciseSet, ExerciseSet] })[];
      }
    >(`/exerciseCategories/${id}`);
  });

  return {
    ...query,
    exerciseCategory: query.data?.data,
  };
};
