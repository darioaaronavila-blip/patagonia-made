import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const secret = req.headers.get("x-revalidate-secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    const body = await req.json();
    const type = body._type as string;
    const slug = body.slug?.current as string | undefined;

    if (type === "product") {
      revalidateTag("products");
      if (slug) revalidatePath(`/products/${slug}`);
      revalidatePath("/");
    } else if (type === "maker") {
      revalidateTag("makers");
      if (slug) revalidatePath(`/makers/${slug}`);
      revalidatePath("/");
    } else {
      // Revalidate everything
      revalidatePath("/", "layout");
    }

    return NextResponse.json({ revalidated: true, type, slug });
  } catch (err) {
    return new NextResponse("Invalid request body", { status: 400 });
  }
}
