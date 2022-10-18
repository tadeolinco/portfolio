import { Exercise, ExerciseSet } from '@prisma/client';
import classNames from 'classnames';
import { api } from 'lib/api/api';
import { useEffect, useRef, useState } from 'react';

export const ExerciseSetItem = ({
  exercise,
  exerciseSet,
}: {
  exercise: Exercise;
  exerciseSet: ExerciseSet;
}) => {
  const [reps, setReps] = useState(exerciseSet.reps);
  const [weight, setWeight] = useState(String(exerciseSet.weight));

  useEffect(() => {
    setWeight(String(exerciseSet.weight));
  }, [exerciseSet.weight]);

  useEffect(() => {
    setReps(exerciseSet.reps);
  }, [exerciseSet.reps]);

  const timerRef = useRef(0);

  useEffect(() => {
    clearTimeout(timerRef.current);
    if (+weight !== exerciseSet.weight || reps !== exerciseSet.reps) {
      timerRef.current = window.setTimeout(() => {
        api.patch(`/exerciseSet?id=${exerciseSet.id}`, {
          reps,
          weight: +weight,
        });
      }, 1500);
    }
  }, [exerciseSet.id, exerciseSet.reps, exerciseSet.weight, reps, weight]);

  const splitReps = reps.split('/');

  return (
    <div className={classNames('block rounded-xl bg-gray-800 text-white')}>
      <div
        className={classNames(
          'flex items-center justify-between border-b border-gray-700 px-4 py-2 text-lg font-semibold',
        )}
      >
        <div>Weight</div>
        <div className="w-1/4">
          <input
            className="w-full bg-gray-800 text-right"
            value={String(weight)}
            type="number"
            onChange={(e) => setWeight(e.target.value)}
            onFocus={(e) => e.target.select()}
          ></input>
        </div>
      </div>
      <div className="flex">
        {Array(exercise.repCount)
          .fill(0)
          .map((_, index) => {
            return (
              <div
                key={index}
                className={classNames('flex-1 border-gray-700 px-4 py-2', {
                  'border-r': index !== exercise.repCount - 1,
                })}
              >
                <input
                  className="w-full bg-gray-800 text-right"
                  value={splitReps[index] || ''}
                  type="number"
                  onChange={(e) => {
                    setReps((reps) => {
                      const split = reps.split('/');

                      split[index] = e.target.value;

                      return split.join('/');
                    });
                  }}
                  onFocus={(e) => e.target.select()}
                ></input>
              </div>
            );
          })}
      </div>
    </div>
  );
};
