import { ExerciseSetItem } from 'components/ExerciseSetItem';
import { Timer } from 'components/Timer';
import { api } from 'lib/api/api';
import { useGetExerciseCategory } from 'lib/hooks/useGetExerciseCategory';
import { queryClient } from 'lib/queryClient';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaChevronLeft } from 'react-icons/fa';

const ExerciseCategoryPage = () => {
  const router = useRouter();

  const { isLoading, exerciseCategory } = useGetExerciseCategory(
    router.query.id as string,
  );

  return (
    <>
      <div className="sticky top-0">
        <Timer />
      </div>
      <div className="flex flex-col">
        <div className="flex items-center space-x-4 bg-blue-400 p-4 text-xl text-white">
          <Link href={'/'}>
            <a>
              <FaChevronLeft></FaChevronLeft>
            </a>
          </Link>

          <h1>{exerciseCategory?.name}</h1>
        </div>

        <div className="flex flex-1 flex-col space-y-4 overflow-y-auto bg-gray-900 pb-6">
          {!isLoading &&
            exerciseCategory?.Exercise.map((exercise) => {
              return (
                <div key={exercise.id} className="space-y-4">
                  <a
                    role="button"
                    className="flex justify-between border-b border-gray-700 bg-gray-700 py-2 text-lg font-semibold text-white"
                    onClick={async () => {
                      const yes = window.confirm('Add new set?');
                      if (yes) {
                        await api.post(`/exerciseSet`, {
                          exerciseId: exercise.id,
                        });
                        queryClient.invalidateQueries([
                          'exerciseCategories',
                          router.query.id,
                        ]);
                      }
                    }}
                  >
                    <div className="flex-1 border-r border-gray-700 px-4 py-2">
                      {exercise.name}
                    </div>
                    <div className="px-4 py-2 text-right">
                      {`${exercise.repCount} (${exercise.minReps} - ${exercise.maxReps})`}
                    </div>
                  </a>

                  <div className="space-y-4 px-4">
                    {exercise.ExerciseSet.map((exerciseSet) => (
                      <ExerciseSetItem
                        key={exerciseSet.id}
                        exercise={exercise}
                        exerciseSet={exerciseSet}
                      ></ExerciseSetItem>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default ExerciseCategoryPage;
