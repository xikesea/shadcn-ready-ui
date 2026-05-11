import { createHighlighter } from "shiki";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function test() {
  try {
    const highlighter = await createHighlighter({
      themes: ["github-dark-dimmed"],
      langs: ["typescript", "tsx"],
    });
    
    const filePath = path.join(process.cwd(), "src/registry/components/acl-manager/schema.ts");
    const content = fs.readFileSync(filePath, "utf8");
    
    console.log("Attempting to highlight acl-manager/schema.ts...");
    const html = highlighter.codeToHtml(content, {
      lang: "typescript",
      theme: "github-dark-dimmed",
    });
    
    console.log("SUCCESS");
  } catch (error) {
    console.error("SHIKI_FAILED");
    console.error(error);
  }
}

test();
