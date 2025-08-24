"use client";

type Props = {
  noteId: string,
  removeNoteLocal: (noteId: string) => void,
}

function RemoveNoteButton({ noteId, removeNoteLocal }: Props) {
  return (
    <div>RemoveNoteButton</div>
  )
}

export default RemoveNoteButton