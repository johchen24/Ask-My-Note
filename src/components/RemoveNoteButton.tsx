"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { Button } from "@/components/ui/button"
import { Loader2, Trash2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { removeNoteAction } from "@/actions/notes";

type Props = {
  noteId: string;
  removeNoteLocal: (noteId: string) => void;
}

function RemoveNoteButton({ noteId, removeNoteLocal }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const noteIdParam = useSearchParams().get("noteId") || "";

  const handleRemove = () => {
    startTransition(async () => {
      const { errorMessage } = await removeNoteAction(noteId);
      if (!errorMessage) {
        toast.success("Bye bye note!");
        removeNoteLocal(noteId);
        if (noteIdParam === noteId) {
          router.replace("/"); // will handle in middleware
        }
      } else {
        toast.error(errorMessage);
      }
    })
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="absolute right-2 top-1/2 size-7 -translate-y-1/2 p-0 opacity-0 group-hover/item:opacity-100 [&_svg]:size-3"
          variant="ghost"
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>All ideas are better written down...</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently remove your
            note.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleRemove} className="bg-destructive text-destructive-foreground hover:bg-destructive/90 w-24">
            {isPending ? <Loader2 className="animate-spin" /> : "Remove"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}


export default RemoveNoteButton;