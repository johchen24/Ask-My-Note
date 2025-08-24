import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/db/prisma";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || "";

    const mostRecentNote = await prisma.note.findFirst({
        where: {
            authorId: userId
        },
        orderBy: {
            updatedAt: "desc"
        },
        select: {
            id: true
        }
    })
    return NextResponse.json({ mostRecentNoteId: mostRecentNote?.id });
}