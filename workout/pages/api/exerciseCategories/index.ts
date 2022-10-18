// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { db } from 'lib/api/db';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const categories = await db.exerciseCategory.findMany({
    orderBy: {
      mostRecentSetDate: 'asc',
    },
  });

  res.json(categories);
}
