"use server";

import { handleError } from "@/lib/utils";
import { prisma } from "@/db/prisma";
import { getUser } from "@/utils/supabase/server";
import openai from "@/openai";
import { ChatCompletionMessageParam } from "openai/resources/chat/completions";


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

export const removeNoteAction = async (noteId: string) => {
    try {
        const user = await getUser();
        if (!user) throw new Error("You must be logged in to remove a note");

        await prisma.note.delete({
            where: { id: noteId, authorId: user.id }
        })
        return { errorMessage: null };
    } catch (error) {
        return handleError(error);
    }
}

export const askAIAction = async (questions: string[], responses: string[]) => {
    const user = await getUser();
    if (!user) throw new Error("You must be logged in to ask AI");

    const notes = await prisma.note.findMany({
        where: {
            authorId: user.id
        },
        orderBy: {
            createdAt: "desc"
        },
        select: {
            text: true,
            createdAt: true,
            updatedAt: true,
        }
    })

    if (notes.length === 0) throw new Error("Show me your ideas first!");

    const formattedNotes = notes.map((note) =>
        `
        Text: ${note.text}
        Created at: ${note.createdAt}
        Last updated: ${note.updatedAt}
        `.trim()).join("\n");

    const messages: ChatCompletionMessageParam[] = [
        {
        role: "developer",
        content: `
            You are a masterful assistant that answers questions about a user's notes. 
            Assume all questions are related to the user's notes. 
            Make sure that your answers are not too verbose and you speak succinctly. 
            Your responses MUST be formatted in clean, valid HTML with proper structure. 
            Use tags like <p>, <strong>, <em>, <ul>, <ol>, <li>, <h1> to <h6>, and <br> when appropriate. 
            Do NOT wrap the entire response in a single <p> tag unless it's a single paragraph. 
            Avoid inline styles, JavaScript, or custom attributes.
            
            Rendered like this in JSX:
            <p dangerouslySetInnerHTML={{ __html: YOUR_RESPONSE }} />
        
            Here are the user's notes:
            ${formattedNotes}
            `,
        },
    ];

    for (let i = 0; i < questions.length; i++) {
        messages.push({ role: "user", content: questions[i] });
        if (responses.length > i) {
            messages.push({ role: "assistant", content: responses[i] });
        }
    }

    const completion = await openai.chat.completions.create({
        model: "gpt-5-mini",
        messages,
    });

    return completion.choices[0].message.content || "An error occurred while asking AI";
}