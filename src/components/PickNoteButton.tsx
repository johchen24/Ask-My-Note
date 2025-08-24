"use client";

import { Note } from "@prisma/client";

type Props = {
  note: Note;
}
function PickNoteButton({ note }: Props) {
  return (
    <div>PickNoteButton</div>
  )
}

export default PickNoteButton