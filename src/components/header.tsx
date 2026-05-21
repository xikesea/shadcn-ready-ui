"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { buttonVariants, Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";
import { Suspense, useState } from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetHeader } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

const categories = [
  { id: "table", label: "Tables" },
  { id: "form", label: "Forms" },
  { id: "other", label: "Auth" },
  { id: "import", label: "Import" },
  { id: "file-manager", label: "File Manager" },
  { id: "acl", label: "ACL Tree" },
];

function HeaderNav() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "table";

  return (
    <nav className="hidden md:flex items-center justify-center gap-1 flex-1">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={cat.id === "table" ? "/" : `/?category=${cat.id}`}
          className={cn(
            "px-4 py-2 rounded-md text-sm font-medium transition-colors hover:bg-muted",
            currentCategory === cat.id ? "bg-muted text-foreground" : "text-muted-foreground"
          )}
        >
          {cat.label}
        </Link>
      ))}
    </nav>
  );
}

function MobileNav() {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "table";
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        }
      />
      <SheetContent side="left" className="w-[280px] p-0 flex flex-col">
        <SheetHeader className="p-6 text-left border-b">
          <SheetTitle className="flex items-center gap-2">
            <div className="bg-primary text-primary-foreground p-1 rounded">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            </div>
            <span className="text-xl font-bold tracking-tighter">Shadcn Ready UI</span>
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-auto py-6">
          <nav className="flex flex-col gap-2 px-4">
            <div className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
              Navigation
            </div>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={cat.id === "table" ? "/" : `/?category=${cat.id}`}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200",
                  currentCategory === cat.id 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
                {cat.label}
              </Link>
            ))}
          </nav>
          
          <Separator className="my-6 mx-4 w-auto" />
          
          <div className="px-6">
             <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground/70 mb-4">
               Resources
             </div>
             <a 
              href="https://github.com/shadcn-ui/ui" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
              GitHub Repository
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-4 w-1/4">
          <Suspense fallback={<div className="w-8" />}>
            <MobileNav />
          </Suspense>
          <Link href="/" className="text-xl font-bold tracking-tighter">
            Shadcn Ready UI
          </Link>
        </div>
        
        <div className="hidden md:flex flex-1 justify-center">
          <Suspense fallback={<div className="w-48" />}>
            <HeaderNav />
          </Suspense>
        </div>

        <div className="flex items-center justify-end gap-2 w-1/4">
          <ModeToggle />
          <a 
            href="https://github.com/shadcn-ui/ui" 
            target="_blank" 
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
            <span className="sr-only">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
