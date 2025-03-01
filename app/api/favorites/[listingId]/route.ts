import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "../../../libs/prismadb";
import { NextResponse } from "next/server";

interface IPrisma {
  listingId?: string;
}

export async function POST(request: Request, { params }: { params: Promise<IPrisma> }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } =await params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }

  const favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds.push(listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<IPrisma> }
) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { listingId } = await params;

  if (!listingId || typeof listingId !== "string") {
    throw new Error("Invalid Id");
  }

  const favoriteIds = [...(currentUser.favoriteIds || [])];

  favoriteIds = favoriteIds.filter((id) => id !== listingId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json(user);
}