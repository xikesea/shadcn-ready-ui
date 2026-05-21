"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileCode, PlayCircle } from "lucide-react";

interface FileWithHtml {
  name: string;
  language: string;
  highlightedHtml: string;
}

interface ComponentDisplayProps {
  component: {
    id: string;
    title: string;
    description: string;
    demo: React.ReactNode;
    files: FileWithHtml[];
  };
}

export function ComponentDisplay({ component }: ComponentDisplayProps) {
  const [activeFile, setActiveFile] = useState(component.files[0]?.name);

  const activeFileContent = component.files.find((f) => f.name === activeFile)?.highlightedHtml;

  return (
    <div className="w-full max-w-6xl mx-auto py-10 px-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{component.title}</h1>
        <p className="text-muted-foreground">{component.description}</p>
      </div>

      <Tabs defaultValue="preview" className="w-full">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <PlayCircle className="w-4 h-4" /> Preview
          </TabsTrigger>
          <TabsTrigger value="code" className="flex items-center gap-2">
            <FileCode className="w-4 h-4" /> Code
          </TabsTrigger>
        </TabsList>
        <TabsContent value="preview" className="mt-6 border rounded-xl p-6 bg-card min-h-[400px] flex items-center justify-center">
          {component.demo}
        </TabsContent>
        <TabsContent value="code" className="mt-6 border rounded-xl overflow-hidden bg-zinc-950">
          <div className="flex flex-col md:flex-row h-[600px]">
            {/* File Sidebar */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r bg-zinc-900/50">
              <div className="p-4 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Files
              </div>
              <ScrollArea className="h-[calc(600px-48px)]">
                <div className="p-2 space-y-1">
                  {component.files.map((file) => (
                    <button
                      key={file.name}
                      onClick={() => setActiveFile(file.name)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        activeFile === file.name
                          ? "bg-zinc-800 text-zinc-100"
                          : "text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200"
                      }`}
                    >
                      {file.name}
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Code Editor */}
            <div className="flex-1 min-w-0 bg-zinc-950">
              <ScrollArea className="h-full">
                <CodeSection html={activeFileContent || ""} />
              </ScrollArea>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function CodeSection({ html }: { html: string }) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    React.startTransition(() => setMounted(true));
  }, []);

  if (!mounted) {
    return <div className="p-6 text-sm text-zinc-500 italic">Loading code...</div>;
  }

  return (
    <div
      className="p-6 text-sm overflow-auto"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
