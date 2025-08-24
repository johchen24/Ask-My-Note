"use client"

import { useSearchParams } from "next/navigation";
import { Textarea } from "./ui/textarea";
import { ChangeEvent, useEffect } from "react";
import useNote from "@/hooks/use-note";
import { updateNoteAction } from "@/actions/notes";


type Props = {
    noteId: string;
    startingText: string;
}

let updateTimeout: NodeJS.Timeout;

function NoteInput({noteId, startingText}: Props) {
  const noteIdParam = useSearchParams().get("noteId") || "";
  const {noteText, setNoteText} = useNote();

  useEffect(() => {
    if (noteIdParam === noteId) {
      setNoteText(startingText);
    }
  }, [startingText, noteIdParam, noteId, setNoteText]);

  useEffect(() => {

  })
  const handleUpdateNote = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setNoteText(text);

    clearTimeout(updateTimeout);
    updateTimeout = setTimeout(() => {
      updateNoteAction(noteId, text);
    }, 1500);
  }
  return (
    <Textarea
      value={noteText}
      onChange={handleUpdateNote}
      className="custom-scrollbar mb-4 h-full max-w-4xl resize-none border p-4 placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
      placeholder="What's on your mind..."
      rows={10}
    />

  )
}

export default NoteInput