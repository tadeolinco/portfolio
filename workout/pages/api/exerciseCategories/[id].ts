// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from 'lib/api/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const category = await db.exerciseCategory.findFirst({
    where: {
      id: req.query.id as string,
    },
    include: {
      Exercise: {
        orderBy: {
          sortOrder: 'asc',
        },
        include: {
          ExerciseSet: {
            orderBy: {
              createdAt: 'desc',
            },
            take: 2,
          },
        },
      },
    },
  });

  res.json(category);
}
