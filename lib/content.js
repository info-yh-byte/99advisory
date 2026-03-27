import fs from "fs";
import path from "path";

const articlesDir = path.join(process.cwd(), "content/articles");

export function getArticleSlugs() {
  if (!fs.existsSync(articlesDir)) return [];

  return fs
    .readdirSync(articlesDir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

async function loadArticleModule(slug) {
  try {
    return await import(`@/content/articles/${slug}.mdx`);
  } catch (error) {
    return null;
  }
}

function normalizeArticle(metadata = {}, slug) {
  return {
    slug: metadata.slug || slug,
    title: metadata.title || "",
    date: metadata.date ? String(metadata.date).slice(0, 10) : "",
    description: metadata.description || "",
    category: metadata.category || "",
    relatedService: metadata.relatedService || null,
    published: metadata.published !== false,
  };
}

export async function getAllArticles() {
  const slugs = getArticleSlugs();

  const articles = await Promise.all(
    slugs.map(async (slug) => {
      const mod = await loadArticleModule(slug);
      if (!mod) return null;
      return normalizeArticle(mod.metadata || {}, slug);
    })
  );

  return articles
    .filter(Boolean)
    .filter((article) => article.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getArticleBySlug(slug) {
  const mod = await loadArticleModule(slug);
  if (!mod || !mod.default) return null;

  const article = normalizeArticle(mod.metadata || {}, slug);

  return {
    ...article,
    Content: mod.default,
  };
}

export async function getRelatedArticles(relatedService, currentSlug) {
  const all = await getAllArticles();

  return all
    .filter(
      (article) =>
        article.relatedService === relatedService && article.slug !== currentSlug
    )
    .slice(0, 3);
}
