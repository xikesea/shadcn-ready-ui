"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "theme-color";

const themes = [
  { id: "zinc",   label: "Zinc",   bg: "#18181b" },
  { id: "blue",   label: "Blue",   bg: "#3b82f6" },
  { id: "violet", label: "Violet", bg: "#7c3aed" },
  { id: "rose",   label: "Rose",   bg: "#e11d48" },
  { id: "orange", label: "Orange", bg: "#ea580c" },
  { id: "green",  label: "Green",  bg: "#16a34a" },
];

function applyTheme(id: string) {
  const html = document.documentElement;
  themes.forEach((t) => html.classList.remove(`theme-${t.id}`));
  if (id !== "zinc") html.classList.add(`theme-${id}`);
  localStorage.setItem(STORAGE_KEY, id);
}

export function ThemeColorPicker() {
  const [active, setActive] = useState("zinc");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) ?? "zinc";
    applyTheme(saved);
    setActive(saved);
  }, []);

  const handleSelect = (id: string) => {
    applyTheme(id);
    setActive(id);
  };

  return (
    <div className="flex items-center gap-1.5" aria-label="Choose accent color">
      {themes.map((theme) => (
        <button
          key={theme.id}
          title={theme.label}
          onClick={() => handleSelect(theme.id)}
          className={cn(
            "w-4.5 h-4.5 rounded-full border-2 transition-transform duration-150",
            active === theme.id
              ? "border-foreground scale-125"
              : "border-transparent hover:scale-110 opacity-70 hover:opacity-100"
          )}
          style={{ backgroundColor: theme.bg }}
        />
      ))}
    </div>
  );
}
