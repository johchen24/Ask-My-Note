import { getUser } from "@/utils/supabase/server";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { prisma } from "@/db/prisma";
import { Note } from "@prisma/client";
import Link from "next/link";
import SidebarGroupMain from "./SidebarGroupMain";
  
async function AppSidebar() {
    const user = await getUser();

    let notes: Note[] = [];
    if (user) {
        notes = await prisma.note.findMany({
            where: {
                authorId: user.id
            },
            orderBy: {
                updatedAt: "desc"
            }
        })
    }
    return (
        <Sidebar>
          <SidebarContent className="custom-scrollbar">
            <SidebarGroup>
              <SidebarGroupLabel className="mb-2 mt-2 text-lg">
                {user ? (
                  "Your Notes"
                ) : (
                  <p className="text-muted-foreground">
                    <Link href="/login" className="underline">
                      Login
                    </Link>{" "}
                    to see your ideas
                  </p>
                )}
              </SidebarGroupLabel>
              {user && <SidebarGroupMain notes={notes} />}
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      );
}

export default AppSidebar;