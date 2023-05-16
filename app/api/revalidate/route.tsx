// navigating to http://localhost:3000/api/revalidate
// clears cache in dev mode, and calls res.revalidate in production
// works as per the docs
// 
export const dynamic = "force-dynamic";

import fs from "fs";
import path from "path";

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

type Data =
  | {
      message: string;
    }
  | { revalidated: Boolean }
  | { cacheCleared: Boolean }
  | string;

const directory = process.cwd() + "/.next/cache/fetch-cache";

export async function GET(request: NextRequest) {
    if (process.env.NODE_ENV === "development") {
      console.log("clearing cache");
      fs.readdir(directory, (err, files) => {
        if (err) throw err;
        for (const file of files) {
          fs.unlink(path.join(directory, file), (err) => {
            if (err) throw err;
          });
        }
      });
      return NextResponse.json(
        { cacheCleared: true },
        {
          status: 200,
        }
      );
    } else {
      const lang = request.nextUrl.searchParams.get("lang")
      const revalpath = "/"+lang

      console.log("revalidating ", JSON.stringify(revalpath));

      revalidatePath(revalpath);

      const res = await fetch(
        "https://www.timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam"
        // { cache: "no-store" } // enabling this: data is not cached
      );
      const data = (await res.json()) as { hour: number; minute: number; seconds: number };
      const stamp = data.hour+":"+data.minute+":"+data.seconds  

      return NextResponse.json({ revalidated: true, path: revalpath, time: stamp }, { status: 200 });
    }
}