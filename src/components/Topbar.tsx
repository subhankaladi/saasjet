"use client";

import { Bell, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { signOut, useSession } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export const Topbar = () => {

  const { data: session } = useSession();

  const router = useRouter();


  const handleSignOut = async () => {
    await signOut()
    router.push("/sign-in");
  }

  return (
    <header className="h-16 border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-30">
      <div className="h-full px-6 flex items-center justify-between gap-4">
        {/* Search */}
        <div className="flex-1 max-w-xs lg:max-w-md">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search..."
              className="ml-10 md:ml-0 bg-white/5 border-white/10 text-white focus:border-white/20"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button size="icon" className="relative text-white bg-primary hover:bg-primary/75 cursor-pointer">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-white rounded-full" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" className="rounded-full text-white bg-primary hover:bg-primary/75 cursor-pointer">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="bg-[#0D0D0D] border-white/10">
              <DropdownMenuLabel className="font-normal text-xs text-muted">
                {/* Replace with actual user email */}
                {session?.user.email || "user@example.com"}
              </DropdownMenuLabel>
              <DropdownMenuItem>
                <Button onClick={() => handleSignOut()} className="hover:bg-[#0D0D0D]">Sign Out</Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};
