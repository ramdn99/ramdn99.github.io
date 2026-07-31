import fs from 'node:fs';

export function extractFirstImage(entry: any): string | undefined {
  let content = entry?.body;
  if (!content && entry?.filePath) {
    try {
      content = fs.readFileSync(entry.filePath, 'utf-8');
    } catch (e) {
      // ignore
    }
  }
  if (!content) return undefined;
  const mdMatch = content.match(/!\[.*?\]\((.*?)\)/);
  if (mdMatch && mdMatch[1]) return mdMatch[1].trim();
  const htmlMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (htmlMatch && htmlMatch[1]) return htmlMatch[1].trim();
  return undefined;
}

export function plainExcerpt(markdown: string, maxChars = 480): string {
  let text = markdown
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`]*`/g, ' ')
    .replace(/!\[.*?\]\(.*?\)/g, ' ')
    .replace(/\[(.*?)\]\(.*?\)/g, '$1')
    .replace(/^#{1,6}\s*/gm, '')
    .replace(/[*_>#-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars).replace(/\s+\S*$/, '') + '…';
}
