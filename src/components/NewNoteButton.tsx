"use client";

import { User } from "@supabase/supabase-js";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import { createNoteAction } from "@/actions/notes";
import { toast } from "sonner";

type Props = {
  user: User | null;
}
function NewNoteButton({user}: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClickNewNote = async () => {
    if (!user) {
      router.push("/login");
    } else {
      setLoading(true);
      const uuid = uuidv4();
      await createNoteAction(uuid);
      router.push(`/?noteId=${uuid}`)
      toast.success("Note created successfully");
      setLoading(false);
    }

  }
  return (
    <Button onClick={handleClickNewNote} variant="secondary" className="w-24" disabled={loading}>
      {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "New Note"}
    </Button>
  )
}

export default NewNoteButton