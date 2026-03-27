import fs from "fs";
import path from "path";
import matter from "gray-matter";

const articlesDir = path.join(process.cwd(), "content/articles");

export function getAllArticles() {
  if (!fs.existsSync(articlesDir)) return [];

  const files = fs.readdirSync(articlesDir).filter((f) => f.endsWith(".mdx"));

  const articles = files
    .map((filename) => {
      const filePath = path.join(articlesDir, filename);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      return {
        slug: data.slug || filename.replace(".mdx", ""),
        title: data.title || "",
        date: data.date ? String(data.date).slice(0, 10) : "",
        description: data.description || "",
        category: data.category || "",
        relatedService: data.relatedService || null,
        published: data.published !== false,
      };
    })
    .filter((a) => a.published)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return articles;
}

export function getArticleBySlug(slug) {
  const filePath = path.join(articlesDir, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);

  return {
    slug,
    title: data.title || "",
    date: data.date ? String(data.date).slice(0, 10) : "",
    description: data.description || "",
    category: data.category || "",
    relatedService: data.relatedService || null,
    published: data.published !== false,
    content,
  };
}

export function getRelatedArticles(relatedService, currentSlug) {
  return getAllArticles()
    .filter((a) => a.relatedService === relatedService && a.slug !== currentSlug)
    .slice(0, 3);
}
