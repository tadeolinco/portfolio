// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from 'lib/api/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const prevSet = await db.exerciseSet.findFirst({
      where: {
        exerciseId: req.body.exerciseId as string,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (prevSet) {
      const exercise = await db.exercise.findUnique({
        where: {
          id: req.body.exerciseId as string,
        },
      });

      if (exercise) {
        const exerciseSet = await db.exerciseSet.create({
          data: {
            reps: Array(exercise.repCount).fill(0).join('/'),
            weight: prevSet.weight,
            exerciseId: prevSet.exerciseId,
          },
        });
        await db.exerciseCategory.update({
          where: {
            id: exercise.exerciseCategoryId,
          },
          data: {
            mostRecentSetDate: new Date(),
          },
        });
        res.json(exerciseSet);
      }
    }
  }

  if (req.method === 'PATCH') {
    const exerciseSet = await db.exerciseSet.update({
      data: {
        reps: req.body.reps,
        weight: req.body.weight,
      },
      where: {
        id: req.query.id as string,
      },
    });

    const exercise = await db.exercise.findFirst({
      where: {
        id: exerciseSet.exerciseId,
      },
    });

    if (exercise) {
      await db.exerciseCategory.update({
        where: {
          id: exercise.exerciseCategoryId,
        },
        data: {
          mostRecentSetDate: new Date(),
        },
      });
    }

    res.json(exerciseSet);
  }

  if (req.method === 'DELETE') {
    await db.exerciseSet.delete({
      where: {
        id: req.query.id as string,
      },
    });

    res.json(null);
  }
}
