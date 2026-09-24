import { mkdir, readFile, writeFile } from "node:fs/promises";
import { FULL_POSTS } from "../src/data/portfolio";
import { SITE } from "../src/data/site";

// Supply route-specific metadata to crawlers that don't execute JavaScript.
const escape = (value: string) =>
  value.replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ]!,
  );
const title = "Articles & Writings | Ahmad Ibrahim";
const description =
  "Technical articles and insights by Ahmad Ibrahim on React, Node.js, SaaS architecture, and modern web development.";
let html = await readFile("dist/index.html", "utf8");
html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`);
for (const [key, value] of Object.entries({
  description,
  "og:title": title,
  "og:description": description,
  "og:url": `${SITE.url}/blog`,
  "twitter:title": title,
  "twitter:description": description,
})) {
  html = html.replace(
    new RegExp(
      `(<meta\\s+(?:name|property)="${key}"\\s+content=")[^"]*("\\s*/?>)`,
    ),
    `$1${escape(value)}$2`,
  );
}
html = html.replace(
  /(<link\s+rel="canonical"\s+href=")[^"]*("\s*\/?>)/,
  `$1${SITE.url}/blog$2`,
);
html = html.replace(
  /<noscript\b[^>]*>[\s\S]*?<\/noscript\s*>/,
  `<noscript><main style="padding:40px;font-family:system-ui;max-width:850px;margin:auto"><a href="/">Back to portfolio</a><h1>Articles & Writings — Ahmad Ibrahim</h1>${FULL_POSTS.map((post) => `<article id="${post.id}"><h2>${escape(post.title)}</h2><p>${post.date} · ${post.readTime}</p><p>${escape(post.content)}</p></article>`).join("")}</main></noscript>`,
);
if (!FULL_POSTS.every((post) => html.includes(`<article id="${post.id}">`))) {
  throw new Error("Article fallback generation failed.");
}
await mkdir("dist/blog", { recursive: true });
await writeFile("dist/blog/index.html", html);
console.log("Generated article metadata and no-JavaScript content at /blog.");
