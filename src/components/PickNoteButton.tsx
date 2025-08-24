"use client";

import { Note } from "@prisma/client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import useNote from "@/hooks/use-note";
import { SidebarMenuButton } from "./ui/sidebar";
import Link from "next/link";

type Props = {
  note: Note;
}
function PickNoteButton({ note }: Props) {
  const noteId = useSearchParams().get("noteId") || "";

  const { noteText } = useNote(); // this is the current one in the pad

  const [localNoteText, setLocalNoteText] = useState(note.text); // this is the one on the sidebar
  const [wantPadNoteText, setWantPadNoteText] = useState(false);

  useEffect(() => {
    if (noteId == note.id) {
      setWantPadNoteText(true);
    } else {
      setWantPadNoteText(false);
    }
  }, [noteId, note.id])

  useEffect(() => {
    if (wantPadNoteText) {
      setLocalNoteText(noteText);
    }
  }, [noteText, wantPadNoteText])

  const emptyNoteText = "Empty Note";
  let displayedNoteText = localNoteText || emptyNoteText;
  if (wantPadNoteText) {
    displayedNoteText = noteText || emptyNoteText;
  }



  return (
    <SidebarMenuButton asChild className={`items-start gap-0 pr-12 ${note.id === noteId && "bg-sidebar-accent/50"}`}>
      <Link href={`/?noteId=${note.id}`} className="flex h-fit flex-col">
        <p className="w-full overflow-hidden truncate text-ellipsis whitespace-nowrap">
          {displayedNoteText}
        </p>
        <p className="text-muted-foreground text-xs">
          {note.updatedAt.toLocaleDateString()}
        </p>
      </Link>
    </SidebarMenuButton>
  )
}

export default PickNoteButton