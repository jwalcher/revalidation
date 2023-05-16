export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function GET(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get("lang");
  const revalpath = "/" + lang;
  console.log("revalidating ", JSON.stringify(revalpath));
  revalidatePath(revalpath);
  const stamp = new Date(Date.now()).toISOString();
  return NextResponse.json({ revalidated: true, path: revalpath, time: stamp }, { status: 200 });
}
