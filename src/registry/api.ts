import fs from "fs";
import path from "path";
import { createHighlighter } from "shiki";
import { registry } from "./index";

export async function getComponentData(id: string) {
  const component = registry.find((c) => c.id === id);
  if (!component) return null;

  const highlighter = await createHighlighter({
    themes: ["github-dark-dimmed"],
    langs: ["typescript", "tsx"],
  });

  const filesWithContent = await Promise.all(
    component.files.map(async (file) => {
      const filePath = path.join(process.cwd(), "src/registry/components", id, file.name);
      const content = fs.readFileSync(filePath, "utf8");
      
      let highlightedHtml = "";
      try {
        highlightedHtml = highlighter.codeToHtml(content, {
          lang: file.language,
          theme: "github-dark-dimmed",
        });
      } catch (error) {
        console.warn(`[Warning] Shiki highlighting failed for ${id}/${file.name}. Using raw text fallback.`);
        // Fallback to raw code block
        highlightedHtml = `<pre class="shiki github-dark-dimmed" style="background-color:#22272e;color:#adbac7"><code>${content
          .replace(/&/g, "&amp;")
          .replace(/</g, "&lt;")
          .replace(/>/g, "&gt;")
          .replace(/"/g, "&quot;")
          .replace(/'/g, "&#039;")}</code></pre>`;
      }

      if (highlightedHtml.includes("<script")) {
        console.warn(`FOUND SCRIPT TAG IN SHIKI OUTPUT for ${id}/${file.name}`);
        highlightedHtml = highlightedHtml.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "");
      }

      return {
        ...file,
        content,
        highlightedHtml,
      };
    })
  );

  return {
    ...component,
    files: filesWithContent,
  };
}
