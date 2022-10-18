import { Timer } from 'components/Timer';
import { format } from 'date-fns';
import { useGetExerciseCategories } from 'lib/hooks/useGetExerciseCategories';
import Link from 'next/link';

const Home = () => {
  const { isLoading, exerciseCategories } = useGetExerciseCategories();

  return (
    <>
      <div className="flex h-full flex-col">
        <Timer></Timer>
        <div className="flex items-center justify-between space-x-4 bg-blue-400 p-4 text-xl text-white">
          <h1>Workouts</h1>
        </div>

        <div className="flex flex-1 flex-col overflow-y-auto bg-gray-900">
          {!isLoading &&
            exerciseCategories?.map((category) => {
              return (
                <Link key={category.id} href={`/categories/${category.id}`}>
                  <a className="flex flex-row items-center justify-between border-b border-gray-700 p-4 text-white">
                    <div>{category.name}</div>
                    <div>
                      {format(
                        new Date(category.mostRecentSetDate),
                        'MMM dd, EEE',
                      )}
                    </div>
                  </a>
                </Link>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default Home;
