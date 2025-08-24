"use server";

import { handleError } from "@/lib/utils";
import { prisma } from "@/db/prisma";
import { getUser } from "@/utils/supabase/server";


export const createNoteAction = async (uuid: string) => {
    try {
        const user = await getUser();
        if (!user) throw new Error("You must be logged in to create a note");

        await prisma.note.create({
            data: {
                id: uuid,
                authorId: user.id,
                text: ""
            }
        })
        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
}

export const updateNoteAction = async (noteId: string, text: string) => {
    try {
        const user = await getUser();
        if (!user) throw new Error("You must be logged in to update a note");

        await prisma.note.update({
            where: { id: noteId },
            data: { text }
        })
        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
}