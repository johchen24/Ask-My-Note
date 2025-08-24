"use client";

import { Note } from "@prisma/client";
import { SidebarGroupContent, SidebarMenu, SidebarMenuItem } from "./ui/sidebar";
import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import PickNoteButton from "./PickNoteButton";
import RemoveNoteButton from "./RemoveNoteButton";

type Props = {
  notes: Note[];
}
function SidebarGroupMain({ notes }: Props) {
  const [searchText, setSearchText] = useState("");
  const [availableNotes, setAvailableNotes] = useState(notes);

  useEffect(() => {
    setAvailableNotes(notes);
  }, [notes]);

  const fuse = useMemo(() => {
    return new Fuse(availableNotes, {
      keys: ["text"],
      threshold: 0.3
    })
  }, [availableNotes]);

  const filteredNotes = searchText ?
    fuse.search(searchText).map((result) => result.item) :
    availableNotes;

  // Don't need to remove from db
  const removeNoteLocal = (noteId: string) => {
    setAvailableNotes((prev) => 
      prev.filter((note) => note.id !== noteId)
    )
  }

  return (
    <SidebarGroupContent>
      <div className="relative flex items-center">
        <SearchIcon className="absolute left-2 size-4" />
        <Input className="bg-muted pl-8" placeholder="Find your ideas..." value={searchText} onChange={(e) => setSearchText(e.target.value)} />
      </div>
      <SidebarMenu className="mt-4">
        {filteredNotes.map((note) => (
          <SidebarMenuItem key={note.id} className="group/item">
            <PickNoteButton note={note} />
            <RemoveNoteButton noteId={note.id} removeNoteLocal={removeNoteLocal}/>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroupContent>
  )
}

export default SidebarGroupMain