import { defineEventHandler } from 'file:///Users/nats/Sites/thegreenman-dev/node_modules/h3/dist/index.mjs';
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import matter from 'file:///Users/nats/Sites/thegreenman-dev/node_modules/gray-matter/index.js';

const posts = defineEventHandler(async (event) => {
  try {
    const contentDir = join(process.cwd(), "content", "the-rocker-room");
    const files = readdirSync(contentDir).filter((file) => file.endsWith(".md")).filter((file) => !file.startsWith("._"));
    const posts = files.map((file) => {
      const filePath = join(contentDir, file);
      const fileContent = readFileSync(filePath, "utf-8");
      const { data, content } = matter(fileContent);
      return {
        _path: `/the-rocker-room/${data.slug || file.replace(".md", "")}`,
        title: data.title,
        description: data.description,
        slug: data.slug,
        tags: data.tags || [],
        date: data.date,
        cover: data.cover,
        hover: data.hover,
        displacement: data.displacement,
        bgtitle: data.bgtitle,
        bgtext: data.bgtext,
        copyText: data.copyText,
        content
      };
    });
    return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error reading markdown files:", error);
    return [];
  }
});

export { posts as default };
//# sourceMappingURL=posts.mjs.map
