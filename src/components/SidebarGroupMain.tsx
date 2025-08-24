"use client";

import { Note } from "@prisma/client";

type Props = {
  notes: Note[];
}
function SidebarGroupMain({ notes }: Props) {
  console.log(notes);
  return (
    <div>SidebarGroupMain</div>
  )
}

export default SidebarGroupMain