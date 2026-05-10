import { createHighlighter } from "shiki";

export async function CodeViewer({ code, language }: { code: string; language: string }) {
  const highlighter = await createHighlighter({
    themes: ["github-dark-dimmed"],
    langs: ["typescript", "tsx", "bash", "css"],
  });

  let html = highlighter.codeToHtml(code, {
    lang: language,
    theme: "github-dark-dimmed",
  });

  if (html.includes("<script")) {
    html = html.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
  }

  return (
    <div
      className="rounded-lg overflow-hidden text-sm border bg-zinc-950 p-4"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
