import type { NextApiRequest, NextApiResponse } from 'next';
import type { ItemOptions } from '../../styles/Item';

export default async (req: NextApiRequest, res: NextApiResponse<ItemOptions[]>): Promise<void> => {
  const { start, limit } = req.query as { [key: string]: string };
  const response = await fetch(
    `https://vercel-express-liart.vercel.app/api/posts?start=${start}&limit=${limit}`,
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const responseJson: ItemOptions[] = await response.json();

  res.status(200).send(responseJson);
};
