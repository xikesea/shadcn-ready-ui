import fs from "fs";
import path from "path";
import { createHighlighter, type Highlighter } from "shiki";
import { registry } from "./index";

let highlighterPromise: Promise<Highlighter> | null = null;

async function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ["github-dark-dimmed"],
      langs: ["typescript", "tsx", "css", "json"],
    });
  }
  return highlighterPromise;
}

export async function getComponentData(id: string) {
  const component = registry.find((c) => c.id === id);
  if (!component) return null;

  const highlighter = await getHighlighter();

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
      } catch {
        // If it's a typescript file and it fails, try tsx as a fallback
        if (file.language === "typescript" || file.language === "ts") {
           try {
             highlightedHtml = highlighter.codeToHtml(content, {
               lang: "tsx",
               theme: "github-dark-dimmed",
             });
           } catch {
             // Still failed, use raw fallback
             highlightedHtml = "";
           }
        }
        
        if (!highlightedHtml) {
          console.warn(`[Warning] Shiki highlighting failed for ${id}/${file.name}. Using raw text fallback.`);
          // Fallback to raw code block
          highlightedHtml = `<pre class="shiki github-dark-dimmed" style="background-color:#22272e;color:#adbac7"><code>${content
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;")}</code></pre>`;
        }
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
