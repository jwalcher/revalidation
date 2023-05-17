
import type { NextApiRequest, NextApiResponse } from "next";

type Data = { revalidated: Boolean; path: string; time: string };

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const lang = req.query.lang;
  const revalpath = "/" + lang;
  console.log("revalidating ", revalpath);
  await res.revalidate(revalpath);
  const stamp = new Date(Date.now()).toISOString();
  return res.json({ revalidated: true, path: revalpath, time: stamp });
}
