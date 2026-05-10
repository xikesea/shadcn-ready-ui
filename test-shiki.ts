import { createHighlighter } from "shiki";

async function test() {
  const highlighter = await createHighlighter({
    themes: ["github-dark-dimmed"],
    langs: ["typescript"],
  });
  const html = highlighter.codeToHtml("console.log('hello')", {
    lang: "typescript",
    theme: "github-dark-dimmed",
  });
  console.log("SHIKI_OUTPUT_START");
  console.log(html);
  console.log("SHIKI_OUTPUT_END");
}

test();
